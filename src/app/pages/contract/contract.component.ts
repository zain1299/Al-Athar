import { Component, ViewChild } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../shared/http.service';
import { StorageService } from '../../shared/storage.service';
import { CustomizerSettingsService } from '../../theme/customizer-settings/customizer-settings.service';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';
import {
    IContractDetails,
    IContracts,
} from '../../interface/Contract/contract.interface';
import { IUser } from '../../interface';
import { StorageKeys } from '../../shared/storage-keys';
import { IOGContractTypes } from '../../interface/OGContractTypes/OGContractTypes.interface';
import { IVendor } from '../../interface/Vendor/vendor.interface';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { IGroup } from '../../interface/Group/OG-Group.interface';

@Component({
    selector: 'app-contract',
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
        MatSelectModule,
        MatAutocompleteModule,
        CommonModule,
        MatNativeDateModule,
        MatDatepickerModule,
    ],
    templateUrl: './contract.component.html',
    styleUrl: './contract.component.scss',
})
export class ContractComponent {
    isToggled = false;
    classApplied = false;
    ViewclassApplied = false;
    dataSource = new MatTableDataSource<IContracts>([]);
    form: FormGroup;
    UserCode: number | null;
    selectedRow: IContracts;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    allContractTypes: IOGContractTypes[] = [];
    allVendors: IVendor[] = [];

    allGroups: IGroup[] = [];

    displayedColumns: string[] = [
        'ContractTitle',
        'Type',
        'Vendor',
        'StartDate',
        'EndDate',
        'Status',
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
            ContractTitle: ['', Validators.required],
            TypeId: ['', Validators.required],
            VendorId: ['', Validators.required],
            StartDate: ['', Validators.required],
            EndDate: ['', Validators.required],
            Description: [''],
            URL: [''],
            GroupId: [[], Validators.required],
            Id: [undefined],
        });
    }

    ngOnInit(): void {
        this.contractsList();
        this.OgContractTypeList();
        this.VendorList();
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
                ContractTitle: undefined,
                TypeId: undefined,
                VendorId: undefined,
                StartDate: undefined,
                EndDate: undefined,
                Description: undefined,
                URL: undefined,
                Id: undefined,
                GroupId: [[]],
            });
        }
    }

    toggleClassView() {
        this.ViewclassApplied = !this.ViewclassApplied;
    }

    ViewData(row: IContracts): void {
        this.selectedRow = row;
        this.toggleClassView();
    }

    contractsList() {
        this.httpService.contractsList().subscribe({
            next: (response) => {
                this.dataSource.data = response.Data as IContracts[];
                this.dataSource.paginator = this.paginator;
            },
            error: (error) => {
                console.error('Error occurred:', error);
            },
        });
    }

    findActiveContractDetail(
        details: IContractDetails[] | undefined
    ): IContractDetails {
        return (
            details?.find((x) => x.IsActive === true) ||
            ({} as IContractDetails)
        );
    }

    OgContractTypeList() {
        this.httpService.OgContractTypeList().subscribe({
            next: (response) => {
                this.allContractTypes = response.Data as IOGContractTypes[];
                this.dataSource.paginator = this.paginator;
            },
            error: (error) => {
                console.error('Error occurred:', error);
            },
        });
    }

    VendorList() {
        this.httpService.VendorList().subscribe({
            next: (response) => {
                this.allVendors = response.Data as IVendor[];
                this.dataSource.paginator = this.paginator;
            },
            error: (error) => {
                console.error('Error occurred:', error);
            },
        });
    }
    OgGroupsList() {
        this.httpService.OgGroupsList().subscribe({
            next: (response) => {
                this.allGroups = response.Data as IGroup[];
                this.dataSource.paginator = this.paginator;
            },
            error: (error) => {
                console.error('Error occurred:', error);
            },
        });
    }

    onAddEdit(): void {
        if (this.form.valid) {
            const startDate = new Date(this.form.get('StartDate')?.value);
            const endDate = new Date(this.form.get('EndDate')?.value);
            const body = {
                Id: this.form.get('Id')?.value ?? undefined,
                ContractTitle: this.form.get('ContractTitle')?.value,
                TypeId: this.form.get('TypeId')?.value,
                VendorId: this.form.get('VendorId')?.value,
                StartDate: startDate?.toISOString(),
                EndDate: endDate?.toISOString(),
                Description: this.form.get('Description')?.value,
                URL: this.form.get('URL')?.value,
                GroupId: this.form.get('GroupId')?.value,
            };

            if (body?.Id > 0) {
                const id = body?.Id;
                delete body?.Id;
                this.httpService.Updatecontracts(id, body).subscribe({
                    next: (response) => {
                        if (response.Status === 200) {
                            this.toast.success(
                                'Group User updated successfully!'
                            );
                            this.toggleClass();
                            this.contractsList();
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
                                    'An error occurred while updating the group users'
                            );
                        }
                    },
                });
            } else {
                this.httpService.Insertcontracts(body).subscribe({
                    next: (response) => {
                        if (response.Status === 201) {
                            this.toast.success('Group created successfully!');
                            this.toggleClass();
                            this.contractsList();
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

    async onEdit(row: IContracts): Promise<void> {
        this.selectedRow = row;
        this.toggleClass();

        if (this.selectedRow != null) {
            this.form.patchValue({
                Id: this.selectedRow.Id,
                VendorId: this.selectedRow?.Vendor?.Id,
                ContractTitle: this.selectedRow.ContractTitle,
                TypeId: this.selectedRow?.Type?.Id,
                StartDate: this.findActiveContractDetail(
                    this.selectedRow?.ContractDetails
                ).StartDate,
                EndDate: this.findActiveContractDetail(
                    this.selectedRow?.ContractDetails
                ).EndDate,
                Description: this.selectedRow.Description,
                URL: this.selectedRow.URL,
                GroupId:
                    this.selectedRow.ContractGroup?.map((x) => x.Group.Id) ||
                    [],
            });
        }
    }

    onDelete(contract: IContracts): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                title: 'Confirm Delete',
                message: `Are you sure you want to delete this Contract: ${contract.ContractTitle}?`,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.deleteVendor(contract);
            }
        });
    }

    deleteVendor(contract: IContracts): void {
        this.httpService.Deletecontracts(contract.Id).subscribe({
            next: (response) => {
                if (response.Status == 200) {
                    this.toast.success('Contract deleted successfully!');
                    this.contractsList();
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
