import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material';
import { DBOperation } from 'src/app/shared/enum';
import { Util } from 'src/app/shared/util';
import { RoleService } from 'src/app/service/data/role.service';
import { IRole } from 'src/app/models/role';
import { RightService } from 'src/app/service/data/right.service';
import { IRight } from 'src/app/models/right';

@Component({
  selector: 'manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.css']
})
export class ManageRoleComponent implements OnInit {

  role: IRole;
  roles: IRole[];

  rights: IRight[];

  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  selectedOption: string;

  roleFrm: FormGroup;


  constructor(private _fb: FormBuilder, private _dataService: RoleService, private _rightService: RightService,
    private _util: Util, public dialogRef: MatDialogRef<ManageRoleComponent>) { }


  ngOnInit() {

    this._rightService.get().subscribe(data => this.rights = data);

    this.roleFrm = this._fb.group({
      _id: [''],
      roleName: ['', [Validators.required, Validators.maxLength(50)]],
      roleCode: ['', [Validators.required, Validators.maxLength(50)]],
      rights: [''],
      description: [''],
      dateAdded: [''],
      dateUpdated: []
    });
    if (this.dbops != DBOperation.create)
      this.roleFrm.setValue(this.role);

    if (this.dbops == DBOperation.delete)
      this.roleFrm.disable();

    if (this.dbops == DBOperation.update)
      this.roleFrm.controls["roleCode"].disable();
  }

  onSubmit(formData: any) {
    switch (this.dbops) {
      case DBOperation.create:
        debugger
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
          () => {
          });
        break;
      case DBOperation.update:
        this._dataService.put(formData.value, formData.value._id).subscribe(
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
          () => {
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
              () => {
              });
          }
        });
        break;
    }

  }
}