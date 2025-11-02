import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StorageService } from '../storage.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RatingUsService {
    constructor(private http: HttpClient, private storage: StorageService) {}
    HostURL = environment.domain;

    GetRatingList(body: any): Observable<any> {
        return this.http.post<any>(
            this.HostURL + '/Public/SelectRating',
            body,
            {}
        );
    }
}
