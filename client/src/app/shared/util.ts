import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import {Observable} from "rxjs";
import { MatDialog } from '@angular/material';
import { ConfirmDeleteModal } from './confirm-delete';
import { ShowMessageModal } from './show-message';

@Injectable({
  providedIn: 'root',
})
export class Util {

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) { }

  openSnackBar(message: string, action: string): void {
    let dur = action == ("Error" || "Pending") ? -1 : 2000;
    this.snackBar.open(message, action, {
      duration: dur,
    });
  }

  confirmDelete(): Observable<any> {
    let dialogRef = this.dialog.open(ConfirmDeleteModal, {
      width: '500px'
    });
    return dialogRef.afterClosed();
  }

  showMessage(title: string, msg: string, showbtn: boolean = true) {
    let dialogRef = this.dialog.open(ShowMessageModal, {
      width: '500px',
      data: { title: title, msg: msg, showbtn: showbtn }
    });
    return dialogRef.afterClosed();
  }

  getEnumArray(enumObj: any) {
    return Object.keys(enumObj).map(function (type) {
      return enumObj[type];
    });
  }
}