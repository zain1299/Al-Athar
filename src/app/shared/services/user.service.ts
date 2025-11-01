import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StorageService } from '../storage.service';
import { Observable } from 'rxjs';
import {
    IApplication,
    IApplicationResponse,
} from '../../interface/Application/application.interface';
import { ApiResponse } from '../../interface/ApiResponse/ApiResponse.interface';

import { ICommitteeResponse } from '../../interface/committee/committee.interface';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient, private storage: StorageService) {}
    HostURL = environment.domain;

    // Application
    GetUserList(body: any): Observable<any> {
        return this.http.post<any>(
            this.HostURL + 'User/UserSelectList',
            body,
            {}
        );
    }

    UserInsertUpdate(body: any): Observable<IApplicationResponse> {
        return this.http.post<IApplicationResponse>(
            this.HostURL + '/User/UserSelectList',
            body,
            {}
        );
    }
    GetUserDetails(body: any): Observable<ApiResponse<IApplication>> {
        return this.http.post<ApiResponse<IApplication>>(
            this.HostURL + '/User/UserSelectList',
            body,
            {}
        );
    }
    DeleteUser(body: any): Observable<ApiResponse<IApplication>> {
        return this.http.post<ApiResponse<IApplication>>(
            this.HostURL + '/User/UserDelete/',
            body,
            {}
        );
    }

   
}
