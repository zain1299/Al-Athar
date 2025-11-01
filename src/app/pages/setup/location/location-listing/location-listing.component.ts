import { Component, ViewChild } from '@angular/core';
import { NgIf, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StorageService } from '../../../../shared/storage.service';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomizerSettingsService } from '../../../../theme/customizer-settings/customizer-settings.service';

import { StorageKeys } from '../../../../shared/storage-keys';
import { DynamicButtonComponent } from '../../../../shared/components/dynamic-button/dynamic-button.component';
import { DynamicFormPopupComponent } from '../../../../shared/components/dynamic-form-popup/dynamic-form-popup.component';
import { Validators } from '@angular/forms';

import { ConfirmDialogComponent } from '../../../../common/confirm-dialog/confirm-dialog.component';
import { MatSort } from '@angular/material/sort';

import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ILocation } from '../../../../interface/location/location.interface';
import { LocationService } from '../../../../shared/services/location.service';
import { IUser } from '../../../../interface';

@Component({
    selector: 'app-location-listing',
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
    templateUrl: './location-listing.component.html',
    styleUrl: './location-listing.component.scss',
})
export class LocationListingComponent {
    isToggled = false;
    UserCode: number;
    ViewclassApplied = false;
    popupVisible: boolean = false;
    selectedRow: ILocation;
    dataSource = new MatTableDataSource<ILocation>([]);

    displayedColumns: { key: string; header: string; width?: string }[] = [
        {
            key: 'LocationName',
            header: 'اسم مكان الانعقاد',
            width: '200px',
        },
        { key: 'action', header: 'Action', width: '120px' },
    ];

    displayedColumnKeys: string[] = this.displayedColumns.map((c) => c.key);

    fields = [
        {
            name: 'LocationName',
            label: 'اسم مكان الانعقاد',
            type: 'text',
            validators: [Validators.required],
        },
        {
            name: 'WilayatId',
            label: 'الولاية',
            type: 'select',
            validators: [Validators.required],
            options: [{ value: 100, label: 'الوزارة' }],
        },
    ];
    initialData: any = {};
    applications: any[] = [];

    currentEditingData: any = null;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        public themeService: CustomizerSettingsService,
        private httpService: LocationService,
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

        this.getLocationList();
    }

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getLocationList(): void {
        const body = {
            defaultcolumns: {
                created_by: this.UserCode,
            },
        };

        this.httpService.GetLocationList(body).subscribe({
            next: (response) => {
                var responseData = response.Data as any;
                this.dataSource.data = responseData;
                this.dataSource.paginator = this.paginator;
            },
            error: (error) => {
                console.error('Error occurred:', error);
            },
        });
    }

    GetLocationDetails(ApplicationId: number): void {
        const body = {
            ApplicationId: ApplicationId,
            defaultcolumns: {
                created_by: this.UserCode,
            },
        };

        this.httpService.GetLocationDetails(body).subscribe({
            next: (response) => {
                const res = response.Data as any;
                this.initialData = {
                    LocationId: res.LocationId,
                    WilayatId: res.WilayatId,
                    LocationName: res.LocationName,
                };
                this.popupVisible = true;
            },

            error: (error) => {
                console.error('Error occurred:', error);
            },
        });
    }
    toggleClassView() {
        this.ViewclassApplied = !this.ViewclassApplied;
    }
    ViewData(row: ILocation): void {
        this.selectedRow = row;
        this.toggleClassView();
    }

    onEdit(element: ILocation) {
        this.currentEditingData = element;
        this.popupVisible = true;

        this.initialData = {};
        this.GetLocationDetails(element.LocationId);
    }

    onAddEdit(formData: any) {
        const payload = {
            LocationName: formData?.LocationName,
            WilayatId: formData?.WilayatId,

            defaultcolumns: {
                created_ip: '',
                created_pc: '',
                created_url: '',
                created_by: this.UserCode,
            },
        };

        this.httpService.LocationInsertUpdate(payload).subscribe({
            next: (res) => {
                this.toast.success('Location added successfully!');
                this.getLocationList();
                this.popupVisible = false;
            },
            error: (err) => console.error(err),
        });
    }

    onDelete(row: ILocation): void {
        if (!row || !row.LocationId) return;

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                title: 'Confirm Delete',
                message: `Are you sure you want to delete ${row.LocationName}`,
            },
        });

        const payload = {
            LocationId: row.LocationId,
            defaultcolumns: {
                deleted_by: this.UserCode,
            },
        };

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.httpService.DeleteLocation(payload).subscribe({
                    next: (response: any) => {
                        if (response.Status === 200 && response?.Data) {
                            this.toast.success(
                                'Location deleted successfully!'
                            );
                            this.getLocationList();
                        } else {
                            this.toast.error(
                                response.Message || 'Failed to delete location.'
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
                                    'An error occurred while deleting the location.'
                            );
                        }
                    },
                });
            }
        });
    }
}
