import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { DBOperation } from 'src/app/shared/enum';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { RoleService } from 'src/app/service/data/role.service';
import { ManageRoleComponent } from '../manage-role/manage-role.component';
import { IRole } from 'src/app/models/role';
import { IRight } from 'src/app/models/right';
import { RightService } from 'src/app/service/data/right.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements AfterViewInit {

  displayedColumns: string[] = ['roleName', 'roleCode', 'description', 'edit', 'delete'];
  dataSource;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  role: IRole;
  rights: IRight[];

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _dataService: RoleService, private dialog: MatDialog) { }

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
    let dialogRef = this.dialog.open(ManageRoleComponent);
    dialogRef.componentInstance.dbops = this.dbops;
    dialogRef.componentInstance.modalTitle = this.modalTitle;
    dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
    dialogRef.componentInstance.role = this.role;

    dialogRef.afterClosed().subscribe(() => {
      this.loadData();
    });
  }

  gridaction(gridaction: any): void {
    switch (gridaction.action) {
      case DBOperation.create:
        this.addRole();
        break;
      case DBOperation.update:
        this.editRole(gridaction.row);
        break;
      case DBOperation.delete:
        this.deleteRole(gridaction.row);
        break;
    }
  }

  addRole() {
    this.dbops = DBOperation.create;
    this.modalTitle = "Add New Right";
    this.modalBtnTitle = "Add";
    this.openDialog();
  }
  editRole(menu: IRole) {
    this.dbops = DBOperation.update;
    this.modalTitle = "Edit Right";
    this.modalBtnTitle = "Update";
    delete menu["__v"];
    this.role = <IRole>menu;
    this.openDialog();
  }
  deleteRole(menu: IRole) {
    this.dbops = DBOperation.delete;
    this.modalTitle = "Confirm to Delete?";
    this.modalBtnTitle = "Delete";
    delete menu["__v"];
    this.role = <IRole>menu;
    this.openDialog();
  }

}
