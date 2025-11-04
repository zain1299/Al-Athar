import { Component, ViewChild } from '@angular/core';
import { CustomizerSettingsService } from '../../../theme/customizer-settings/customizer-settings.service';
import { CommitteeService } from '../../../shared/services/committee.service';
import { StorageService } from '../../../shared/storage.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ICommittee } from '../../../interface/committee/committee.interface';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { StorageKeys } from '../../../shared/storage-keys';
import { IUser } from '../../../interface';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../../common/confirm-dialog/confirm-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'app-committee',
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
    templateUrl: './committee.component.html',
    styleUrls: ['./committee.component.scss'],
})
export class CommitteeComponent {
    UserCode!: number;
    selectedRow!: ICommittee;
    dataSource = new MatTableDataSource<ICommittee>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        public themeService: CustomizerSettingsService,
        private httpService: CommitteeService,
        private storage: StorageService,
        private router: Router,
        private toast: ToastrService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        const user: IUser = this.storage.get(StorageKeys.User);
        this.UserCode = user?.USER_CODE ? +user?.USER_CODE : (0 as number);
        this.getCommitteeList();
    }

    displayedColumns: { key: string; header: string; width?: string }[] = [
        { key: 'CommNameAra', header: 'اللجنة', width: '25%' },
        { key: 'CommNameEng', header: 'التفاصيل', width: '25%' },
        { key: 'action', header: '', width: '15%' },
    ];

    get displayedColumnKeys(): string[] {
        return this.displayedColumns.map((c) => c.key);
    }

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getCommitteeList(): void {
        const body = {
            defaultcolumns: {
                created_by: this.UserCode,
            },
        };

        this.httpService.GetCommitteeList(body).subscribe({
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
    onDelete(row: ICommittee): void {
        if (!row || !row.CommitteeId) return;

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                title: 'Confirm Delete',
                message: `Are you sure you want to delete "${row.CommNameAra}"?`,
            },
        });

        const payload = {
            CommitteeId: row.CommitteeId,
            defaultcolumns: {
                deleted_by: this.UserCode,
            },
        };

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.httpService.DeleteCommittee(payload).subscribe({
                    next: (response: any) => {
                        if (response.Status === 200 && response?.Data) {
                            this.toast.success(
                                'Application deleted successfully!'
                            );
                            this.getCommitteeList();
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
}
