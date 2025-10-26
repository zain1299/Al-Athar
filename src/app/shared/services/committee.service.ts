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
export class CommitteeService {
    constructor(private http: HttpClient, private storage: StorageService) {}
    HostURL = environment.domain;

    // Application
    GetCommitteeList(body: any): Observable<ICommitteeResponse> {
        return this.http.post<ICommitteeResponse>(
            this.HostURL + 'Committee/CommitteeSelectList',
            body,
            {}
        );
    }

    CommitteeInsertUpdate(body: any): Observable<IApplicationResponse> {
        return this.http.post<IApplicationResponse>(
            this.HostURL + 'Application/ApplicationInsertUpdate',
            body,
            {}
        );
    }
    GetCommitteeDetails(body: any): Observable<ApiResponse<IApplication>> {
        return this.http.post<ApiResponse<IApplication>>(
            this.HostURL + 'Application/GetApplicationDetails',
            body,
            {}
        );
    }
    DeleteCommittee(body: any): Observable<ApiResponse<IApplication>> {
        return this.http.post<ApiResponse<IApplication>>(
            this.HostURL + '/Committee/CommitteeDelete/',
            body,
            {}
        );
    }

    // RoleDelete(body: IRole): Observable<IRoleInsertResponse> {
    //     return this.http.post<IRoleInsertResponse>(
    //         this.HostURL + 'Roles/DeleteRoleById',
    //         body
    //     );
    // }
}
