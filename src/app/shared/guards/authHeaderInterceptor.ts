import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../../interface';
import { StorageService } from '../storage.service';
import { StorageKeys } from '../storage-keys';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
    constructor(private storage: StorageService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const user: IUser = this.storage.get(StorageKeys.User);
        const token = user ? user.Token : '';
        const userId = user ? user.USER_CODE : '';

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: token, // Dynamic token
            UserID: userId as string,
        });

        // Convert HttpHeaders to a plain object with specific type
        const headersObj: { [key: string]: string } = headers
            .keys()
            .reduce((acc, key) => {
                acc[key] = headers.get(key) || '';
                return acc;
            }, {} as { [key: string]: string });

        const authReq = req.clone({
            setHeaders: headersObj,
        });

        return next.handle(authReq);
    }
}
