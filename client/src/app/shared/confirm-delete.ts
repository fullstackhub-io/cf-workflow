import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: 'confirm-delete-modal',
  template: `
          <mat-card class="mt_crd">
          <mat-card-header class="message_header">
          <div mat-card-avatar class="delete_img"></div>
            <mat-card-title  class="message_header_title">Confirm Delete</mat-card-title>
          </mat-card-header>
            <mat-card-content class="message_card_cntnt">
              <p>Are you sure to delete the selected record?</p>
            </mat-card-content>
          <mat-card-actions>
            <div class="card_footer">  
              <button mat-raised-button color="primary" [mat-dialog-close]="true" tabindex="2">Yes</button>
              <button mat-raised-button color="warn" (click)="onNoClick()" tabindex="-1">No</button>
            </div>
          </mat-card-actions>
          </mat-card>
          `,
})
export class ConfirmDeleteModal {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteModal>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}