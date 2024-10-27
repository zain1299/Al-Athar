import { ApiResponse } from '../ApiResponse/ApiResponse.interface';
import { IUserList } from '../Login/loginResponse.interface';
import { IGroup } from './OG-Group.interface';

export interface IGroupUsers {
    Id: number;
    GroupId: number;
    UserId: number;
    group?: IGroup;
    user?: IUserList;
}

export interface IGroupUsersResponse extends ApiResponse<IGroupUsers[]> {}
export interface IGroupUsersInsertResponse extends ApiResponse<IGroupUsers> {}
