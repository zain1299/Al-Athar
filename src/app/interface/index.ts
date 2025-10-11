import { ILoginModel } from './Login/loginModel.interface';
import { ILoginResponse, IUser } from './Login/loginResponse.interface';
import {
    IRole,
    IRoleInsertResponse,
    IRoleResponse,
} from './Role/Role.interface';
import {
    IScreenAction,
    IScreenActionInsertResponse,
    IScreenActionResponse,
} from './ScreenActions/action.interface';
import { ILabels } from './Translations';
import { ButtonLabels } from './Translations/ButtonLabels';
import { RoleLabels } from './Translations/RoleLabels';
import {
    IUserRoleMapping,
    IUserRoleMappingResponse,
    IUserRoleMappingResponseApi,
} from './UserRoleMapping/UserRoleMapping.interface';

export {
    ILoginModel,
    ILoginResponse,
    IUser,
    IRoleResponse,
    IRoleInsertResponse,
    IRole,
    ButtonLabels,
    RoleLabels,
    ILabels,
    IScreenActionResponse,
    IScreenAction,
    IScreenActionInsertResponse,
    IUserRoleMappingResponse,
    IUserRoleMappingResponseApi,
    IUserRoleMapping,
};
