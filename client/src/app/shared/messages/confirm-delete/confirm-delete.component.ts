import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: 'confirm-delete-modal',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
