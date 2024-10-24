import { ApiResponse } from '../ApiResponse/ApiResponse.interface';

export interface IGroupUsers {
    Id: number;
    // Name: string;
    GroupId: number;
    UserId: number;
}

export interface IGroupUsersResponse extends ApiResponse<IGroupUsers[]> {}
export interface IGroupUsersInsertResponse extends ApiResponse<IGroupUsers> {}
