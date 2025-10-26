import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'roles', pathMatch: 'full' },
    {
        path: 'listing',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./committee.component').then((m) => m.CommitteeComponent),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CommitteeRoutingModule {}
