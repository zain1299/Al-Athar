import { Component, ViewChild } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { HttpService } from '../../../shared/http.service';
import { LabelService } from '../../../shared/LabelService';
import { StorageService } from '../../../shared/storage.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IOGMenuItem } from '../../../interface/Screens/screen.interface';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IUser } from '../../../interface';
import { StorageKeys } from '../../../shared/storage-keys';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'app-screens',
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
    templateUrl: './screens.component.html',
    styleUrl: './screens.component.scss',
})
export class ScreensComponent {
    isToggled = false;
    classApplied = false;
    ViewclassApplied = false;
    dataSource = new MatTableDataSource<IOGMenuItem>([]);
    form: FormGroup;
    UserCode: number;
    selectedRow: IOGMenuItem;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    displayedColumns: string[] = [
        'Id',
        'Title',
        'Icon',
        'IsExpandable',
        'RouterLink',
        'Badge',
        'ParentId',
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
        this.ScreenSelectList();
        const user: IUser = this.storage.get(StorageKeys.User);
        this.UserCode = +user.USER_CODE as number;
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

    ScreenSelectList() {
        this.httpService.ScreenSelectList().subscribe({
            next: (response) => {
                this.dataSource.data = response.Data as IOGMenuItem[];
                this.dataSource.paginator = this.paginator;
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
                CreatedBy: +this.UserCode,
                CreatedIP: '',
                CreatedPC: '',
                CreatedUrl: '',
                UpdatedBy: this.form.get('Id')?.value
                    ? +this.UserCode
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
                        this.ScreenSelectList();
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
}
