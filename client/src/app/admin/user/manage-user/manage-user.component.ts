import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material';
import { DBOperation } from 'src/app/shared/enum';
import { Util } from 'src/app/shared/util';
import { RoleService } from 'src/app/service/data/role.service';
import { UserService } from 'src/app/service/data/user.service';
import { IUser } from 'src/app/models/user';
import { IRole } from 'src/app/models/role';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  hide:boolean = true;
  user: IUser;
  users: IUser[];
  roles: IRole[];

  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;
  selectedOption: string;

  userFrm: FormGroup;


  constructor(private _fb: FormBuilder, private _dataService: UserService, private _roleService: RoleService,
    private _util: Util, public dialogRef: MatDialogRef<ManageUserComponent>) { }

  ngOnInit() {

    this._roleService.get().subscribe(data => this.roles = data);

    this.userFrm = this._fb.group({
      _id: [''],
      userName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      firstName: [''],
      lastName: [''],
      password: [''],
      roles: [''],
      dateAdded: [''],
      dateUpdated: []
    });
    if (this.dbops != DBOperation.create)
      this.userFrm.setValue(this.user);

    if (this.dbops == DBOperation.delete)
      this.userFrm.disable();

    if (this.dbops == DBOperation.update)
      this.userFrm.controls["email"].disable();
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
