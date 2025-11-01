import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../shared/services/dashboard';
import { StorageService } from '../../../shared/storage.service';
import { CustomizerSettingsService } from '../../../theme/customizer-settings/customizer-settings.service';
import { StorageKeys } from '../../../shared/storage-keys';
import { IUser } from '../../../interface';
import {
    FormBuilder,
    FormGroup,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgIf, CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DynamicFormFieldsComponent } from '../../../shared/components/dynamic-form-fields/dynamic-form-fields.component';

@Component({
    selector: 'app-appointment-statistics',
    standalone: true,
    imports: [
        NgApexchartsModule,
        NgIf,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        CommonModule,
        ReactiveFormsModule,
        DynamicFormFieldsComponent,
    ],
    templateUrl: './appointment-statistics.component.html',
    styleUrls: ['./appointment-statistics.component.scss'],
})
export class AppointmentStatisticsComponent implements OnInit {
    isToggled = false;
    user!: IUser;

    dailyChartOptions: any;
    weeklyChartOptions: any;
    monthlyChartOptions: any;

    totalAppointmentHours = 0;
    appointmentsWithEmployees = 0;
    appointmentsWithCitizens = 0;

    form!: FormGroup;
    fields: any[] = [];

    constructor(
        public themeService: CustomizerSettingsService,
        private httpService: DashboardService,
        private storage: StorageService,
        private fb: FormBuilder
    ) {
        this.themeService.isToggled$.subscribe(
            (isToggled) => (this.isToggled = isToggled)
        );
    }

    ngOnInit(): void {
        this.user = this.storage.get(StorageKeys.User);

        // Setup form
        this.form = this.fb.group({});
        this.fields = [
            {
                name: 'StartDate',
                label: '📅 اختر تاريخ البداية',
                type: 'date',
                validators: [Validators.required],
                col: 6,
            },
            {
                name: 'EndDate',
                label: '📅 اختر تاريخ النهاية',
                type: 'date',
                validators: [Validators.required],
                col: 6,
            },
        ];

        const start = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
        );
        const end = new Date();

        this.form.patchValue({
            StartDate: start.toISOString().split('T')[0],
            EndDate: end.toISOString().split('T')[0],
        });

        this.getAppointmentStatistics(start, end);
    }

    onSubmit(formData: any) {
        const startDate = new Date(formData.StartDate);
        const endDate = new Date(formData.EndDate);
        this.getAppointmentStatistics(startDate, endDate);
    }

    private getAppointmentStatistics(startDate: Date, endDate: Date): void {
        const format = (d: Date) => d.toISOString().split('T')[0];
        const requestBody = {
            StartDate: format(startDate),
            EndDate: format(endDate),
            defaultcolumns: { created_by: 1414 },
        };

        this.httpService.GetAppointmentStatistics(requestBody).subscribe({
            next: (response) => {
                if (!response?.Data) return;

                this.totalAppointmentHours =
                    response.Data.TotalAppointmentHours || 0;
                this.appointmentsWithEmployees =
                    response.Data.AppointmentsWithEmployees || 0;
                this.appointmentsWithCitizens =
                    response.Data.AppointmentsWithCitizens || 0;

                if (response.Data.DailyStatistics)
                    this.loadDailyAppointmentsChart(
                        response.Data.DailyStatistics
                    );
                if (response.Data.WeeklyStatistics)
                    this.loadWeeklyAppointmentsChart(
                        response.Data.WeeklyStatistics
                    );
                if (response.Data.MonthlyStatistics)
                    this.loadMonthlyAppointmentsChart(
                        response.Data.MonthlyStatistics
                    );
            },
            error: (err) => console.error(err),
        });
    }

    private loadDailyAppointmentsChart(dailyData: any[]) {
        this.dailyChartOptions = {
            chart: {
                type: 'line',
                height: 350,
                zoom: { enabled: false },
                toolbar: { show: false },
            },
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

    private loadWeeklyAppointmentsChart(weeklyData: any[]) {
        this.weeklyChartOptions = {
            chart: {
                type: 'bar',
                height: 350,
                zoom: { enabled: false },
                toolbar: { show: false },
            },
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

    private loadMonthlyAppointmentsChart(monthlyData: any[]) {
        this.monthlyChartOptions = {
            chart: {
                type: 'bar',
                height: 350,
                zoom: { enabled: false },
                toolbar: { show: false },
            },
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
