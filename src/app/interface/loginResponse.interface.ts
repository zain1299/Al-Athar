import { ApiResponse } from './ApiResponse/ApiResponse.interface';

export interface LoginResponseData {
    Token: string;
    UserCode: string | null;
    IP: string | null;
    PC: string | null;
    URL: string | null;
    ReferrarURL: string | null;
    user_screens: Screen[] | null;
    user_actions: Action[];
    OGScreenList: ScreenList[];
}

export interface LoginResponse extends ApiResponse<LoginResponseData> {}

export interface Action {
    ActionId: number;
    ActionName: string;
    ControlId: string;
    GroupName: string;
}

export interface Screen {
    ScreenId: number;
    ScreenName: string;
    MenuPath: string;
    Path: string;
    IsMenu: boolean;
    IsRoute: boolean;
    Controller: string;
    TemplateUrl: string;
    ControllerJS: string;
    IsSubMenu: boolean;
    CreatedDate: string;
    UpdatedDate: string | null;
}

export interface ScreenList {
    ScreenId: number;
    ScreenName: string;
    MenuPath: string;
    Path: string;
    IsMenu: boolean;
    IsRoute: boolean;
    Controller: string;
    TemplateUrl: string;
    ControllerJS: string;
    IsSubMenu: boolean;
    CreatedDate: string;
    UpdatedDate: string | null;
}
