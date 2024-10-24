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
import { HttpService } from '../../shared/http.service';
import { StorageService } from '../../shared/storage.service';
import { StorageKeys } from '../../shared/storage-keys';
import { CustomizerSettingsService } from '../../theme/customizer-settings/customizer-settings.service';
import { NgIf, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';
import { IUser } from '../../interface';
import { IOGContractTypes } from '../../interface/OGContractTypes/OGContractTypes.interface';

@Component({
    selector: 'app-og-contract-types',
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
    templateUrl: './og-contract-types.component.html',
    styleUrl: './og-contract-types.component.scss',
})
export class OgContractTypesComponent {
    isToggled = false;
    classApplied = false;
    ViewclassApplied = false;
    dataSource = new MatTableDataSource<IOGContractTypes>([]);
    form: FormGroup;
    UserCode: number | null;
    selectedRow: IOGContractTypes;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    displayedColumns: string[] = ['Id', 'Name', 'action'];

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
            Name: ['', Validators.required],

            Id: [undefined],
        });
    }

    ngOnInit(): void {
        this.OgContractTypeList();
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

    ViewData(row: IOGContractTypes): void {
        this.selectedRow = row;
        this.toggleClassView();
    }

    OgContractTypeList() {
        this.httpService.OgContractTypeList().subscribe({
            next: (response) => {
                this.dataSource.data = response.Data as IOGContractTypes[];
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
            };

            if (body?.Id > 0) {
                const id = body?.Id;
                delete body?.Id;
                this.httpService.UpdateOgContractType(id, body).subscribe({
                    next: (response) => {
                        if (response.Status === 200) {
                            this.toast.success('Vendor updated successfully!');
                            this.toggleClass();
                            this.OgContractTypeList();
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
                                    'An error occurred while updating the vendor'
                            );
                        }
                    },
                });
            } else {
                this.httpService.InsertOgContractType(body).subscribe({
                    next: (response) => {
                        if (response.Status === 201) {
                            this.toast.success('Vendor created successfully!');
                            this.toggleClass();
                            this.OgContractTypeList();
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
                                    'An error occurred while creating the vendor'
                            );
                        }
                    },
                });
            }
        } else {
            this.form.markAllAsTouched();
        }
    }

    onEdit(row: IOGContractTypes): void {
        this.selectedRow = row;
        this.toggleClass();

        if (this.selectedRow != null) {
            this.form.patchValue({
                Name: this.selectedRow.Name,
                Id: this.selectedRow.Id,
            });
        }
    }

    onDelete(vendor: IOGContractTypes): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                title: 'Confirm Delete',
                message: `Are you sure you want to delete this vendor: ${vendor.Name}?`,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.DeleteOgContractType(vendor);
            }
        });
    }

    DeleteOgContractType(vendor: IOGContractTypes): void {
        this.httpService.DeleteOgContractType(vendor.Id).subscribe({
            next: (response) => {
                if (response.Status == 200) {
                    this.toast.success('Vendor deleted successfully!');
                    this.OgContractTypeList();
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
