import { Component } from '@angular/core';
import { DashboardService } from '../../../shared/services/dashboard';
import { StorageService } from '../../../shared/storage.service';
import { CustomizerSettingsService } from '../../../theme/customizer-settings/customizer-settings.service';
import { StorageKeys } from '../../../shared/storage-keys';
import { IUser } from '../../../interface';
import { Router } from '@angular/router';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-appointment-statistics',
    standalone: true,
    imports: [NgApexchartsModule, NgIf, MatCardModule, MatIconModule],
    templateUrl: './appointment-statistics.component.html',
    styleUrl: './appointment-statistics.component.scss',
})
export class AppointmentStatisticsComponent {
    isToggled = false;
    user: IUser;
    dailyChartOptions: ApexOptions;
    weeklyChartOptions: ApexOptions;
    monthlyChartOptions: ApexOptions;

    totalAppointmentHours: number = 0;
    appointmentsWithEmployees: number = 0;
    appointmentsWithCitizens: number = 0;

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
        this.user = this.storage.get(StorageKeys.User);
        this.getAppointmentStatistics(
            new Date('2025-02-01'),
            new Date('2025-02-29')
        );
    }

    getAppointmentStatistics(startDate: Date, endDate: Date): void {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        };
        const formattedStartDate = new Intl.DateTimeFormat(
            'en-CA',
            options
        ).format(startDate);
        const formattedEndDate = new Intl.DateTimeFormat(
            'en-CA',
            options
        ).format(endDate);

        const requestBody = {
            StartDate: formattedStartDate,
            EndDate: formattedEndDate,
            defaultcolumns: { created_by: 1414 },
        };

        this.httpService.GetAppointmentStatistics(requestBody).subscribe({
            next: (response) => {
                if (response?.Data) {
                    if (response?.Data) {
                        this.totalAppointmentHours =
                            response.Data.TotalAppointmentHours;
                        this.appointmentsWithEmployees =
                            response.Data.AppointmentsWithEmployees;
                        this.appointmentsWithCitizens =
                            response.Data.AppointmentsWithCitizens;
                    }

                    if (response.Data.DailyStatistics) {
                        this.loadDailyAppointmentsChart(
                            response.Data.DailyStatistics
                        );
                    }
                    if (response.Data.WeeklyStatistics) {
                        this.loadWeeklyAppointmentsChart(
                            response.Data.WeeklyStatistics
                        );
                    }
                    if (response.Data.MonthlyStatistics) {
                        this.loadMonthlyAppointmentsChart(
                            response.Data.MonthlyStatistics
                        );
                    }
                }
            },
            error: (error) => {
                console.error('Error occurred:', error);
            },
        });
    }

    loadDailyAppointmentsChart(dailyData: any[]) {
        this.dailyChartOptions = {
            chart: { type: 'line', height: 350 },
            series: [
                {
                    name: 'المواعيد اليومية',
                    data: dailyData.map((d) => d.DailyAppointmentCount),
                },
            ],
            xaxis: {
                categories: dailyData.map(
                    (d) => `${d.DayName} ${d.Day.split('T')[0]}`
                ),
            },
            stroke: { curve: 'smooth' },
            markers: { size: 4 },
            colors: ['#28a745'],
            dataLabels: { enabled: true },
        };
    }

    loadWeeklyAppointmentsChart(weeklyData: any[]) {
        this.weeklyChartOptions = {
            chart: { type: 'bar', height: 350 },
            series: [
                {
                    name: 'المواعيد الأسبوعية',
                    data: weeklyData.map((w) => w.WeeklyAppointmentCount),
                },
            ],
            xaxis: { categories: weeklyData.map((w) => `أسبوع ${w.Week}`) },
            colors: ['#007bff'],
            dataLabels: { enabled: true },
        };
    }

    loadMonthlyAppointmentsChart(monthlyData: any[]) {
        this.monthlyChartOptions = {
            chart: { type: 'bar', height: 350 },
            series: [
                {
                    name: 'المواعيد الشهرية',
                    data: monthlyData.map((m) => m.MonthlyAppointmentCount),
                },
            ],
            xaxis: { categories: monthlyData.map((m) => m.MonthName) },
            colors: ['#ff5722'],
            dataLabels: { enabled: true },
        };
    }
}
