import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../common/confirm-dialog/confirm-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from '../../../../shared/services/user.service';
import { IUser } from '../../../../interface';
import { ICommittee } from '../../../../interface/UserRoleMapping/UserRoleMapping.interface';
import { StorageKeys } from '../../../../shared/storage-keys';
import { StorageService } from '../../../../shared/storage.service';
import { CustomizerSettingsService } from '../../../../theme/customizer-settings/customizer-settings.service';
import { IUserDetails } from '../../../../interface/user/user.interface';

@Component({
    selector: 'app-user-listing',
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
        MatIconModule,
        MatPaginatorModule,
        NgFor,
    ],
    templateUrl: './user-listing.component.html',
    styleUrls: ['./user-listing.component.scss'],
})
export class UserListingComponent {
    UserCode!: number;
    ApplicationId!: number;
    selectedRow!: IUserDetails;
    dataSource = new MatTableDataSource<IUserDetails>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        public themeService: CustomizerSettingsService,
        private httpService: UserService,
        private storage: StorageService,
        private router: Router,
        private toast: ToastrService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        const user: IUser = this.storage.get(StorageKeys.User);

        this.UserCode = user?.USER_CODE ? +user?.USER_CODE : (0 as number);
        this.ApplicationId = +user?.ApplicationId || 0;
        this.getUserList();
    }

    displayedColumns: { key: string; header: string; width?: string }[] = [
        { key: 'FullNameAr', header: 'الاسم', width: '15%' },
        //{ key: 'FullNameEN', header: 'User Name (EN)', width: '25%' },
        { key: 'EmailID', header: ' البريد الالكتروني', width: '25%' },
        { key: 'GSM', header: '  الهاتف النقال	', width: '25%' },
        { key: 'action', header: 'Action', width: '15%' },
    ];

    get displayedColumnKeys(): string[] {
        return this.displayedColumns.map((c) => c.key);
    }

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getUserList(): void {
        const body = {
            CreatedBy: this.UserCode,
            ApplicationId: this.ApplicationId,
        };

        this.httpService.GetUserList(body).subscribe({
            next: (response) => {
                const responseData = response.Data as any[];
                this.dataSource.data = responseData;
                this.dataSource.paginator = this.paginator;
                console.log('this.dataSource.data', responseData);
            },
            error: (error) => {
                console.error('Error occurred:', error);
                this.toast.error('Failed to load committee list', 'Error');
            },
        });
    }

    ViewData(_t18: any) {
        console.log('View', _t18);
    }
    onEdit(_t18: any) {
        console.log('Edit', _t18);
    }
    onDelete(row: IUserDetails): void {
        if (!row || !row.UserCode) return;

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                title: 'Confirm Delete',
                message: `Are you sure you want to delete`,
            },
        });

        const payload = {
            UserCode: row.UserCode,
            CreatedBy: row.CreatedBy || this.UserCode,
            ApplicationId: this.ApplicationId,
            UpdatedBy: this.UserCode,
            UpdatedIP: '',
        };

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.httpService.DeleteUser(payload).subscribe({
                    next: (response: any) => {
                        if (response.Status === 200 && response?.Data) {
                            this.toast.success('User deleted successfully!');
                            this.getUserList();
                        } else {
                            this.toast.error(
                                response.Message || 'Failed to delete user.'
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
                                    'An error occurred while deleting the user.'
                            );
                        }
                    },
                });
            }
        });
    }
}
