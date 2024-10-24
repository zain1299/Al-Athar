import { ApiResponse } from '../ApiResponse/ApiResponse.interface';

export interface IGroup {
    Id: number;
    Name: string;
    Description: string;
}

export interface IGroupResponse extends ApiResponse<IGroup[]> {}
export interface IGroupInsertResponse extends ApiResponse<IGroup> {}
