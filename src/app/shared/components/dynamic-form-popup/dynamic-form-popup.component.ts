import {
    Component,
    EventEmitter,
    Input,
    Output,
    OnChanges,
    HostListener,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    ReactiveFormsModule,
    FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { IUserDetails } from '../../../interface/user/user.interface';
import { PublicDepartmentService } from '../../services/public-department.service';
import { StorageService } from '../../../shared/storage.service';
import { IUser } from '../../../interface/Login/loginResponse.interface';
import { StorageKeys } from '../../../shared/storage-keys';
import { UserService } from '../../services/user.service';
@Component({
    selector: 'app-dynamic-form-popup',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatOptionModule,
    ],
    templateUrl: './dynamic-form-popup.component.html',
    styleUrls: ['./dynamic-form-popup.component.scss'],
})
export class DynamicFormPopupComponent implements OnChanges {
    @Input() title: string = 'Form';
    @Input() isActive: boolean = false;
    @Input() fields: any[] = [];
    @Input() initialData: any = {}; // For edit mode
    @Input() mode: 'add' | 'update' = 'add'; // Dynamic mode

    @Output() close = new EventEmitter<void>();
    @Output() submitForm = new EventEmitter<any>();

    form: FormGroup;
    userControl = new FormControl('');
    filteredUsers: any[] = [];
    allUsers: any[] = [];
    ApplicationId!: number;
    UserCode: number;

    userList: any[] = [];
    filteredList: string[] = [];

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private userService: UserService,
        private storage: StorageService
    ) {
        this.form = this.fb.group({});
    }
    ngOnInit() {
        const user: IUser = this.storage.get(StorageKeys.User);
        this.UserCode = user?.USER_CODE ? +user?.USER_CODE : (0 as number);
    }

    ngOnChanges(): void {
        if (this.fields.length > 0) {
            const group: any = {};
            this.fields.forEach((field) => {
                group[field.name] = [
                    this.initialData[field.name] || '',
                    field.validators || [],
                ];
            });
            this.form = this.fb.group(group);

            // patch for edit mode
            if (this.initialData && this.initialData['DepartmentHeadName']) {
                this.userControl.setValue(
                    this.initialData['DepartmentHeadName']
                );
            }
        }

        // Load user list if relevant
        if (this.fields.some((f) => f.name === 'UserId')) {
            this.getUserList();
        }
    }

    togglePopup() {
        this.isActive = false;
        this.close.emit();
    }

    onSubmit() {
        if (this.form.valid) {
            this.submitForm.emit(this.form.value);
            this.togglePopup();
        } else {
            this.form.markAllAsTouched();
        }
    }

    @HostListener('document:keydown.escape', ['$event'])
    onEscPress(event: KeyboardEvent) {
        if (this.isActive) this.togglePopup();
    }

    getUserList(): void {
        const body = {
            defaultcolumns: {
                created_by: this.UserCode,
            },
            searchTerm: 'zain',
        };


        this.userService.GetUserList(body).subscribe({
            next: (response) => {
                const responseData = response.Data as IUserDetails[];
                this.userList = responseData.map((u) => u.FullNameAr);
                console.log('Raw API Response:', response);
                this.filteredList = [...this.userList];
                console.log('User List:', this.userList);
            },
            error: (error) => {
                console.error('Error occurred:', error);
            },
        });
    }

    onUserSearch(event: any): void {
        const searchTerm = event.target.value.toLowerCase();
        this.filteredUsers = this.allUsers.filter((u) =>
            u.FullNameAr.toLowerCase().includes(searchTerm)
        );
    }

    onUserSelect(selectedUserCode: string): void {
        const selectedUser = this.allUsers.find(
            (u) => u.UserCode === selectedUserCode
        );
        if (selectedUser) {
            this.form.get('UserId')?.setValue(selectedUser.UserCode);
            this.userControl.setValue(selectedUser.FullNameAr);
        }
    }

    onEdit(element: any) {
        this.initialData = element;
        this.fields.forEach((f) => {
            if (this.form.get(f.name)) {
                this.form.get(f.name)?.setValue(element[f.name] || '');
            }
        });

        if (element['DepartmentHeadName']) {
            this.userControl.setValue(element['DepartmentHeadName']);
        }

        this.isActive = true;
    }
}
