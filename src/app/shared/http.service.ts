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
import {
    IOGMenuItem,
    IOGMenuItemInsertResponse,
    IOGMenuItemResponse,
} from '../interface/Screens/screen.interface';
import {
    IVendor,
    IVendorInsertResponse,
    IVendorResponse,
} from '../interface/Vendor/vendor.interface';
import {
    IOGContractTypes,
    IOGContractTypesInsertResponse,
    IOGContractTypesResponse,
} from '../interface/OGContractTypes/OGContractTypes.interface';
import {
    IGroup,
    IGroupInsertResponse,
    IGroupResponse,
} from '../interface/Group/OG-Group.interface';
import {
    IGroupUsers,
    IGroupUsersInsertResponse,
    IGroupUsersResponse,
} from '../interface/Group/Group.interface';
import { ApiResponse } from '../interface/ApiResponse/ApiResponse.interface';
import { IUserList } from '../interface/Login/loginResponse.interface';
import {
    IContracts,
    IContractsInsertResponse,
    IContractsResponse,
} from '../interface/Contract/contract.interface';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    constructor(private http: HttpClient, private storage: StorageService) {}
    HostURL = environment.domain;
    contractHostUrl = environment.contractHostURL;

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

    Logout() {
        this.storage.remove(StorageKeys.User);
        // Redirect to login or do any other cleanup
    }

    // User
    GetUserList(body: any): Observable<ApiResponse<IUserList[]>> {
        return this.http.post<ApiResponse<IUserList[]>>(
            this.HostURL + 'User/GetUserList',
            body,
            { headers: this.getHeaders() }
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

    // Screens

    ScreenSelectList(): Observable<IOGMenuItemResponse> {
        return this.http.post<IOGMenuItemResponse>(
            this.HostURL + 'Screen/ScreenSelectList',
            {},
            { headers: this.getHeaders() }
        );
    }
    InsertUpdateScreen(
        body: IOGMenuItem
    ): Observable<IOGMenuItemInsertResponse> {
        return this.http.post<IOGMenuItemInsertResponse>(
            this.HostURL + 'Screen/InsertUpdateScreen',
            body,
            { headers: this.getHeaders() }
        );
    }

    DelteteScreen(body: IOGMenuItem): Observable<IOGMenuItemInsertResponse> {
        return this.http.post<IOGMenuItemInsertResponse>(
            this.HostURL + 'Screen/DeleteScreenById',
            body,
            { headers: this.getHeaders() }
        );
    }

    // Vendors

    VendorList(): Observable<IVendorResponse> {
        return this.http.get<IVendorResponse>(
            this.contractHostUrl + 'vendor',
            {}
        );
    }

    InsertVendor(body: IVendor): Observable<IVendorInsertResponse> {
        return this.http.post<IVendorInsertResponse>(
            this.contractHostUrl + 'vendor',
            body,
            {}
        );
    }

    UpdateVendor(id: number, body: IVendor): Observable<IVendorInsertResponse> {
        return this.http.patch<IVendorInsertResponse>(
            `${this.contractHostUrl}vendor/${id}`,
            body,
            {}
        );
    }

    DeleteVendor(id: number): Observable<IVendorInsertResponse> {
        return this.http.delete<IVendorInsertResponse>(
            `${this.contractHostUrl}vendor/${id}`,
            {}
        );
    }

    // OG Contract Types

    OgContractTypeList(): Observable<IOGContractTypesResponse> {
        return this.http.get<IOGContractTypesResponse>(
            this.contractHostUrl + 'og-contract-types',
            {}
        );
    }

    InsertOgContractType(
        body: IOGContractTypes
    ): Observable<IOGContractTypesInsertResponse> {
        return this.http.post<IOGContractTypesInsertResponse>(
            this.contractHostUrl + 'og-contract-types',
            body,
            {}
        );
    }

    UpdateOgContractType(
        id: number,
        body: IOGContractTypes
    ): Observable<IOGContractTypesInsertResponse> {
        return this.http.patch<IOGContractTypesInsertResponse>(
            `${this.contractHostUrl}og-contract-types/${id}`,
            body,
            {}
        );
    }

    DeleteOgContractType(id: number): Observable<any> {
        return this.http.delete<any>(
            `${this.contractHostUrl}og-contract-types/${id}`,
            {}
        );
    }

    // Groups
    OgGroupsList(): Observable<IGroupResponse> {
        return this.http.get<IGroupResponse>(
            this.contractHostUrl + 'group',
            {}
        );
    }

    InsertOgGroups(body: IGroup): Observable<IGroupInsertResponse> {
        return this.http.post<IGroupInsertResponse>(
            this.contractHostUrl + 'group',
            body,
            {}
        );
    }

    UpdateOgGroups(id: number, body: IGroup): Observable<IGroupInsertResponse> {
        return this.http.patch<IGroupInsertResponse>(
            `${this.contractHostUrl}group/${id}`,
            body,
            {}
        );
    }

    DeleteOgGroups(id: number): Observable<any> {
        return this.http.delete<any>(`${this.contractHostUrl}group/${id}`, {
            headers: this.getHeaders(),
        });
    }

    OgGroupUsersList(): Observable<IGroupUsersResponse> {
        return this.http.get<IGroupUsersResponse>(
            this.contractHostUrl + 'group-users',
            {}
        );
    }

    InsertOgGroupUsers(
        body: IGroupUsers
    ): Observable<IGroupUsersInsertResponse> {
        return this.http.post<IGroupUsersInsertResponse>(
            this.contractHostUrl + 'group-users',
            body,
            {}
        );
    }

    UpdateOgGroupUsers(
        id: number,
        body: IGroupUsers
    ): Observable<IGroupUsersInsertResponse> {
        return this.http.patch<IGroupUsersInsertResponse>(
            `${this.contractHostUrl}group-users/${id}`,
            body,
            {}
        );
    }

    DeleteOgGroupUsers(id: number): Observable<any> {
        return this.http.delete<any>(
            `${this.contractHostUrl}group-users/${id}`,
            {
                headers: this.getHeaders(),
            }
        );
    }

    // contract

    contractsList(): Observable<IContractsResponse> {
        return this.http.get<IContractsResponse>(
            this.contractHostUrl + 'contracts',
            {}
        );
    }

    Insertcontracts(body: IContracts): Observable<IContractsInsertResponse> {
        return this.http.post<IContractsInsertResponse>(
            this.contractHostUrl + 'contracts',
            body,
            {}
        );
    }

    Updatecontracts(
        id: number,
        body: IContracts
    ): Observable<IContractsInsertResponse> {
        return this.http.patch<IContractsInsertResponse>(
            `${this.contractHostUrl}contracts/${id}`,
            body,
            {}
        );
    }

    Deletecontracts(id: number): Observable<IContractsInsertResponse> {
        return this.http.delete<IContractsInsertResponse>(
            `${this.contractHostUrl}contracts/${id}`,
            {}
        );
    }

    getContractDetails(id: number): Observable<ApiResponse<IContracts>> {
        return this.http.get<ApiResponse<IContracts>>(
            `${this.contractHostUrl}contracts/${id}`,
            {}
        );
    }

    // uploadDocuments
    uploadDocuments(formData: FormData, contractId: number): Observable<any> {
        formData.append('contractId', contractId.toString());

        return this.http.post(`${this.contractHostUrl}attachments`, formData);
    }
}
