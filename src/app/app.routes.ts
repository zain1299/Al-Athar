import { Routes } from '@angular/router';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { LockScreenComponent } from './authentication/lock-screen/lock-screen.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { ConfirmEmailComponent } from './authentication/confirm-email/confirm-email.component';
import { InternalErrorComponent } from './common/internal-error/internal-error.component';
import { BlankPageComponent } from './common/blank-page/blank-page.component';
import { LoginGuardGuard } from './shared/guards/login.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: 'authentication',
        component: AuthenticationComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: '', component: SignInComponent },
            { path: 'sign-up', component: SignUpComponent },
            { path: 'forgot-password', component: ForgotPasswordComponent },
            { path: 'reset-password', component: ResetPasswordComponent },
            { path: 'lock-screen', component: LockScreenComponent },
            { path: 'confirm-email', component: ConfirmEmailComponent },
            { path: 'logout', component: LogoutComponent },
        ],
    },
    {
        path: 'administrator',
        loadChildren: () =>
            import('./pages/administrator/administrator.module').then(
                (m) => m.AdministratorRoutingModule
            ),
    },
    {
        path: 'vendors',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./pages/vendor/vendor.component').then(
                (m) => m.VendorComponent
            ),
    },
    {
        path: 'group',
        loadChildren: () =>
            import('./pages/og-group/og-group.module').then(
                (m) => m.OGGroupRoutingModule
            ),
    },
    {
        path: 'og-contract-types',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import(
                './pages/og-contract-types/og-contract-types.component'
            ).then((m) => m.OgContractTypesComponent),
    },
    {
        path: 'contract',
        loadComponent: () =>
            import('./pages/contract/contract.component').then(
                (m) => m.ContractComponent
            ),
        canActivate: [AuthGuard],
    },
    {
        path: 'contracts/:id',
        loadComponent: () =>
            import('./pages/contract-details/contract-details.component').then(
                (m) => m.ContractDetailsComponent
            ),
        // canActivate: [AuthGuard],
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'setup',
        loadChildren: () =>
            import('./pages/setup/setup.module').then(
                (m) => m.SetupRoutingModule
            ),
    },
    {
        path: 'committee',
        loadChildren: () =>
            import('./pages/committee/committee.module').then(
                (m) => m.CommitteeRoutingModule
            ),
    },

    { path: '**', component: NotFoundComponent }, // This line will remain down from the whole pages component list
];
