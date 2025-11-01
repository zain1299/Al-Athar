import { ApiResponse } from '../ApiResponse/ApiResponse.interface';

export interface IUserRoleMappingResponse {
    UserRoleMappings: IUserRoleMapping[];
    UserActionMappings: IUserActionMapping[];
    GroupedApplications: IGroupedApplication;
    userDetail: IUserDetails;
}

export interface IUserRoleMapping {
    UserRoleMappingId: number;
    RoleId: number;
    RoleName: string;
    UserId: number;
    FullNameAr: string;
    ApplicationId: number;
    ApplicationNameAr: string;
    CommitteeId: number;
    CommNameAra: string;
}

export interface IUserActionMapping {
    RoleId: number;
    RoleName: string;
    ActionCode: string;
    ActionName: string;
}

export interface IGroupedApplication {
    FullNameAr: string;
    Applications: {
        ApplicationId: number;
        ApplicationNameAr: string;
        Committees: ICommittee[];
    }[];
}

export interface ICommittee {
    CommitteeId: number;
    CommNameAra: string;
    RoleId: number;
    RoleName: string;
}

export interface IUserDetails {
    UserCode: number;
    EmployeeCode: number;
    RoleId: number;
    RegionId: number;
    ADName: string;
    UserName: string | null;
    Password: string | null;
    CitizenID: string;
    CardExpiryDate: string;
    CardType: string;
    FullNameAr: string;
    FullNameEN: string;
    FirstName: string | null;
    SecondName: string | null;
    ThirdName: string | null;
    FourthName: string | null;
    HouseName: string | null;
    CurrentWilayatId: number;
    PermanentWilayatId: number;
    Gender: string | null;
    EmailID: string;
    GSM: string;
    Qabila: string | null;
    DepartmentCode: number;
    DOB: string;
    UserTypeCode: number;
    IMG: string;
    CommitteeId: number;
    DesignationId: number;
    ApplicationId: number;
    ReferenceId: string | null;
    CreatedDate: string | null;
    CreatedBy: number;
    UpdatedDate: string | null;
    UpdatedBy: number;
    UpdatedIP: string | null;
    IsActive: boolean;
    UpdatedURL: string | null;
}

export interface IUserRoleMappingResponseApi
    extends ApiResponse<IUserRoleMappingResponse> {}
export interface IUserRoleMappingInsertResponse extends ApiResponse<boolean> {}
