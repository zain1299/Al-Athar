import { Component, ViewChild } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    ReactiveFormsModule,
    Validators,
    FormControl,
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
import { wordCountValidator } from '../../../shared/characterLength';
import { IGroupUsers } from '../../../interface/Group/Group.interface';
import { IGroup } from '../../../interface/Group/OG-Group.interface';
import { IUserList } from '../../../interface/Login/loginResponse.interface';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-groups-users',
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
    ],
    templateUrl: './groups-users.component.html',
    styleUrls: ['./groups-users.component.scss'],
})
export class GroupsUsersComponent {
    isToggled = false;
    classApplied = false;
    ViewclassApplied = false;
    dataSource = new MatTableDataSource<IGroupUsers>([]);
    form: FormGroup;
    UserCode: number | null;
    selectedRow: IGroupUsers;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild('searchInput') searchInput: any = null;
    displayedColumns: string[] = ['Id', 'GroupId', 'UserId', 'action'];

    allUsers: IUserList[] = [];
    allGroups: IGroup[] = [];

    userControl = new FormControl(); // Control for the autocomplete
    filteredUsers: Array<{ UserCode: string; FullNameAr: string }> = [];

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
            GroupId: [undefined, Validators.required],
            UserId: [undefined, Validators.required],
            Id: [undefined],
        });
    }

    ngOnInit(): void {
        this.OgGroupUsersList();
        this.loadGroups();
        const user: IUser = this.storage.get(StorageKeys.User);
        this.UserCode = user?.USER_CODE ? +user?.USER_CODE : null;
    }

    async loadUsers(searchTerm: string | number): Promise<void> {
        const body = {
            defaultcolumns: {
                created_by: 1414,
            },
            searchTerm: searchTerm,
        };

        try {
            const users = await lastValueFrom(
                this.httpService.GetUserList(body)
            );
            this.allUsers = users.Data as IUserList[];
            this.filteredUsers = this.allUsers;
        } catch (error) {
            console.error('Error loading users:', error);
            throw error; // Handle any errors
        }
    }

    // Handle user search input changes
    onUserSearch(event: Event): void {
        const searchTerm = (event.target as HTMLInputElement).value;
        this.loadUsers(searchTerm);
    }

    // Method to handle user selection
    onUserSelect(selectedUserCode: string): void {
        // Find the selected user in the allUsers array
        const selectedUser = this.allUsers.find(
            (user) => user.UserCode === selectedUserCode
        );

        if (selectedUser) {
            this.userControl.setValue(selectedUser.FullNameAr);
            this.form.patchValue({
                UserId: selectedUser.UserCode,
                FullNameAr: selectedUser.FullNameAr,
            });
        }
    }

    loadGroups(): void {
        this.httpService.OgGroupsList().subscribe((groups) => {
            this.allGroups = groups.Data as IGroup[];
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    toggleClass() {
        this.classApplied = !this.classApplied;
        this.userControl.setValue(null);

        if (!this.classApplied) {
            this.form.reset({
                Name: '',
                GroupId: undefined,
                UserId: undefined,
                Id: undefined,
            });

            if (this.searchInput) {
                this.searchInput.nativeElement.value = null;
            }
        }
    }

    toggleClassView() {
        this.ViewclassApplied = !this.ViewclassApplied;
    }

    ViewData(row: IGroupUsers): void {
        this.selectedRow = row;
        this.toggleClassView();
    }

    OgGroupUsersList() {
        this.httpService.OgGroupUsersList().subscribe({
            next: (response) => {
                this.dataSource.data = response.Data as IGroupUsers[];
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
                GroupId: +this.form.get('GroupId')?.value,
                UserId: +this.form.get('UserId')?.value,
            };

            if (body?.Id > 0) {
                const id = body?.Id;
                delete body?.Id;
                this.httpService.UpdateOgGroupUsers(id, body).subscribe({
                    next: (response) => {
                        if (response.Status === 200) {
                            this.toast.success(
                                'Group User updated successfully!'
                            );
                            this.toggleClass();
                            this.OgGroupUsersList();
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
                this.httpService.InsertOgGroupUsers(body).subscribe({
                    next: (response) => {
                        if (response.Status === 201) {
                            this.toast.success('Group created successfully!');
                            this.toggleClass();
                            this.OgGroupUsersList();
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

    async onEdit(row: IGroupUsers): Promise<void> {
        this.selectedRow = row;
        this.toggleClass();

        if (this.selectedRow != null) {
            this.form.patchValue({
                GroupId: this.selectedRow.GroupId,
                UserId: this.selectedRow.UserId,
                Id: this.selectedRow.Id,
            });

            // Clear the userControl and allUsers before loading new users
            this.userControl.setValue('');
            this.allUsers = [];

            try {
                // Await the completion of loadUsers and proceed directly after it's done
                await this.loadUsers(this.selectedRow.UserId);

                // Once loadUsers is finished, set the user in the userControl
                const selectedUser = this.allUsers.find(
                    (user) =>
                        user.UserCode === this.selectedRow.UserId.toString()
                );

                if (selectedUser) {
                    // Set the value of the userControl to the selected user's name
                    this.userControl.setValue(selectedUser.FullNameAr);
                }
            } catch (error) {
                console.error('Error loading users:', error);
            }
        }
    }

    onDelete(group: IGroupUsers): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '300px',
            data: {
                title: 'Confirm Delete',
                message: `Are you sure you want to delete this group: ${group.Id}?`,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.DeleteOgGroupUsers(group);
            }
        });
    }

    DeleteOgGroupUsers(group: IGroupUsers): void {
        this.httpService.DeleteOgGroupUsers(group.Id).subscribe({
            next: (response) => {
                if (response.Status == 200) {
                    this.toast.success('Group deleted successfully!');
                    this.OgGroupUsersList();
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
