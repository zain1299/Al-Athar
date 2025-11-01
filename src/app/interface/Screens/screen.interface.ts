import { ApiResponse } from '../ApiResponse/ApiResponse.interface';

export interface IOGMenuItem {
    Id?: number;
    Icon?: string;
    Title: string;
    RouterLink?: string;
    IsExpandable: boolean;
    Badge?: string;
    ParentId?: number;
    CreatedDate?: Date;
    CreatedBy?: number;
    CreatedIP?: string;
    CreatedPC?: string;
    CreatedUrl?: string;
    UpdatedDate?: Date;
    UpdatedBy?: number;
    UpdatedIP?: string;
    UpdatedPC?: string;
    UpdatedUrl?: string;
}

export interface IOGMenuItemResponse extends ApiResponse<IOGMenuItem[]> {}
export interface IOGMenuItemInsertResponse extends ApiResponse<boolean> {}
