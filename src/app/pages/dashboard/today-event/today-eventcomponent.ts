import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CustomizerSettingsService } from '../../../theme/customizer-settings/customizer-settings.service';
import { DashboardService } from '../../../shared/services/dashboard';
import {
    IAppointmentsAndMeeting,
    IAppointmentsAndMeetingBody,
} from '../../../interface/Dashboard/AppointmentsAndMeetings.interface';
import { CommonModule, NgFor } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { IUser } from '../../../interface';
import { StorageKeys } from '../../../shared/storage-keys';
import { StorageService } from '../../../shared/storage.service';

@Component({
    selector: 'app-today-event',
    standalone: true,
    imports: [
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgFor,
        CommonModule,
        MatIcon,
    ],
    templateUrl: './today-event.component.html',
    styleUrl: './today-event.component.scss',
})
export class TodayEventComponent {
    selected: Date | null;
    classApplied = false;
    UserCode: number | null;
    todayEvents: IAppointmentsAndMeeting;
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private httpService: DashboardService,
        private router: Router,
        private storage: StorageService
    ) {
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
        const user: IUser = this.storage.get(StorageKeys.User);
        this.UserCode = user?.USER_CODE ? +user?.USER_CODE : null;
    }

    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    onDateChange(date: Date): void {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        };
        const formattedDate = new Intl.DateTimeFormat('en-CA', options).format(
            date
        );

        const requestBody: IAppointmentsAndMeetingBody = {
            StartDate: formattedDate,
            EndDate: formattedDate,
            defaultcolumns: {
                created_by: 1414,
            },
        };

        this.httpService.AppointmentsAndMeetings(requestBody).subscribe({
            next: (response) => {
                this.todayEvents = response.Data as IAppointmentsAndMeeting;
                console.log('todayEvents', this.todayEvents);
            },
            error: (error) => {
                console.error('Error occurred:', error);
            },
        });
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    eventTypeColors: { [key: string]: string } = {
        Appointment: '#4caf50',
        Meeting: '#2196f3',
        PublicAppointment: '#ff9800',
        VideoCall: '#e91e63',
    };

    getEventTypeColor(eventType: string): string {
        return this.eventTypeColors[eventType] || '#6b7280';
    }

    getStatusColor(statusColor: string | null): string {
        return statusColor || '#6b7280';
    }

    joinVideoCall(event: any): void {
        console.log('Joining video call for event:', event);
    }

    viewEventDetails(event: any): void {
        console.log('Viewing details for event:', event);
    }

    getEventOrganizerLabel(eventTypeId: number): string {
        switch (eventTypeId) {
            case 1:
                return 'Consultant / Attendee'; // Appointment
            case 3:
                return 'Meeting Host'; // Meeting
            case 2:
                return 'Public Session Leader'; // Public Appointment
            case 4:
                return 'Video Call Host'; // Video Call
            default:
                return 'Organizer';
        }
    }
}
