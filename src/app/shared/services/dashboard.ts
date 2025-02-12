import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StorageService } from '../storage.service';
import {
    IAppointmentsAndMeetingBody,
    IAppointmentsAndMeetingResponse,
} from '../../interface/Dashboard/AppointmentsAndMeetings.interface';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    constructor(private http: HttpClient, private storage: StorageService) {}
    HostURL = environment.domain;

    AppointmentsAndMeetings(body: IAppointmentsAndMeetingBody) {
        return this.http.post<IAppointmentsAndMeetingResponse>(
            this.HostURL + 'Master/AppointmentsAndMeetingsV2',
            body
        );
    }
}
