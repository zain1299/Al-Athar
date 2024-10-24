import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../../interface';
import { IOGMenuItem } from '../../interface/Screens/screen.interface';
import { HttpService } from '../../shared/http.service';
import { LabelService } from '../../shared/LabelService';
import { StorageKeys } from '../../shared/storage-keys';
import { StorageService } from '../../shared/storage.service';
import { CustomizerSettingsService } from '../../theme/customizer-settings/customizer-settings.service';
import { NgIf, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';

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
        MatCheckboxModule,
    ],
    templateUrl: './vendor.component.html',
    styleUrl: './vendor.component.scss',
})
export class VendorComponent {
    isToggled = false;
    classApplied = false;
    ViewclassApplied = false;
    dataSource = new MatTableDataSource<IOGMenuItem>([]);
    form: FormGroup;
    UserCode: number | null;
    selectedRow: IOGMenuItem;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    displayedColumns: string[] = [
      'Name', 
      'PhoneNumber', 
      'Email', 
      'NTN', 
      'AccountTitle', 
      'BankName', 
      'AccountNumberIBN', 
      'action'
    ];

    constructor(
        public themeService: CustomizerSettingsService,
        private httpService: HttpService,
        private labelService: LabelService,
        private fb: FormBuilder,
        private storage: StorageService,
        private toast: ToastrService,
        private dialog: MatDialog
    ) {
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });

        this.form = this.fb.group({
            title: ['', Validators.required],
            icon: ['', Validators.required],
            routerLink: ['', Validators.required],
            badge: [0],
            parentId: [null],
            isExpandable: [false],
            Id: [0],
        });
    }

    ngOnInit(): void {
        this.VendorList();
        const user: IUser = this.storage.get(StorageKeys.User);
        this.UserCode = user?.USER_CODE ? +user?.USER_CODE : null;
    }

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    toggleClass() {
        this.classApplied = !this.classApplied;

        // Reset the form values when the popup is closed
        if (!this.classApplied) {
            this.form.reset({
                title: '',
                icon: '',
                routerLink: '',
                badge: 0,
                parentId: null,
                isExpandable: false,
                Id: 0,
            });
        }
    }
    toggleClassView() {
        this.ViewclassApplied = !this.ViewclassApplied;
    }

    ViewData(row: IOGMenuItem): void {
        this.selectedRow = row;
        this.toggleClassView();
    }

    VendorList() {
      debugger
        this.httpService.VendorList().subscribe({
            next: (response) => {
              console.log('response',response)
                // this.dataSource.data = response.Data as IOGMenuItem[];
                // this.dataSource.paginator = this.paginator;
            },
            error: (error) => {
                console.error('Error occurred:', error);
            },
        });
    }

    onAddEdit(): void {
        if (this.form.valid) {
            const body: IOGMenuItem = {
                Id: this.form.get('Id')?.value ?? 0,
                Title: this.form.get('title')?.value,
                Icon: this.form.get('icon')?.value,
                RouterLink: this.form.get('routerLink')?.value,
                IsExpandable: this.form.get('isExpandable')?.value,
                Badge: this.form.get('badge')?.value,
                ParentId: +this.form.get('parentId')?.value,
                CreatedBy: this.UserCode ? +this.UserCode : 0,
                CreatedIP: '',
                CreatedPC: '',
                CreatedUrl: '',
                UpdatedBy: this.form.get('Id')?.value
                    ? this.UserCode
                        ? +this.UserCode
                        : 0
                    : undefined,
                UpdatedIP: '',
                UpdatedPC: '',
                UpdatedUrl: '',
            };

            this.httpService.InsertUpdateScreen(body).subscribe({
                next: (response) => {
                    if (response.Data) {
                        this.toast.success('Screen Inserted Successfully!');
                        this.toggleClass();
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
        } else {
            this.form.markAllAsTouched();
        }
    }

    onEdit(row: IOGMenuItem): void {
        this.selectedRow = row;
        this.toggleClass();

        if (this.selectedRow != null) {
            this.form.patchValue({
                title: this.selectedRow.Title,
                icon: this.selectedRow.Icon,
                routerLink: this.selectedRow.RouterLink,
                badge: this.selectedRow.Badge,
                parentId: this.selectedRow.ParentId,
                isExpandable: this.selectedRow.IsExpandable,
                Id: this.selectedRow.Id,
            });
        }
    }

    onDelete(menu: IOGMenuItem): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                title: 'Confirm Delete',
                message: `Are you sure you want to delete this screen: ${menu.Title} ?`,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                // Proceed with delete
                this.deleteScreen(menu);
            }
        });
    }

    deleteScreen(menu: IOGMenuItem): void {
        this.httpService.DelteteScreen(menu).subscribe({
            next: (response) => {
                if (response.Data) {
                    this.toast.success('Screen Deleted Successfully!');

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
