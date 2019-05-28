import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatDialog, MatDialogRef } from '@angular/material';
import { IRight } from 'src/app/models/right';
import { DBOperation } from 'src/app/shared/enum';
import { Util } from 'src/app/shared/util';
import { RightService } from 'src/app/service/data/right.service';

@Component({
  selector: 'manage-right',
  templateUrl: './manage-right.component.html',
  styleUrls: ['./manage-right.component.css']
})
export class ManageRightComponent implements OnInit {

  right: IRight;
  rights: IRight[];

  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  selectedOption: string;

  rightFrm: FormGroup;

  constructor(private _fb: FormBuilder, private _dataService: RightService,
    private _util: Util, public dialogRef: MatDialogRef<ManageRightComponent>) { }

  ngOnInit() {
    this.rightFrm = this._fb.group({
      _id: [''],
      rightName: ['', [Validators.required, Validators.maxLength(50)]],
      rightCode: ['', [Validators.required, Validators.maxLength(50)]],
      description: [''],
      dateAdded:[''],
      dateUpdated:[]
    });
    if (this.dbops != DBOperation.create)
      this.rightFrm.setValue(this.right);

    if (this.dbops == DBOperation.delete)
      this.rightFrm.disable();

    if (this.dbops == DBOperation.update)
      this.rightFrm.controls["rightCode"].disable();
  }

  onSubmit(formData: any) {
    switch (this.dbops) {
      case DBOperation.create:
        delete formData.value._id;
        this._dataService.post(formData.value).subscribe(
          data => {
            if (data.success == true) //Success
            {
              this._util.openSnackBar(data.msg, "Success");
              this.dialogRef.close();
            }
            else {
              this._util.openSnackBar(JSON.stringify(data.msg), "Error");
            }
          },
          error => {
          });
        break;
      case DBOperation.update:
        this._dataService.put(formData.value,formData.value._id).subscribe(
          data => {
            if (data.success == true) //Success
            {
              this._util.openSnackBar(data.msg, "Success");
              this.dialogRef.close();
            }
            else {
              this._util.openSnackBar(JSON.stringify(data.msg), "Error");
            }
          },
          error => {
          });
        break;
      case DBOperation.delete:
        this._util.confirmDelete().subscribe(result => {
          if (<boolean>result == true) {
            this._dataService.delete(formData.value._id).subscribe(
              data => {
                if (data.success == true) //Success
                {
                  this._util.openSnackBar(data.msg, "Success");
                  this.dialogRef.close();
                }
                else {
                  this._util.openSnackBar(JSON.stringify(data.msg), "Error");
                }
              },
              error => {
              });
          }
        });
        break;
    }

  }
}