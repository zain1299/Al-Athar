import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import {
    ILoginModel,
    ILoginResponse,
    IRole,
    IRoleInsertResponse,
    IRoleResponse,
    IUser,
} from '../interface';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { StorageKeys } from './storage-keys';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    constructor(private http: HttpClient, private storage: StorageService) {}
    HostURL = environment.domain;

    // Method to get headers dynamically
    private getHeaders(): HttpHeaders {
        const user: IUser = this.storage.get(StorageKeys.User);

        const token = user ? user.Token : '';
        const userId = user ? user.USER_CODE : '';

        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: token, // Dynamic token
            UserID: userId as string,
        });
    }

    // Login

    Login(body: ILoginModel): Observable<ILoginResponse> {
        return this.http.post<ILoginResponse>(
            this.HostURL + 'Login/MainLoginUser',
            body
        );
    }

    // Roles

    RoleSelectList(): Observable<IRoleResponse> {
        return this.http.post<IRoleResponse>(
            this.HostURL + 'Roles/RolesSelectList',
            {},
            { headers: this.getHeaders() }
        );
    }
    RoleInsertUpdate(body: IRole): Observable<IRoleInsertResponse> {
        return this.http.post<IRoleInsertResponse>(
            this.HostURL + 'Roles/InsertUpdateRole',
            body,
            { headers: this.getHeaders() }
        );
    }
}
