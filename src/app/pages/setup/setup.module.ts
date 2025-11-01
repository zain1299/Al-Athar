import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'roles', pathMatch: 'full' },
    {
        path: 'application',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./application/application.component').then(
                (m) => m.ApplicationComponent
            ),
    },

    {
        path: 'user-listing',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./users/user-listing/user-listing.component').then(
                (m) => m.UserListingComponent
            ),
    },
    {
        path: 'add-edit-user',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./users/add-edit-user/add-edit-user.component').then(
                (m) => m.AddEditUserComponent
            ),
    },
     {
        path: 'location-list',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./location/location-listing/location-listing.component').then(
                (m) => m.LocationListingComponent
            ),
    },
     {
        path: 'manage-sec',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./manage-sec/manage-sec.component').then(
                (m) => m.ManageSecComponent
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SetupRoutingModule {}
