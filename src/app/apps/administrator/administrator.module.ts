import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './roles/roles.component';
import { ScreensComponent } from './screens/screens.component';
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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdministratorRoutingModule {}
