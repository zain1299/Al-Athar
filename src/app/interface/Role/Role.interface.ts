import { ApiResponse } from '../ApiResponse/ApiResponse.interface';
import { IScreenAction } from '../ScreenActions/action.interface';

export interface IRole {
    RoleId: number | undefined;
    RoleName: string | null;
    RoleNameEn: string;
    IsWilayatRole: boolean;
    ScreenIds: string;
    CreatedBy: number;
    CreatedIP: string;
    CreatedPC: string;
    CreatedUrl: string;
    UpdatedBy?: number;
    UpdatedIP?: string;
    UpdatedPC?: string;
    UpdatedUrl?: string;
    ActionCodes?: string;
    ActionCodesListing?: IScreenAction[];
    MenusItems?: {
        Id: number;
        Title: string;
    }[];
}

export interface IRoleResponse extends ApiResponse<IRole[]> {}
export interface IRoleInsertResponse extends ApiResponse<boolean> {}
