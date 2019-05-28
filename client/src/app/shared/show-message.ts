import { Component, Input, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'show-messsage-modal',
    template: `<mat-card class="mt_crd">
                <mat-card-header class="message_header">
                <div mat-card-avatar class="card_img"></div>
                  <mat-card-title class="message_header_title">{{data.title}}</mat-card-title>
                </mat-card-header>
                  <mat-card-content class="message_card_cntnt">
                    <div innerHTML="{{data.msg}}"></div>
                  </mat-card-content>
                <mat-card-actions *ngIf="data.showbtn">
                <div class="card_footer"><button mat-raised-button color="warn" (click)="onNoClick()" tabindex="-1">OK</button></div>
                </mat-card-actions>
            </mat-card>`,
})
export class ShowMessageModal {

    constructor(public dialogRef: MatDialogRef<ShowMessageModal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        dialogRef.disableClose = true;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}