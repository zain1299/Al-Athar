import { Component } from '@angular/core';
import { TodayEventComponent } from './today-event/today-eventcomponent';
import { AppointmentStatisticsComponent } from './appointment-statistics/appointment-statistics.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [TodayEventComponent, AppointmentStatisticsComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
