import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { CustomizerSettingsService } from '../../../theme/customizer-settings/customizer-settings.service';
import { DashboardService } from '../../../shared/services/dashboard';
import { StorageService } from '../../../shared/storage.service';
import { IUser } from '../../../interface';
import { StorageKeys } from '../../../shared/storage-keys';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '../../../shared/http.service';
import { IUserList } from '../../../interface/Login/loginResponse.interface';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule, NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../../../common/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DynamicButtonComponent } from "../../../shared/components/dynamic-button/dynamic-button.component";

interface ISecretaryManage {
    UserAccountManagerId: number;
    ManagedById: number;
    UserId: number;
    FullNameAr: string;
    FullNameEN: string;
    Picture: string;
    ProfilePictureUrl: string;
    ProfilePicture: string;
    CreatedDate: string;
    UpdatedDate: string;
    defaultcolumns: any;
}

@Component({
    selector: 'app-secretary-manage',
    standalone: true,
    imports: [
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgIf,
    CommonModule,
    DynamicButtonComponent
],
    templateUrl: './secretary-manage.component.html',
    styleUrl: './secretary-manage.component.scss',
})
export class SecretaryManageComponent {
    displayedColumns: string[] = [
        'UserAccountManagerId',
        'FullNameAr',
        'CreatedDate',
        'action',
    ];
    dataSource = new MatTableDataSource<ISecretaryManage>();

    user: IUser;
    classApplied = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    userControl = new FormControl();
    filteredUsers: Array<{ UserCode: string; FullNameAr: string }> = [];
    UserCode: number | null;
    isToggled = false;
    form: FormGroup;

    constructor(
        public themeService: CustomizerSettingsService,
        private dashboardService: DashboardService,
        private httpService: HttpService,
        private router: Router,
        private fb: FormBuilder,
        private storage: StorageService,
        private toast: ToastrService,
        private dialog: MatDialog
    ) {
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit(): void {
        this.user = this.storage.get(StorageKeys.User);
        this.UserCode = this.user?.USER_CODE ? +this.user?.USER_CODE : null;

        this.form = this.fb.group({
            UserId: [undefined, Validators.required],
            Id: [undefined],
        });

        this.SecretaryList();
    }

    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    SecretaryList(): void {
        const requestBody = {
            defaultcolumns: { created_by: this.user.USER_CODE },
        };

        this.dashboardService.SecretaryList(requestBody).subscribe({
            next: (response) => {
                if (response?.Data) {
                    this.dataSource.data = response?.Data;
                }
            },
            error: (error) => {
                console.error('Error occurred:', error);
            },
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    async loadUsers(searchTerm: string | number): Promise<void> {
        const body = {
            defaultcolumns: {
                created_by: this.UserCode,
            },
            searchTerm: searchTerm,
        };

        try {
            const users = await lastValueFrom(
                this.httpService.GetUserList(body)
            );
            this.filteredUsers = users.Data as IUserList[];
        } catch (error) {
            console.error('Error loading users:', error);
            throw error; // Handle any errors
        }
    }

    onUserSearch(event: Event): void {
        const searchTerm = (event.target as HTMLInputElement).value;
        this.loadUsers(searchTerm);
    }

    onUserSelect(selectedUserCode: string): void {
        const selectedUser = this.filteredUsers.find(
            (user) => user.UserCode === selectedUserCode
        );

        if (selectedUser) {
            this.userControl.setValue(selectedUser.FullNameAr);
            this.form.patchValue({
                UserId: selectedUser.UserCode,
                FullNameAr: selectedUser.FullNameAr,
            });
        }
    }

    onAdd(): void {
        if (this.form.valid) {
            const body = {
                Id: this.form.get('Id')?.value ?? undefined,
                ManagedById: +this.form.get('UserId')?.value,
                defaultcolumns: {
                    created_by: this.UserCode,
                },
            };

            this.dashboardService
                .InsertUpdateUserAccountManager(body)
                .subscribe({
                    next: (response) => {
                        if (response.Status === 200 && response?.Data) {
                            this.toast.success(
                                'Account secretary created successfully!'
                            );
                            this.toggleClass();
                            this.SecretaryList();
                        } else {
                            this.toast.error(response.Message);
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
                                    'An error occurred while creating the group'
                            );
                        }
                    },
                });
        } else {
            this.form.markAllAsTouched();
        }
    }

    onDelete(menu: ISecretaryManage): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                title: 'Confirm Delete',
                message: `Are you sure?: ${menu.FullNameAr} ?`,
            },
        });

        const body = {
            UserAccountManagerId: menu.UserAccountManagerId,
            defaultcolumns: {
                created_by: this.UserCode,
            },
        };

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.dashboardService.DeleteUserAccountManager(body).subscribe({
                    next: (response) => {
                        if (response.Status === 200 && response?.Data) {
                            this.toast.success(
                                'Account secretary deleted successfully!'
                            );
                            this.SecretaryList();
                        } else {
                            this.toast.error(response.Message);
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
                                    'An error occurred while creating the group'
                            );
                        }
                    },
                });
            }
        });
    }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }
}
