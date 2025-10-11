import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { StorageKeys } from './storage-keys';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    isBrowser: boolean = false;

    constructor(@Inject(PLATFORM_ID) platformId: string) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    set(key: string, data: any) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    get(key: string) {
        if (this.isBrowser) {
            var data = localStorage.getItem(key);

            if (data) {
                return JSON.parse(localStorage.getItem(key) || '{}');
            } else {
                return null;
            }
        }
        return null;
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }

    getUserId() {
        var data = this.get(StorageKeys.User);

        return data.Id;
    }

    getUser() {
        var data = this.get(StorageKeys.User);

        return data;
    }

    get isUserLogin() {
        let user = this.get(StorageKeys.User);

        if (user) return true;
        else return false;
    }
}
