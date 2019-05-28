import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { DBOperation } from 'src/app/shared/enum';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { IRole } from 'src/app/models/role';
import { ManageUserComponent } from '../manage-user/manage-user.component';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/service/data/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements AfterViewInit {

  displayedColumns: string[] = ['userName', 'email', 'firstName', 'edit', 'delete'];
  dataSource;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  user: IUser;
  role: IRole[];


  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _dataService: UserService, private dialog: MatDialog) { }

  ngAfterViewInit() {
    this.loadData();
  }

  loadData() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this._dataService.get();
        }),
        map(data => {
          this.isLoadingResults = false;
          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource = data);
  }

  openDialog() {
    let dialogRef = this.dialog.open(ManageUserComponent);
    dialogRef.componentInstance.dbops = this.dbops;
    dialogRef.componentInstance.modalTitle = this.modalTitle;
    dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
    dialogRef.componentInstance.user = this.user;

    dialogRef.afterClosed().subscribe(() => {
      this.loadData();
    });
  }

  gridaction(gridaction: any): void {
    switch (gridaction.action) {
      case DBOperation.create:
        this.addUser();
        break;
      case DBOperation.update:
        this.editUser(gridaction.row);
        break;
      case DBOperation.delete:
        this.deleteUser(gridaction.row);
        break;
    }
  }

  addUser() {
    this.dbops = DBOperation.create;
    this.modalTitle = "Add New User";
    this.modalBtnTitle = "Add";
    this.openDialog();
  }
  editUser(user: IUser) {
    this.dbops = DBOperation.update;
    this.modalTitle = "Edit User";
    this.modalBtnTitle = "Update";
    delete user["__v"];
    this.user = <IUser>user;
    this.openDialog();
  }
  deleteUser(user: IUser) {
    this.dbops = DBOperation.delete;
    this.modalTitle = "Confirm to Delete?";
    this.modalBtnTitle = "Delete";
    delete user["__v"];
    this.user = <IUser>user;
    this.openDialog();
  }


}
