import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'roles', pathMatch: 'full' },
    {
        path: 'listing',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./listing/committee.component').then(
                (m) => m.CommitteeComponent
            ),
    },
    {
        path: 'add-committee',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./add-committee/add-committee.component').then(
                (m) => m.AddCommitteeComponent
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CommitteeRoutingModule {}
