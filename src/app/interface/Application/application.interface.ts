import { ApiResponse } from '../ApiResponse/ApiResponse.interface';

export interface IApplication {
    ApplicationId: number
    ApplicationNameAr: string
    ApplicationNameEn: string
    ApplicationSecerets: string
    defaultcolumns: IDefaultcolumns
}

export interface IDefaultcolumns {
    created_by: string
    created_by_name: string
    created_ip: string
    created_pc: any
    created_url: any
    created_date: string
    updated_by: any
    updated_by_name: string
    updated_ip: string
    updated_pc: any
    updated_url: any
    updated_date?: string
    is_active: boolean
}

export interface IUserAction {
    ActionId: number
    ActionName: string
    ControlId: string
    GroupName: string
}

export interface IApplicationData {
    ApplicationListData: IApplication[]
    UserAction: IUserAction[]
}

export interface IApplicationResponse extends ApiResponse<IApplicationData> { }
export interface IApplicationInsertResponse extends ApiResponse<IApplication> { }
