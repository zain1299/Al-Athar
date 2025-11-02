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

export class ContactUsService{
    
    constructor(private http: HttpClient, private storage: StorageService) {}
    HostURL = environment.domain;

     GetContactList(body: any): Observable<any> {
        return this.http.post<any>(
            this.HostURL + 'Public/SelectContactUs',
            body,
            {}
        );
    }

   
  

}    