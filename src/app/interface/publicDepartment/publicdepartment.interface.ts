import { ApiResponse } from '../ApiResponse/ApiResponse.interface';

export interface IPublicDepartment {
    Id: number;
    Name: string;
    CreatedDate: string;
    UpdatedDate: string;
    CreatedByUser: string;
    UpdatedByUser: string;
    DepartmentHeadName: string;
    DepartmentHeadId: number;
    defaultcolumns?: any; 
}

export interface IContactResponse extends ApiResponse<IPublicDepartment[]> {}
