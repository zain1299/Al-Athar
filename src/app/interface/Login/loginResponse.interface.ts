import { ApiResponse } from '../ApiResponse/ApiResponse.interface';

export interface IUser {
    Token: string;
    USER_CODE: string | null;
    IP: string | null;
    PC: string | null;
    URL: string | null;
    ReferrarURL: string | null;
    user_screens: Screen[] | null;
    user_actions: Action[];
    OGScreenList: ScreenList[];
    MenuItems: IMenuItem[];
    USER_NAME: string;
    USER_EMAIL: string;
    PROFILE_PIC: string;
}

export interface IUserList {
    UserCode: string;
    RoleId: number;
    FullNameAr: string;
    FullNameEN: string;
    EmailID: string;
    PhoneNumber: string;
    ProfilePicture: string;
    ProfilePictureUrl: string;
    CitizenID: string;
    Status: string;
}

export interface ILoginResponse extends ApiResponse<IUser> {}

export interface Action {
    ActionId: number;
    ActionName: string;
    ControlId: string;
    GroupName: string;
}
export interface IMenuItem {
    Id: number;
    Icon: string;
    Title: string;
    RouterLink: string;
    IsExpandable: boolean;
    Badge: string;
    ParentId?: number | null;
    subMenuItems?: IMenuItem[];
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
