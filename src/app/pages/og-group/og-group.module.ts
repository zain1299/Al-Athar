import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'og-groups', pathMatch: 'full' },
    {
        path: 'og-groups',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./og-groups/og-groups.component').then(
                (m) => m.OGGroupsComponent
            ),
    },
    {
        path: 'groups-users',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./groups-users/groups-users.component').then(
                (m) => m.GroupsUsersComponent
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OGGroupRoutingModule {}
