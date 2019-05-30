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

  steps: string[] = ['author-response', 'initial-comment-prem-decision', 'final-decision', 'final-decision-review', 'next-iteration', 'author-response-2', 'side-by-side', 'nces-decision', 'waiting-cso-approval', 'waiting-owner-approval', 'waiting-qc-approval', 'waiting-wm-approval', 'sign-off'];

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
    this.loadStepData(this.steps[0]);
  }

  getSelectedStep(selectedStep) {
    debugger;
    this.loadStepData(this.steps[selectedStep.selectedIndex]);
  }

  loadStepData(stepCode: string) {
    this._dataService.getbyStepCode(stepCode).subscribe(
      (data: any) => {
        if (data.success) {
          this.stepFrm.controls["assignees"].setValue(data.data.assignees);
          this.stepFrm.controls["isEmailRequired"].setValue(data.data.isEmailRequired);
          this.stepFrm.controls["emailMessage"].setValue(data.data.emailMessage);
          this.stepFrm.controls["_id"].setValue(data.data._id);
        }
        else {
          this.stepFrm.controls["assignees"].setValue('');
          this.stepFrm.controls["isEmailRequired"].setValue('');
          this.stepFrm.controls["emailMessage"].setValue('');
          this.stepFrm.controls["_id"].setValue('');
        }
      }
    )
  }

  onSubmit(formData: any, stepName: string, stepCode: string, seqNum: number) {
    debugger
    formData.value['stepName'] = stepName;
    formData.value['stepCode'] = stepCode;
    formData.value['seqNum'] = seqNum;

    if (formData.value._id != "" && formData.value._id != null)
      this.dbops = DBOperation.update;
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

}
