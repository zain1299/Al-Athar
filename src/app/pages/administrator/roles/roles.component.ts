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
import {
    ButtonLabels,
    ILabels,
    IRole,
    IScreenAction,
    IUser,
} from '../../../interface';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { NgFor, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
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
import { MatChipsModule } from '@angular/material/chips';
import { IOGMenuItem } from '../../../interface/Screens/screen.interface';
import { DynamicFormPopupComponent } from '../../../shared/components/dynamic-form-popup/dynamic-form-popup.component';
import { IApplication } from '../../../interface/Application/application.interface';
import { DynamicButtonComponent } from '../../../shared/components/dynamic-button/dynamic-button.component';

@Component({
    selector: 'app-roles',
    standalone: true,
    imports: [
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        NgIf,
        NgFor,
        MatCheckboxModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatChipsModule,
        DynamicFormPopupComponent,
        DynamicButtonComponent,
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
    screensList: IOGMenuItem[];
    actionList: IScreenAction[];

    // Updated displayedColumns to remove RoleId
    displayedColumns: string[] = [
        'RoleId',
        'RoleName',
        'RoleNameEn',
        'MenusItems',
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
    language: 'en' | 'ar' = 'en';
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
            selectedScreens: [[], Validators.required],
            selectedActions: [[]],
        });
    }

    ngOnInit(): void {
        this.ScreenActionSelectList();
        this.ScreenSelectList();

        this.labelService.loadLabels().subscribe((labels) => {
            this.labelService.setLabels(labels);
            this.Labels = labels; // Set the labels here
        });
        const user: IUser = this.storage.get(StorageKeys.User);
        this.UserCode = user?.USER_CODE ? +user?.USER_CODE : (0 as number);
    }

    RoleSelectListData() {
        this.httpService.RoleSelectList().subscribe({
            next: (response) => {
                response.Data?.forEach((x) => {
                    if (x.ActionCodes) {
                        const actionCodesArray = x.ActionCodes.split(',');

                        // Filter and map actionCodesArray to match with actionList
                        x.ActionCodesListing = actionCodesArray
                            .filter((code) =>
                                this.actionList?.some(
                                    (action) => action.ActionCode === +code
                                )
                            )
                            .map(
                                (code) =>
                                    this.actionList?.find(
                                        (action) => action.ActionCode === +code
                                    ) as IScreenAction
                            );
                    } else {
                        x.ActionCodesListing = [];
                    }
                });

                console.log('response.Data', response.Data);

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

        if (!this.classApplied) {
            this.form.reset({
                roleLabelEn: '',
                roleLabelAr: '',
                selectedScreens: [],
                selectedActions: [],
                RoleId: 0,
            });
        }
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

            const selectedScreensArray =
                this.form.get('selectedScreens')?.value;
            const selectedScreensString = selectedScreensArray
                ? selectedScreensArray.join(',')
                : '';

            const selectedActionsArray =
                this.form.get('selectedActions')?.value;
            const selectedActionsString = selectedActionsArray
                ? selectedActionsArray.join(',')
                : '';

            const body: IRole = {
                RoleId: this.form.get('RoleId')?.value ?? 0,
                RoleName: this.form.get('roleLabelAr')?.value,
                RoleNameEn: this.form.get('roleLabelEn')?.value,
                IsWilayatRole: false,
                ScreenIds: selectedScreensString,
                ActionCodes: selectedActionsString,
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
            const selectedScreenIds = this.selectedRow?.MenusItems?.map(
                (menuItem) => menuItem.Id
            );

            const selectedActionsId = this.selectedRow?.ActionCodesListing?.map(
                (x) => x.ActionCode
            );
            this.form.patchValue({
                roleLabelAr: this.selectedRow.RoleName,
                roleLabelEn: this.selectedRow.RoleNameEn,
                RoleId: this.selectedRow.RoleId,
                selectedScreens: selectedScreenIds,
                selectedActions: selectedActionsId,
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
        this.httpService.RoleDelete(role).subscribe({
            next: (response) => {
                if (response.Status == 200) {
                    this.toast.success('Role deleted successfully!');
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
    }

    ScreenSelectList() {
        this.httpService.ScreenSelectList().subscribe({
            next: (response) => {
                this.screensList = response.Data as IOGMenuItem[];
            },
            error: (error) => {
                console.error('Error occurred:', error);
            },
        });
    }

    ScreenActionSelectList() {
        this.httpService.ScreenActionSelectList().subscribe({
            next: (response) => {
                this.actionList = response.Data as IScreenAction[];
                this.RoleSelectListData();
            },
            error: (error) => {
                console.error('Error occurred:', error);
            },
        });
    }

    popupVisible: boolean = false;

    fields = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            validators: [Validators.required],
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            // validators: [Validators.required],
        },
    ];

    editData = {
        name: 'Test App',
        description: 'This is test',
        email: 'test@app.com',
    };
    submit(event: any): void {
        console.log('event', event);
    }
}
