import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StorageService } from '../storage.service';
import { Observable } from 'rxjs';
import { IApplication, IApplicationResponse } from '../../interface/Application/application.interface';
import { ApiResponse } from '../../interface/ApiResponse/ApiResponse.interface';

@Injectable({
    providedIn: 'root',
})

export class ApplicationService{
    
    constructor(private http: HttpClient, private storage: StorageService) {}
    HostURL = environment.domain;


     // Application
     GetApplicationList(body: any): Observable<IApplicationResponse> {
        return this.http.post<IApplicationResponse>(
            this.HostURL + 'Application/ApplicationSelectListV2',
            body,
            {}
        );
    }

    ApplicationInsertUpdate(body: any): Observable<IApplicationResponse> {
        return this.http.post<IApplicationResponse>(
            this.HostURL + 'Application/ApplicationInsertUpdate',
            body,
            {}
        );
    }
    GetApplicationDetails(body: any): Observable<ApiResponse<IApplication>> {
        return this.http.post<ApiResponse<IApplication>>(
            this.HostURL + 'Application/GetApplicationDetails',
            body,
            {}
        );
    }
    DeleteApplication(body: any): Observable<ApiResponse<IApplication>> {
        return this.http.post
        <ApiResponse<IApplication>>(
            this.HostURL + '/Application/ApplicationDelete/',
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