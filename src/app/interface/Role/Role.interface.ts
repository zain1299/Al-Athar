import { ApiResponse } from '../ApiResponse/ApiResponse.interface';

export interface IRole {
    RoleId: number | undefined;
    RoleName: string;
    RoleNameEn: string;
    IsWilayatRole: boolean;
    CreatedBy: number;
    CreatedIP: string;
    CreatedPC: string;
    CreatedUrl: string;
    UpdatedBy?: number;
    UpdatedIP?: string;
    UpdatedPC?: string;
    UpdatedUrl?: string;
}

export interface IRoleResponse extends ApiResponse<IRole[]> {}
export interface IRoleInsertResponse extends ApiResponse<boolean> {}
