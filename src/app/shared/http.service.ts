import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ILoginModel, ILoginResponse } from '../interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    constructor(private http: HttpClient) {}
    HostURL = environment.domain;

    Login(body: ILoginModel): Observable<ILoginResponse> {
        return this.http.post<ILoginResponse>(
            this.HostURL + 'Login/MainLoginUser',
            body
        );
    }
}
