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
import { ILocation } from '../../interface/location/location.interface';

@Injectable({
    providedIn: 'root',
})
export class PublicDepartmentService {
    constructor(private http: HttpClient, private storage: StorageService) {}
    HostURL = environment.domain;

    GetDepartmentList(body: any): Observable<any> {
        return this.http.post<any>(
            this.HostURL + '/Public/SelectOGPublicDepartments',
            body,
            {}
        );
    }

    DepartmentInsertUpdate(body: any): Observable<any> {
        return this.http.post<any>(
            this.HostURL + 'Public/InsertUpdateOGPublicDepartments',
            body,
            {}
        );
    }
   GetDepartmentDetails(body: any): Observable<any> {
  return this.http.post<any>(
    this.HostURL + 'Public/SelectOGPublicDepartments',
    body,
    {}
  );
}

    DeleteDepartment(body: any): Observable<ApiResponse<ILocation>> {
        return this.http.post<ApiResponse<ILocation>>(
            this.HostURL + '/Location/LocationDelete/',
            body,
            {}
        );
    }
}
