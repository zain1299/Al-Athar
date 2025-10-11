import { NgIf, NgFor } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { IOGMenuItem } from '../../../interface/Screens/screen.interface';
import { HttpService } from '../../../shared/http.service';
import { LabelService } from '../../../shared/LabelService';
import { StorageService } from '../../../shared/storage.service';
import { CustomizerSettingsService } from '../../../theme/customizer-settings/customizer-settings.service';
import { StorageKeys } from '../../../shared/storage-keys';
import { IScreenAction, IUser } from '../../../interface';
import { ConfirmDialogComponent } from '../../../common/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-screen-actions',
    standalone: true,
    imports: [
        MatCardModule,
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule,
        NgIf,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCheckboxModule,
    ],
    templateUrl: './screen-actions.component.html',
    styleUrl: './screen-actions.component.scss',
})
export class ScreenActionsComponent {
    isToggled = false;
    classApplied = false;
    ViewclassApplied = false;
    dataSource = new MatTableDataSource<IScreenAction>([]);
    form: FormGroup;
    UserCode: number | null;
    selectedRow: IScreenAction;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    displayedColumns: string[] = [
        'ActionCode',
        'ActionGroupName',
        'ActionName',
        'ActionNameEng',
        'ControlID',
        'action',
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
            actionGroupName: ['', Validators.required],
            actionName: ['', Validators.required],
            actionNameEng: ['', Validators.required],
            controlID: ['', Validators.required],
            actionCode: [0],
        });
    }

    ngOnInit(): void {
        this.ScreenActionSelectList();
        const user: IUser = this.storage.get(StorageKeys.User);
        this.UserCode = user?.USER_CODE ? +user?.USER_CODE : null;
    }

    ScreenActionSelectList() {
        this.httpService.ScreenActionSelectList().subscribe({
            next: (response) => {
                this.dataSource.data = response.Data as IScreenAction[];
                this.dataSource.paginator = this.paginator;
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

        // Reset the form values when the popup is closed
        if (!this.classApplied) {
            this.form.reset({
                actionGroupName: '',
                actionName: '',
                actionNameEng: '',
                controlID: '',
                actionCode: 0,
            });
        }
    }
    toggleClassView() {
        this.ViewclassApplied = !this.ViewclassApplied;
    }

    ViewData(row: IScreenAction): void {
        this.selectedRow = row;
        this.toggleClassView();
    }

    onAddEdit(): void {
        if (this.form.valid) {
            const body: IScreenAction = {
                ActionCode: this.form.get('actionCode')?.value ?? 0,
                ActionGroupName: this.form.get('actionGroupName')?.value,
                ActionName: this.form.get('actionName')?.value,
                ActionNameEng: this.form.get('actionNameEng')?.value,
                ControlID: this.form.get('controlID')?.value,
                CreatedBy: this.UserCode ? +this.UserCode : 0,
                UpdatedBy: this.form.get('actionCode')?.value
                    ? this.UserCode
                        ? +this.UserCode
                        : 0
                    : undefined,
                UpdatedIP: '',
            };

            this.httpService.InsertUpdateScreenAction(body).subscribe({
                next: (response) => {
                    if (response.Data) {
                        this.toast.success(
                            'Screen Action Inserted Successfully!'
                        );
                        this.toggleClass();
                        this.ScreenActionSelectList();
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

    onEdit(row: IScreenAction): void {
        this.selectedRow = row;
        this.toggleClass();

        if (this.selectedRow != null) {
            this.form.patchValue({
                actionCode: this.selectedRow.ActionCode,
                actionGroupName: this.selectedRow.ActionGroupName,
                actionName: this.selectedRow.ActionName,
                actionNameEng: this.selectedRow.ActionNameEng,
                controlID: this.selectedRow.ControlID,
            });
        }
    }

    onDelete(menu: IScreenAction): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                title: 'Confirm Delete',
                message: `Are you sure you want to delete this screen: ${menu.ActionName} ?`,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                // Proceed with delete
                this.deleteScreen(menu);
            }
        });
    }

    deleteScreen(menu: IScreenAction): void {
        this.httpService.DelteteScreenAction(menu).subscribe({
            next: (response) => {
                if (response.Data) {
                    this.toast.success('Screen Action Deleted Successfully!');

                    this.ScreenActionSelectList();
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
