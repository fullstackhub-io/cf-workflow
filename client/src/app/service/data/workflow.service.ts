import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class WorkflowService {

    url: string = environment.workflow_api;

    constructor(public _http: HttpClient) { }

    get(): Observable<any> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.get(this.url, { headers: headers });
    }

    post(model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.post(this.url, body, { headers: headers });
    }

    put(model: any, id: string): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.put(`${this.url}/${id}`, body, { headers: headers });
    }

    delete(id: string): Observable<any> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.delete(`${this.url}/${id}`, { headers: headers });
    }

    getbyStepCode(stepId: string): Observable<any> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._http.get(`${this.url}/${stepId}`, { headers: headers });
    }

}