import { Component, ViewChild } from '@angular/core';
import { IUserRoleMapping, IUserRoleMappingResponse } from '../../../interface';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../../shared/http.service';
import { LabelService } from '../../../shared/LabelService';
import { StorageService } from '../../../shared/storage.service';
import { CustomizerSettingsService } from '../../../theme/customizer-settings/customizer-settings.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IGroupedApplication } from '../../../interface/UserRoleMapping/UserRoleMapping.interface';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { lastValueFrom } from 'rxjs';
import {
    IUser,
    IUserList,
} from '../../../interface/Login/loginResponse.interface';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { StorageKeys } from '../../../shared/storage-keys';

@Component({
    selector: 'app-user-role-mapping',
    standalone: true,
    imports: [
        MatCardModule,
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCheckboxModule,
        CommonModule,
        MatAutocompleteModule,
        MatSelectModule,
    ],
    animations: [
        trigger('detailExpand', [
            state('collapsed,void', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition(
                'expanded <=> collapsed',
                animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
            ),
        ]),
    ],
    templateUrl: './user-role-mapping.component.html',
    styleUrl: './user-role-mapping.component.scss',
})
export class UserRoleMappingComponent {
    response: IUserRoleMappingResponse;

    isToggled = false;
    classApplied = false;
    ViewclassApplied = false;
    form: FormGroup;
    UserCode: number | null;

    userControl = new FormControl();

    allUsers: IUserList[] = [];

    constructor(
        public themeService: CustomizerSettingsService,
        private httpService: HttpService,
        private labelService: LabelService,
        private fb: FormBuilder,
        private storage: StorageService,
        private toast: ToastrService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        const user: IUser = this.storage.get(StorageKeys.User);
        this.UserCode = user?.USER_CODE ? +user?.USER_CODE : null;

        this.form = this.fb.group({
            UserId: [0],
            FullNameAr: [''],
        });

        if (this.UserCode) this.GetRoleMappingListing(this.UserCode);
    }

    GetRoleMappingListing(UserId: number, RoleId?: number) {
        const body = {
            UserId,
            // RoleId: 1,
        };

        this.httpService.GetUserRoleDetails(body).subscribe({
            next: (response) => {
                if (response?.Data) {
                    this.response = response.Data;
                    this.response.GroupedApplications = this.groupApplications(
                        response.Data.UserRoleMappings
                    );
                    this.response.GroupedApplications;
                }
            },
            error: (error) => {
                console.error('Error occurred:', error);
            },
        });
    }

    private groupApplications(
        userRoleMappings: IUserRoleMapping[]
    ): IGroupedApplication {
        const grouped = userRoleMappings.reduce((acc, current) => {
            // Find an existing grouped application by FullNameAr
            let existingGroup = acc.find(
                (group) => group.FullNameAr === current.FullNameAr
            );

            if (!existingGroup) {
                existingGroup = {
                    FullNameAr: current.FullNameAr,
                    Applications: [],
                };
                acc.push(existingGroup);
            }

            // Check if the current application exists in the grouped applications
            let existingApp = existingGroup.Applications.find(
                (app) => app.ApplicationId === current.ApplicationId
            );

            if (!existingApp) {
                existingApp = {
                    ApplicationId: current.ApplicationId,
                    ApplicationNameAr: current.ApplicationNameAr,
                    Committees: [],
                };
                existingGroup.Applications.push(existingApp);
            }

            // Add the current committee to the application
            existingApp.Committees.push({
                CommitteeId: current.CommitteeId,
                CommNameAra: current.CommNameAra,
                RoleId: current.RoleId,
                RoleName: current.RoleName,
            });

            return acc;
        }, [] as IGroupedApplication[]);

        return grouped?.[0];
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        // this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    toggleClass() {
        this.classApplied = !this.classApplied;

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

    async loadUsers(searchTerm: string | number): Promise<void> {
        const body = {
            defaultcolumns: {
                created_by: this.UserCode,
            },
            searchTerm: searchTerm,
        };

        try {
            const users = await lastValueFrom(
                this.httpService.GetUserList(body)
            );
            this.allUsers = users.Data as IUserList[];
        } catch (error) {
            console.error('Error loading users:', error);
            throw error;
        }
    }

    onUserSearch(event: Event): void {
        const searchTerm = (event.target as HTMLInputElement).value;
        this.loadUsers(searchTerm);
    }

    onUserSelect(selectedUserCode: string): void {
        const selectedUser = this.allUsers.find(
            (user) => user.UserCode === selectedUserCode
        );

        if (selectedUser) {
            this.userControl.setValue(selectedUser.FullNameAr);
            this.form.patchValue({
                UserId: selectedUser.UserCode,
                FullNameAr: selectedUser.FullNameAr,
            });

            this.GetRoleMappingListing(+selectedUser.UserCode);
        }
    }
}
