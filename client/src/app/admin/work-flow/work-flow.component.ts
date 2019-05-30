import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IRole } from 'src/app/models/role';
import { RoleService } from 'src/app/service/data/role.service';
import { WorkflowService } from 'src/app/service/data/workflow.service';
import { DBOperation } from 'src/app/shared/enum';
import { Util } from 'src/app/shared/util';

@Component({
  selector: 'app-work-flow',
  templateUrl: './work-flow.component.html',
  styleUrls: ['./work-flow.component.css']
})
export class WorkFlowComponent implements OnInit {

  stepFrm: FormGroup;
  roles: IRole[];

  dbops: DBOperation;

  constructor(private _fb: FormBuilder, private _roleService: RoleService, private _dataService: WorkflowService, private _util: Util) { }

  ngOnInit() {
    this._roleService.get().subscribe(data => this.roles = data);

    this.stepFrm = this._fb.group({
      _id: [''],
      stepName: [{ value: '', disabled: true }],
      stepCode: [{ value: '', disabled: true }],
      seqNum: [{ value: '', disabled: true }],
      assignees: [],
      isEmailRequired: [false, Validators.required],
      emailMessage: ['']
    });

  }

  onSubmit(formData: any, stepName: string, stepCode: string, seqNum: number) {

    formData.value['stepName'] = stepName;
    formData.value['stepCode'] = stepCode;
    formData.value['seqNum'] = seqNum;
    this._dataService.getbyStepCode(stepCode).subscribe(
      (res: any) => {
        if (res.success) {
          this.dbops = DBOperation.update;
          formData.value['_id'] = res.data;
        }
        else
          this.dbops = DBOperation.create;

        switch (this.dbops) {
          case DBOperation.create:
            delete formData.value._id;
            this._dataService.post(formData.value).subscribe(
              data => {
                if (data.success == true) //Success
                {
                  this._util.openSnackBar(data.msg, "Success");
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
                }
                else {
                  this._util.openSnackBar(JSON.stringify(data.msg), "Error");
                }
              },
              () => {
              });
            break;
        }

      }
    )

  }

}
