import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StorageService } from '../storage.service';
import { Observable } from 'rxjs';
import { IApplication, IApplicationResponse } from '../../interface/Application/application.interface';
import { ApiResponse } from '../../interface/ApiResponse/ApiResponse.interface';
import { ILocation } from '../../interface/location/location.interface';

@Injectable({
    providedIn: 'root',
})

export class LocationService{
    
    constructor(private http: HttpClient, private storage: StorageService) {}
    HostURL = environment.domain;



     GetLocationList(body: any): Observable<any> {
        return this.http.post<any>(
            this.HostURL + 'Location/LocationSelectList',
            body,
            {}
        );
    }

    LocationInsertUpdate(body: any): Observable<any> {
        return this.http.post<any>(
            this.HostURL + 'Location/LocationInsertUpdate',
            body,
            {}
        );
    }
    GetLocationDetails(body: any): Observable<ApiResponse<IApplication>> {
        return this.http.post<ApiResponse<IApplication>>(
            this.HostURL + '/Location/GetLocationDetails',
            body,
            {}
        );
    }
    DeleteLocation(body: any): Observable<ApiResponse<ILocation>> {
        return this.http.post
        <ApiResponse<ILocation>>(
            this.HostURL + '/Location/LocationDelete/',
            body,
            {}
        );
    }

}    