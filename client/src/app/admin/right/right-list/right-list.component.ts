import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { DBOperation } from 'src/app/shared/enum';
import { IRight } from 'src/app/models/right';
import { RightService } from 'src/app/service/data/right.service';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { ManageRightComponent } from '../manage-right/manage-right.component';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-right-list',
  templateUrl: './right-list.component.html',
  styleUrls: ['./right-list.component.css']
})
export class RightListComponent implements AfterViewInit {

  displayedColumns: string[] = ['rightName', 'rightCode', 'description', 'edit', 'delete'];
  dataSource;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  right: IRight;

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _dataService: RightService, private dialog: MatDialog) { }

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
    let dialogRef = this.dialog.open(ManageRightComponent);
    dialogRef.componentInstance.dbops = this.dbops;
    dialogRef.componentInstance.modalTitle = this.modalTitle;
    dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
    dialogRef.componentInstance.right = this.right;

    dialogRef.afterClosed().subscribe(() => {
      this.loadData();
    });
  }

  gridaction(gridaction: any): void {
    switch (gridaction.action) {
      case DBOperation.create:
        this.addRight();
        break;
      case DBOperation.update:
        this.editRight(gridaction.row);
        break;
      case DBOperation.delete:
        this.deleteRight(gridaction.row);
        break;
    }
  }

  addRight() {
    this.dbops = DBOperation.create;
    this.modalTitle = "Add New Right";
    this.modalBtnTitle = "Add";
    this.openDialog();
  }
  editRight(menu: IRight) {
    this.dbops = DBOperation.update;
    this.modalTitle = "Edit Right";
    this.modalBtnTitle = "Update";
    delete menu["__v"];
    this.right = <IRight>menu;
    this.openDialog();
  }
  deleteRight(menu: IRight) {
    this.dbops = DBOperation.delete;
    this.modalTitle = "Confirm to Delete?";
    this.modalBtnTitle = "Delete";
    delete menu["__v"];
    this.right = <IRight>menu;
    this.openDialog();
  }

}
