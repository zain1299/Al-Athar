import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ILoginModel } from '../interface';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interface/loginResponse.interface';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    constructor(private http: HttpClient) {}
    HostURL = environment.domain;

    Login(body: ILoginModel): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(
            this.HostURL + 'Login/MainLoginUser',
            body
        );
    }
}
