import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../theme/customizer-settings/customizer-settings.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../../shared/http.service';
import { ButtonLabels, ILabels, IRole, IUser } from '../../../interface';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { SidebarComponent } from '../../file-manager/sidebar/sidebar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LabelService } from '../../../shared/LabelService';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { StorageService } from '../../../shared/storage.service';
import { StorageKeys } from '../../../shared/storage-keys';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../../../common/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-roles',
    standalone: true,
    imports: [
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        RouterLink,
        MatTableModule,
        MatPaginatorModule,
        NgIf,
        MatCheckboxModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        SidebarComponent,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
    ],
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.scss'],
})
export class RolesComponent {
    isToggled = false;
    classApplied = false;
    ViewclassApplied = false;
    dataSource = new MatTableDataSource<IRole>([]);
    form: FormGroup;

    // Updated displayedColumns to remove RoleId
    displayedColumns: string[] = [
        'select',
        'RoleId',
        'RoleName',
        'RoleNameEn',
        'action',
    ];
    selection = new SelectionModel<IRole>(true, []);

    Labels: ILabels = {
        buttons: {
            cancel: { en: '', ar: '' },
            save: { en: '', ar: '' },
        },
        Role: {
            label: { en: '', ar: '' },
            labelEn: { en: '', ar: '' },
            headingLabel: { en: '', ar: '' },
        },
    };
    language: 'en' | 'ar' = 'ar';
    UserCode: number;
    selectedRow: IRole;

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
            roleLabelEn: ['', Validators.required],
            roleLabelAr: ['', Validators.required],
            RoleId: [0],
        });
    }

    ngOnInit(): void {
        this.RoleSelectListData();

        this.labelService.loadLabels().subscribe((labels) => {
            this.labelService.setLabels(labels);
            this.Labels = labels; // Set the labels here
        });
        const user: IUser = this.storage.get(StorageKeys.User);
        this.UserCode = user?.USER_CODE ? +user?.USER_CODE  : 0  as number;
    }

    RoleSelectListData() {
        this.httpService.RoleSelectList().subscribe({
            next: (response) => {
                this.dataSource.data = response.Data as IRole[];
            },
            error: (error) => {
                console.error('Error occurred:', error);
            },
        });
    }
    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    toggleClass() {
        this.classApplied = !this.classApplied;
    }
    toggleClassView() {
        this.ViewclassApplied = !this.ViewclassApplied;
    }

    ViewData(row: IRole): void {
        this.selectedRow = row;
        this.toggleClassView();
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }
        this.selection.select(...this.dataSource.data);
    }

    checkboxLabel(row?: IRole): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
            row.RoleId // Update the label to use RoleName instead of RoleId
        }`;
    }

    onAddEdit(): void {
        if (this.form.valid) {
            // Perform the add action (e.g., sending data to API)
            const body: IRole = {
                RoleId: this.form.get('RoleId')?.value ?? 0,
                RoleName: this.form.get('roleLabelAr')?.value,
                RoleNameEn: this.form.get('roleLabelEn')?.value,
                IsWilayatRole: false,
                CreatedBy: +this.UserCode,
                CreatedIP: '',
                CreatedPC: '',
                CreatedUrl: '',
                UpdatedBy: this.form.get('RoleId')?.value
                    ? +this.UserCode
                    : undefined,
                UpdatedIP: '',
                UpdatedPC: '',
                UpdatedUrl: '',
            };

            this.httpService.RoleInsertUpdate(body).subscribe({
                next: (response) => {
                    if (response.Data) {
                        this.toast.success('Role Inserted Successfully!');
                        this.toggleClass();
                        this.RoleSelectListData();
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
            // If the form is invalid, display errors
            this.form.markAllAsTouched(); // This will trigger validation errors
        }
    }

    onEdit(row: IRole): void {
        this.selectedRow = row;
        this.toggleClass();

        if (this.selectedRow != null) {
            this.form.patchValue({
                roleLabelAr: this.selectedRow.RoleName,
                roleLabelEn: this.selectedRow.RoleNameEn,
                RoleId: this.selectedRow.RoleId,
            });
        }
    }

    onDelete(role: IRole): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                title: 'Confirm Delete',
                message: `Are you sure you want to delete this role: ${role.RoleName}?`,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                // Proceed with delete
                this.deleteRole(role);
            }
        });
    }

    deleteRole(role: IRole): void {
        // Perform delete action here
        console.log('Role deleted:', role);
    }
}
