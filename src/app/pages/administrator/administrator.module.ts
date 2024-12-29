import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'roles', pathMatch: 'full' },
    {
        path: 'roles',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./roles/roles.component').then((m) => m.RolesComponent),
    },
    {
        path: 'screens',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./screens/screens.component').then(
                (m) => m.ScreensComponent
            ),
    },
    {
        path: 'actions',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./screen-actions/screen-actions.component').then(
                (m) => m.ScreenActionsComponent
            ),
    },
    {
        path: 'user-role-mapping',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./user-role-mapping/user-role-mapping.component').then(
                (m) => m.UserRoleMappingComponent
            ),
    },
    {
        path: 'users',
        // canActivate: [AuthGuard],
        loadComponent: () =>
            import('./users/users.component').then((m) => m.UsersComponent),
    },
    {
        path: 'create-user',
        // canActivate: [AuthGuard],
        loadComponent: () =>
            import('./create-user/create-user.component').then(
                (m) => m.CreateUserComponent
            ),
    },
    {
        path: 'edit-user',
        // canActivate: [AuthGuard],
        loadComponent: () =>
            import('./edit-user/edit-user.component').then(
                (m) => m.EditUserComponent
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdministratorRoutingModule {}
