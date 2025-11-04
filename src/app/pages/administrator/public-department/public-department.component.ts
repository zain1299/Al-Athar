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
import { CustomizerSettingsComponent } from '../../../theme/customizer-settings/customizer-settings.component';
import { StorageKeys } from '../../../shared/storage-keys';
import { DynamicButtonComponent } from '../../../shared/components/dynamic-button/dynamic-button.component';
import { DynamicFormPopupComponent } from '../../../shared/components/dynamic-form-popup/dynamic-form-popup.component';
import {
    ReactiveFormsModule,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';

import { MatSort } from '@angular/material/sort';

import { ConfirmDialogComponent } from '../../../common/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

import { PublicDepartmentService } from '../../../shared/services/public-department.service';
import { CustomizerSettingsService } from '../../../theme/customizer-settings/customizer-settings.service';
import { IUser } from '../../../interface/Login/loginResponse.interface';
import { IPublicDepartment } from '../../../interface/publicDepartment/publicdepartment.interface';
import { IUserDetails } from '../../../interface/UserRoleMapping/UserRoleMapping.interface';

@Component({
    selector: 'app-public-department',
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
        ReactiveFormsModule,
        DynamicButtonComponent,
        DynamicFormPopupComponent,
        CommonModule,
    ],
    templateUrl: './public-department.component.html',
    styleUrl: './public-department.component.scss',
})
export class PublicDepartmentComponent {
    ApplicationId!: number;
    isToggled = false;
    UserCode: number;
    ViewclassApplied = false;
    popupVisible: boolean = false;
    selectedRow: IPublicDepartment;
    dataSource = new MatTableDataSource<IPublicDepartment>([]);
    form!: FormGroup;
    userList: string[] = [];
    filteredList: string[] = [];
    displayedColumns: { key: string; header: string; width?: string }[] = [
        {
            key: 'Name',
            header: 'إسم الدائرة	',
            width: '200px',
        },
        {
            key: 'DepartmentHeadName',
            header: 'إسم الموظف لأستقبال الطلبات الخارجية	',
            width: '250px',
        },
        { key: 'CreatedDate', header: 'تاريخ الإنشاء	', width: '250px' },
        { key: 'CreatedByUser', header: 'أُنشئ بواسطة	', width: '250px' },

        { key: 'action', header: 'Action', width: '120px' },
    ];

    displayedColumnKeys: string[] = this.displayedColumns.map((c) => c.key);

    fields = [
        {
            name: 'Name',
            label: 'إسم الدائرة	',
            type: 'text',
            validators: [Validators.required],
        },
        {
            name: 'UserId',
            label: 'إسم الموظف لأستقبال الطلبات الخارجية',
            type: 'autocomplete',
            validators: [Validators.required],
        },
    ];
    initialData: any = {};

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        public themeService: CustomizerSettingsService,
        private httpService: PublicDepartmentService,
        private storage: StorageService,
        private router: Router,
        private toast: ToastrService,
        private dialog: MatDialog,
        private fb: FormBuilder
    ) {
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
        const user: IUser = this.storage.get(StorageKeys.User);
        this.UserCode = user?.USER_CODE ? +user?.USER_CODE : (0 as number);
        this.form = this.fb.group({
            Name: ['', Validators.required],
            UserId: ['', Validators.required],
        });
        this.getDepartmentList();
    }

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getDepartmentList(): void {
        const body = {
            defaultcolumns: {
                created_by: this.UserCode,
            },
        };

        this.httpService.GetDepartmentList(body).subscribe({
            next: (response) => {
                var responseData = response.Data as IPublicDepartment[];
                this.dataSource.data = responseData;
                this.dataSource.paginator = this.paginator;
            },
            error: (error) => {
                console.error('Error occurred:', error);
            },
        });
    }
    // getUserList(): void {
    //     const body = {
    //         CreatedBy: this.UserCode,
    //         ApplicationId: this.ApplicationId,
    //     };

    //     this.httpService.GetUserList(body).subscribe({
    //         next: (response) => {
    //             const responseData = response.Data as IUserDetails[];
    //             this.userList = responseData.map((u) => u.FullNameAr);
    //             this.filteredList = [...this.userList];
    //             console.log('User List:', this.userList);
    //         },
    //         error: (error) => {
    //             console.error('Error occurred:', error);
    //             this.toast.error('Failed to load user list', 'Error');
    //         },
    //     });
    // }

    // handle focus on input
    onFocusInput(): void {
        // When user focuses on input field
        this.filteredList = [...this.userList]; // show all initially
        console.log('Show all user names on focus:', this.filteredList);
    }

    // handle typing in input
    onInputChange(value: string): void {
        // filter names as user types
        this.filteredList = this.userList.filter((name) =>
            name.toLowerCase().includes(value.toLowerCase())
        );
        console.log('Filtered user list:', this.filteredList);
    }

    onSelectUser(name: string): void {
        this.form.get('employeeName')?.setValue(name);
        console.log('Selected user:', name);
    }

    GetDepartmentDetails(Id: number): void {
        const body = {
            Id,
            defaultcolumns: {
                created_by: this.UserCode,
            },
        };

        this.httpService.GetDepartmentDetails(body).subscribe({
            next: (response) => {
                const res = response.Data[0] as any;
                console.log('Department details:', res);

                // patch values into form fields
                this.form.patchValue({
                    Name: res?.Name || '',
                    UserId: res?.DepartmentHeadId || null,
                });

                // store initial data for update reference
                this.initialData = {
                    Id: res?.Id || null,
                    Name: res?.Name || '',
                    UserId: res?.DepartmentHeadId || null,
                    UserCode: res?.DepartmentHeadId,
                    DepartmentHeadName: res?.DepartmentHeadName,
                };
                this.onSelectUser(res?.DepartmentHeadName);

                this.popupVisible = true;
            },
            error: (error) => {
                console.error('Error getting department details:', error);
                this.toast.error('Failed to load department details');
            },
        });
    }

    toggleClassView() {
        this.ViewclassApplied = !this.ViewclassApplied;
    }
    ViewData(row: IPublicDepartment): void {
        this.selectedRow = row;
        this.toggleClassView();
    }

    applications: any[] = [];

    currentEditingData: any = null;

    onEdit(element: any): void {
        this.currentEditingData = element;
        this.GetDepartmentDetails(element.Id);
    }

    onAddEdit(formData: any) {
        if (!formData?.Name || !formData?.UserId) {
            this.toast.error('Please fill all required fields');
            return;
        }

        const payload = {
            Id: this.initialData?.Id || 0,
            Name: formData?.Name,
            DepartmentHeadId: formData?.UserId,
            defaultcolumns: {
                created_ip: '37.41.99.126',
                created_pc: '',
                created_url: '',
                created_by: this.UserCode,
            },
        };

        console.log('Payload to send:', payload);

        this.httpService.GetDepartmentDetails(payload).subscribe({
            next: (response: any) => {
                if (response.Status === 200) {
                    const msg = this.initialData?.Id
                        ? 'Department updated successfully!'
                        : 'Department added successfully!';
                    this.toast.success(msg);
                    this.getDepartmentList();
                    this.popupVisible = false;
                } else {
                    this.toast.error(
                        response?.Message || 'Failed to save department'
                    );
                }
            },
            error: (error) => {
                console.error('Error occurred:', error);
                this.toast.error('Error saving department');
            },
        });
    }

    onDelete(row: IPublicDepartment): void {
        if (!row || !row.Id) return;

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                title: 'Confirm Delete',
                message: `Are you sure you want to delete `,
            },
        });

        const payload = {
            Id: row.Id,
            defaultcolumns: {
                deleted_by: this.UserCode,
            },
        };

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.httpService.DeleteDepartment(payload).subscribe({
                    next: (response: any) => {
                        if (response.Status === 200 && response?.Data) {
                            this.toast.success(
                                'Location deleted successfully!'
                            );
                            this.getDepartmentList();
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
