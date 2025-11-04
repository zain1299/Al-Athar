import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../storage.service';

@Injectable({
    providedIn: 'root',
})
export class LoginGuardGuard implements CanActivate {
    constructor(
        private storageService: StorageService,
        private router: Router
    ) {}

    canActivate():
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (this.storageService.isUserLogin) {
            this.router.navigate(['/dashboard']);
        }

        return true;
    }
}
