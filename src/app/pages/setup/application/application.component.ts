import { Component, ViewChild } from '@angular/core';
import { NgIf, CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from '../../../shared/storage.service';

import { HttpService } from '../../../shared/http.service';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CustomizerSettingsService } from '../../../theme/customizer-settings/customizer-settings.service';
import {
    IApplication,
    IApplicationData,
} from '../../../interface/Application/application.interface';
import { IUser } from '../../../interface';
import { StorageKeys } from '../../../shared/storage-keys';
import { DynamicButtonComponent } from '../../../shared/components/dynamic-button/dynamic-button.component';
import { DynamicFormPopupComponent } from '../../../shared/components/dynamic-form-popup/dynamic-form-popup.component';
import { Validators } from '@angular/forms';

import { MatSort } from '@angular/material/sort';
import { ApplicationService } from '../../../shared/services/application';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-application',
    standalone: true,
    imports: [
        NgIf,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatMenuModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatPaginator,
        DynamicButtonComponent,
        DynamicFormPopupComponent,
        CommonModule,
    ],
    templateUrl: './application.component.html',
    styleUrl: './application.component.scss',
})
export class ApplicationComponent {
    isToggled = false;
    UserCode: number;

    popupVisible: boolean = false;

    dataSource = new MatTableDataSource<IApplication>([]);

    displayedColumns: string[] = [
        'ApplicationId',
        'ApplicationNameAr',
        'ApplicationNameEn',
        'action',
    ];

    fields = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            validators: [Validators.required],
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            // validators: [Validators.required],
        },
    ];
    initialData: any = {};

    // editData = {
    //     name: 'Test App',
    //     description: 'This is test',
    //     email: 'test@app.com',
    // };

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        public themeService: CustomizerSettingsService,
        private httpService: ApplicationService,
        private storage: StorageService,
        private router: Router,
        private toast: ToastrService,
    ) {
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
        const user: IUser = this.storage.get(StorageKeys.User);
        this.UserCode = user?.USER_CODE ? +user?.USER_CODE : (0 as number);

        this.getApplicationList();
    }

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getApplicationList(): void {
        const body = {
            defaultcolumns: {
                created_by: this.UserCode,
            },
        };

        this.httpService.GetApplicationList(body).subscribe({
            next: (response) => {
                var responseData = response.Data as IApplicationData;
                this.dataSource.data = responseData.ApplicationListData;
                this.dataSource.paginator = this.paginator;
            },
            error: (error) => {
                console.error('Error occurred:', error);
            },
        });
    }

    GetApplicationDetails(ApplicationId: number): void {
        const body = {
            ApplicationId,
            defaultcolumns: {
                created_by: this.UserCode,
            },
        };


        this.httpService.GetApplicationDetails(body).subscribe({
            next: (response) => {
                const res = response.Data as IApplication;
                this.initialData = {
                    ApplicationId: res.ApplicationId,
                    name: res.ApplicationNameAr,
                    description: res.ApplicationNameEn,
                };
            },
            error: (error) => {
                console.error('Error occurred:', error);
            },
        });
    }

    ViewData(row: IApplication): void {
        //   this.selectedRow = row;
        //   this.toggleClassView();
    }

    onDelete(row: IApplication): void {}

    applications: any[] = [];

    //popupVisible = false;
    currentEditingData: any = null; // store the data being edited

    // Triggered when edit button is clicked
    onEdit(element: any) {
        this.currentEditingData = element; // store current row data
        this.popupVisible = true;

        this.initialData = {}

        this.GetApplicationDetails(element.ApplicationId);

        // this.initialData
    }

    onAddEdit(formData: any) {
        const pyaload = {
            ApplicationId: this.initialData.ApplicationId,
            ApplicationNameAr: formData?.name,
            ApplicationNameEn: formData?.description,
            defaultcolumns: {
                created_ip: '',
                created_pc: '',
                created_url: '',
                created_by: this.UserCode,
            },
        };

        this.httpService.ApplicationInsertUpdate(pyaload).subscribe({
            next: (res) => {
                this.getApplicationList();
                this.popupVisible = false;
            },
            error: (err) => console.error(err),
        });
    }


    // deleteApplication(role: IRole): void {
    //     this.httpService.RoleDelete(role).subscribe({
    //         next: (response) => {
    //             if (response.Status == 200) {
    //                 this.toast.success('Application deleted successfully!');
    //                 this.getApplicationList();
    //             } else {
    //                 this.toast.error(response.Message);
    //             }
    //         },
    //         error: (error) => {
    //             console.error('Error occurred:', error);
    //             this.toast.error(JSON.parse(error));
    //         },
    //     });
    // }
}
