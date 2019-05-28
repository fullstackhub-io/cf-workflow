import { Component, OnInit } from '@angular/core';
import { DBOperation } from '../shared/enum';
import { Util } from '../shared/util';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  dbops: DBOperation;
  userFrm: FormGroup;
  hide: boolean = true;

  constructor(private _fb: FormBuilder, private _userService: AuthService, private _util: Util, private router: Router) { }

  ngOnInit() {

    this.userFrm = this._fb.group({
      userName: ['', [Validators.required, Validators.maxLength(50)]],
      password: [''],

    });
  }

  onSubmit(formData: any) {
    delete formData.value._id;
    this._userService.login(formData.value).subscribe(
      (data: any) => {
        if (data.success == true) {
          debugger
          this._userService.storeUserData(data.data);
          this._util.openSnackBar(`Successfully logged in! as ${data.data.userName}`, "Success");
          this.router.navigate(['/admin']);
        }
        else {
          this._util.openSnackBar(JSON.stringify(data.msg), "Error");
        }
      },
      () => {
      });

  }

}