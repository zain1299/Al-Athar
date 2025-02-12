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
    ],
    templateUrl: './today-event.component.html',
    styleUrl: './today-event.component.scss',
})
export class TodayEventComponent {
    selected: Date | null;

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }
    todayEvents: IAppointmentsAndMeeting;

    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private httpService: DashboardService,
        private router: Router
    ) {
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    onDateChange(date: Date): void {
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        const requestBody: IAppointmentsAndMeetingBody = {
            StartDate: startDate,
            EndDate: endDate,
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
}
