import {
    Component,
    EventEmitter,
    Input,
    Output,
    OnChanges,
    HostListener,
    OnInit,
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
import { StorageService } from '../../../shared/storage.service';
import { IUser } from '../../../interface/Login/loginResponse.interface';
import { StorageKeys } from '../../../shared/storage-keys';
import { UserService } from '../../services/user.service';
import {
    debounceTime,
    distinctUntilChanged,
    map,
    switchMap,
} from 'rxjs/operators';
import { of } from 'rxjs'; // 👈 important for returning an empty observable

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
export class DynamicFormPopupComponent implements OnInit, OnChanges {
    @Input() title: string = 'Form';
    @Input() isActive: boolean = false;
    @Input() fields: any[] = [];
    @Input() initialData: any = {}; // For edit mode
    @Input() mode: 'add' | 'update' = 'add';

    @Output() close = new EventEmitter<void>();
    @Output() submitForm = new EventEmitter<any>();

    form: FormGroup;
    userControl = new FormControl('');
    filteredUsers: IUserDetails[] = [];
    allUsers: IUserDetails[] = [];
    ApplicationId!: number;
    UserCode: number;

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
        this.UserCode = user?.USER_CODE ? +user?.USER_CODE : 0;

        this.userControl.valueChanges
            .pipe(
                debounceTime(400),
                distinctUntilChanged(),
                switchMap((searchTerm) => {
                    const term = (searchTerm || '').trim();

                    if (!term) {
                        this.filteredUsers = [];
                        return of([]);
                    }

                    return this.getUserList(term);
                })
            )
            .subscribe({
                next: (users) => {
                    this.filteredUsers = users;
                    this.allUsers = users;
                    console.log('Filtered users from API:', users);
                },
                error: (err) => console.error('Error fetching users:', err),
            });

        if (this.initialData && this.initialData['DepartmentHeadName']) {
            this.userControl.setValue(this.initialData['DepartmentHeadName']);
        }
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

            if (this.initialData && this.initialData['DepartmentHeadName']) {
                this.userControl.setValue(
                    this.initialData['DepartmentHeadName']
                );
            }
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

    getUserList(searchTerm: string = '') {
        const body = {
            defaultcolumns: {
                created_by: this.UserCode,
            },
            searchTerm: searchTerm,
        };

        return this.userService.GetUserList(body).pipe(
            map((response: any) => {
                if (response?.Data) {
                    return response.Data as IUserDetails[];
                }
                return [];
            })
        );
    }

    onUserSelect(selectedUser: any): void {
        if (selectedUser && selectedUser.UserCode) {
            this.form.get('UserId')?.setValue(selectedUser.UserCode);

            this.userControl.setValue(selectedUser.FullNameAr);

            console.log('✅ Selected user:', selectedUser);
            console.log('✅ Form UserId set to:', selectedUser.UserCode);
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
