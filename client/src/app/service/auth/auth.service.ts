import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILogin } from 'src/app/models/login';
import { IUser } from 'src/app/models/user';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    url: string = environment.user_api;

    constructor(public _http: HttpClient, private router: Router) { }

    login(model: ILogin) {
        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.post(`${this.url}/login`, body, { headers: headers });
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/login'])
    }

    //later store token
    storeUserData(user: IUser) {
        localStorage.setItem('user-name', user.userName);
        localStorage.setItem('user-role', user.roles.toString());
    }

    isLoggenIn() {
        return localStorage.getItem('user-name') && localStorage.getItem('user-name').length > 0;
    }

    getUserRoles() {
        return localStorage.getItem('user-role').split(',');
    }

    isUserAdmin() {
        return localStorage.getItem('user-role').split(',').indexOf('admin') > 0;
    }

}