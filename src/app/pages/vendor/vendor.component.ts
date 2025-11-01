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
import { IVendor } from '../../interface/Vendor/vendor.interface';
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

@Component({
    selector: 'app-vendor',
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
    templateUrl: './vendor.component.html',
    styleUrls: ['./vendor.component.scss'],
})
export class VendorComponent {
    isToggled = false;
    classApplied = false;
    ViewclassApplied = false;
    dataSource = new MatTableDataSource<IVendor>([]);
    form: FormGroup;
    UserCode: number | null;
    selectedRow: IVendor;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    displayedColumns: string[] = [
        'Name',
        'PhoneNumber',
        'Email',
        'NTN',
        'AccountTitle',
        'BankName',
        'AccountNumberIBN',
        'action',
    ];

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
            PhoneNumber: ['', Validators.required],
            Email: ['', [Validators.required, Validators.email]],
            NTN: [''],
            AccountTitle: [''],
            BankName: [''],
            AccountNumberIBN: [''],
            Id: [undefined],
        });
    }

    ngOnInit(): void {
        this.VendorList();
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
                PhoneNumber: '',
                Email: '',
                NTN: '',
                AccountTitle: '',
                BankName: '',
                AccountNumberIBN: '',
                Id: undefined,
            });
        }
    }

    toggleClassView() {
        this.ViewclassApplied = !this.ViewclassApplied;
    }

    ViewData(row: IVendor): void {
        this.selectedRow = row;
        this.toggleClassView();
    }

    VendorList() {
        this.httpService.VendorList().subscribe({
            next: (response) => {
                this.dataSource.data = response.Data as IVendor[];
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
                PhoneNumber: `${this.form.get('PhoneNumber')?.value}`,
                Email: this.form.get('Email')?.value,
                NTN: this.form.get('NTN')?.value,
                AccountTitle: this.form.get('AccountTitle')?.value,
                BankName: this.form.get('BankName')?.value,
                AccountNumberIBN: this.form.get('AccountNumberIBN')?.value,
            };

            if (body?.Id > 0) {
                const id = body?.Id;
                delete body?.Id;
                this.httpService.UpdateVendor(id, body).subscribe({
                    next: (response) => {
                        if (response.Status === 200) {
                            this.toast.success('Vendor updated successfully!');
                            this.toggleClass();
                            this.VendorList();
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
                this.httpService.InsertVendor(body).subscribe({
                    next: (response) => {
                        if (response.Status === 201) {
                            this.toast.success('Vendor created successfully!');
                            this.toggleClass();
                            this.VendorList();
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

    onEdit(row: IVendor): void {
        this.selectedRow = row;
        this.toggleClass();

        if (this.selectedRow != null) {
            this.form.patchValue({
                Name: this.selectedRow.Name,
                PhoneNumber: this.selectedRow.PhoneNumber,
                Email: this.selectedRow.Email,
                NTN: this.selectedRow.NTN,
                AccountTitle: this.selectedRow.AccountTitle,
                BankName: this.selectedRow.BankName,
                AccountNumberIBN: this.selectedRow.AccountNumberIBN,
                Id: this.selectedRow.Id,
            });
        }
    }

    onDelete(vendor: IVendor): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                title: 'Confirm Delete',
                message: `Are you sure you want to delete this vendor: ${vendor.Name}?`,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.deleteVendor(vendor);
            }
        });
    }

    deleteVendor(vendor: IVendor): void {
        this.httpService.DeleteVendor(vendor.Id).subscribe({
            next: (response) => {
                if (response.Status == 200) {
                    this.toast.success('Vendor deleted successfully!');
                    this.VendorList();
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
