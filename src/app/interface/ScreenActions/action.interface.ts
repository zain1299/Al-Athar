import { ApiResponse } from '../ApiResponse/ApiResponse.interface';

export interface IScreenAction {
    ActionCode: number;
    ActionGroupName: string;
    ActionName: string;
    ActionNameEng: string;
    ControlID: string;
    CreatedDate?: string;
    CreatedBy?: number;
    CreatedByUser?: string;
    UpdatedDate?: string | null;
    UpdatedBy?: number | undefined;
    UpdatedByUser?: string;
    UpdatedIP?: string | null;
    IsActive?: boolean | null;
}

export interface IScreenActionResponse extends ApiResponse<IScreenAction[]> {}
export interface IScreenActionInsertResponse extends ApiResponse<boolean> {}
