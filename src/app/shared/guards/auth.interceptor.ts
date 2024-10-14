import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { StorageKeys } from '../storage-keys';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router, private storage: StorageService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                // Check if the error status is 401
                if (error.status === 401) {
                    // Clear user data from storage (optional)
                    this.storage.remove(StorageKeys.User);

                    // Redirect to the login page
                    this.router.navigate(['/login']);
                }
                return throwError(() => error); // Rethrow the error to be handled elsewhere if needed
            })
        );
    }
}
