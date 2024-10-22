import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CustomizerSettingsService } from '../../theme/customizer-settings/customizer-settings.service';
import { HttpService } from '../../shared/http.service';
import { ILoginModel, ILoginResponse } from '../../interface';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../shared/storage.service';
import { StorageKeys } from '../../shared/storage-keys';

@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [
        RouterLink,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        NgIf,
    ],
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
    isToggled = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        public themeService: CustomizerSettingsService,
        private httpService: HttpService,
        private toast: ToastrService,
        private storage: StorageService
    ) {
        this.authForm = this.fb.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    hide = true;

    authForm: FormGroup;

    onSubmit() {
        if (this.authForm.valid) {
            const loginData: ILoginModel = {
                loginid: this.authForm.get('email')?.value,
                password: this.authForm.get('password')?.value,
            };

            this.httpService.Login(loginData).subscribe({
                next: (res: ILoginResponse) => {
                    if (res.Status == 200 && res?.Data) {
                        this.toast.success('Successfully Loged In', 'Success');
                        this.storage.set(StorageKeys.Token, res?.Data.Token);
                        this.storage.set(StorageKeys.User, res?.Data);
                        // this.router.navigate(['/dashboard']);
                        location.href = '/dashboard';
                    } else {
                        this.toast.error(res.Message);
                    }
                },
                error: (err) => {
                    console.log('Error during login', err);
                },
            });
        } else {
            console.log('Form is invalid. Please check the fields.');
        }
    }

    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }

    // Card Border
    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }
}
