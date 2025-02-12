import { Component } from '@angular/core';
import { TodayEventComponent } from './today-event/today-eventcomponent';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [TodayEventComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
