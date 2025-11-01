import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../storage.service';
import { IUser } from '../../interface';
import { StorageKeys } from '../storage-keys';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private storageService: StorageService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        // Check if the user is logged in
        if (!this.storageService.isUserLogin) {
            this.router.navigate(['/authentication']); // Redirect to login if not logged in
            return false; // Prevent access
        }

        // If user is logged in
        let user: IUser = this.storageService.get(StorageKeys.User);
        let userScreensUrls = user.MenuItems.map((x) => x.RouterLink);

        // Access the requested path
        let path = route.pathFromRoot
            .map((route) => route.routeConfig?.path)
            .join('/');

        // Check if the user has access to the requested path
        if (!userScreensUrls.includes(path)) {
            this.router.navigate(['/forbidden-page']); // Redirect to forbidden page if not authorized
            return false; // Prevent access
        }

        return true; // Allow access
    }
}
