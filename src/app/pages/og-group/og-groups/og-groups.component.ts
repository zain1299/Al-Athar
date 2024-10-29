import { Component, ViewChild } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

import { NgIf, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConfirmDialogComponent } from '../../../common/confirm-dialog/confirm-dialog.component';
import { IUser } from '../../../interface';
import { HttpService } from '../../../shared/http.service';
import { StorageKeys } from '../../../shared/storage-keys';
import { StorageService } from '../../../shared/storage.service';
import { CustomizerSettingsService } from '../../../theme/customizer-settings/customizer-settings.service';
import { IGroup } from '../../../interface/Group/OG-Group.interface';
import { wordCountValidator } from '../../../shared/characterLength';

@Component({
    selector: 'app-og-groups',
    standalone: true,
    imports: [
        MatCardModule,
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule,
        NgIf,
        NgFor,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
    ],
    templateUrl: './og-groups.component.html',
    styleUrl: './og-groups.component.scss',
})
export class OGGroupsComponent {
    isToggled = false;
    classApplied = false;
    ViewclassApplied = false;
    dataSource = new MatTableDataSource<IGroup>([]);
    form: FormGroup;
    UserCode: number | null;
    selectedRow: IGroup;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    displayedColumns: string[] = ['Id', 'Name', 'Description', 'action'];

    constructor(
        public themeService: CustomizerSettingsService,
        private httpService: HttpService,
        private fb: FormBuilder,
        private storage: StorageService,
        private toast: ToastrService,
        private dialog: MatDialog
    ) {
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });

        this.form = this.fb.group({
            Name: ['', [Validators.required, wordCountValidator(100)]],
            Description: ['', wordCountValidator(200)],
            Id: [undefined],
        });
    }

    ngOnInit(): void {
        this.OgGroupsList();
        const user: IUser = this.storage.get(StorageKeys.User);
        this.UserCode = user?.USER_CODE ? +user?.USER_CODE : null;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    toggleClass() {
        this.classApplied = !this.classApplied;

        if (!this.classApplied) {
            this.form.reset({
                Name: '',
                Id: undefined,
            });
        }
    }

    toggleClassView() {
        this.ViewclassApplied = !this.ViewclassApplied;
    }

    ViewData(row: IGroup): void {
        this.selectedRow = row;
        this.toggleClassView();
    }

    OgGroupsList() {
        this.httpService.OgGroupsList().subscribe({
            next: (response) => {
                this.dataSource.data = response.Data as IGroup[];
                this.dataSource.paginator = this.paginator;
            },
            error: (error) => {
                console.error('Error occurred:', error);
            },
        });
    }

    onAddEdit(): void {
        if (this.form.valid) {
            const body = {
                Id: this.form.get('Id')?.value ?? undefined,
                Name: this.form.get('Name')?.value,
                Description: this.form.get('Description')?.value ?? '',
            };

            if (body?.Id > 0) {
                const id = body?.Id;
                delete body?.Id;
                this.httpService.UpdateOgGroups(id, body).subscribe({
                    next: (response) => {
                        if (response.Status === 200) {
                            this.toast.success('Vendor updated successfully!');
                            this.toggleClass();
                            this.OgGroupsList();
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
                                    'An error occurred while updating the group'
                            );
                        }
                    },
                });
            } else {
                this.httpService.InsertOgGroups(body).subscribe({
                    next: (response) => {
                        if (response.Status === 201) {
                            this.toast.success('Vendor created successfully!');
                            this.toggleClass();
                            this.OgGroupsList();
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
        } else {
            this.form.markAllAsTouched();
        }
    }

    onEdit(row: IGroup): void {
        this.selectedRow = row;
        this.toggleClass();

        if (this.selectedRow != null) {
            this.form.patchValue({
                Name: this.selectedRow.Name,
                Id: this.selectedRow.Id,
                Description: this.selectedRow.Description,
            });
        }
    }

    onDelete(group: IGroup): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                title: 'Confirm Delete',
                message: `Are you sure you want to delete this group: ${group.Name}?`,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.DeleteOgGroups(group);
            }
        });
    }

    DeleteOgGroups(group: IGroup): void {
        this.httpService.DeleteOgGroups(group.Id).subscribe({
            next: (response) => {
                if (response.Status == 200) {
                    this.toast.success('Vendor deleted successfully!');
                    this.OgGroupsList();
                } else {
                    this.toast.error(response.Message);
                }
            },
            error: (error) => {
                console.error('Error occurred:', error);
                this.toast.error(JSON.parse(error));
            },
        });
    }
}
