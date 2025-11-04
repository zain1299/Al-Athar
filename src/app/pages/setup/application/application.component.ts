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
import { ConfirmDialogComponent } from '../../../common/confirm-dialog/confirm-dialog.component';
import { MatSort } from '@angular/material/sort';
import { ApplicationService } from '../../../shared/services/application';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

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
    ViewclassApplied = false;
    popupVisible: boolean = false;
    selectedRow: IApplication;
    dataSource = new MatTableDataSource<IApplication>([]);

    displayedColumns: { key: string; header: string; width?: string }[] = [
        { key: 'ApplicationId', header: 'Application Id', width: '40px' },
        {
            key: 'ApplicationNameAr',
            header: 'Application Name',
            width: '200px',
        },
        { key: 'ApplicationNameEn', header: 'Description', width: '250px' },
        { key: 'action', header: 'Action', width: '120px' },
    ];

    // Create a separate array of keys for mat-table
    displayedColumnKeys: string[] = this.displayedColumns.map((c) => c.key);

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

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        public themeService: CustomizerSettingsService,
        private httpService: ApplicationService,
        private storage: StorageService,
        private router: Router,
        private toast: ToastrService,
        private dialog: MatDialog
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
    toggleClassView() {
        this.ViewclassApplied = !this.ViewclassApplied;
    }
    ViewData(row: IApplication): void {
        this.selectedRow = row;
        this.toggleClassView();
    }

    applications: any[] = [];

    //popupVisible = false;
    currentEditingData: any = null; // store the data being edited

    // Triggered when edit button is clicked
    onEdit(element: any) {
        this.currentEditingData = element; // store current row data
        this.popupVisible = true;

        this.initialData = {};

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
    onDelete(row: IApplication): void {
        if (!row || !row.ApplicationId) return;

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                title: 'Confirm Delete',
                message: `Are you sure you want to delete "${row.ApplicationNameAr}"?`,
            },
        });

        const payload = {
            ApplicationId: row.ApplicationId,
            defaultcolumns: {
                deleted_by: this.UserCode,
            },
        };

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.httpService.DeleteApplication(payload).subscribe({
                    next: (response: any) => {
                        if (response.Status === 200 && response?.Data) {
                            this.toast.success(
                                'Application deleted successfully!'
                            );
                            this.getApplicationList(); // refresh list
                        } else {
                            this.toast.error(
                                response.Message ||
                                    'Failed to delete application.'
                            );
                        }
                    },
                    error: (error) => {
                        console.error('Error occurred:', error);
                        const errorMessage =
                            error?.error?.message ?? error?.error?.Message;

                        if (Array.isArray(errorMessage)) {
                            errorMessage.forEach((msg: string) =>
                                this.toast.error(msg)
                            );
                        } else {
                            this.toast.error(
                                errorMessage ||
                                    'An error occurred while deleting the application.'
                            );
                        }
                    },
                });
            }
        });
    }

    // ViewData(row: IScreenAction): void {
    //     this.selectedRow = row;
    //     this.toggleClassView();
    // }

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
