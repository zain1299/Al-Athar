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
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { HttpService } from '../../shared/http.service';
import { ILoginModel } from '../../interface';
import { LoginResponse } from '../../interface/loginResponse.interface';

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
    styleUrls: ['./sign-in.component.scss'], // Use 'styleUrls' for array
})
export class SignInComponent {
    // isToggled
    isToggled = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        public themeService: CustomizerSettingsService,
        private httpService: HttpService
    ) {
        this.authForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    // Password Hide
    hide = true;

    // Form
    authForm: FormGroup;

    onSubmit() {
        if (this.authForm.valid) {
            const loginData: ILoginModel = {
                loginid: this.authForm.get('email')?.value,
                password: this.authForm.get('password')?.value,
            };

            this.httpService.Login(loginData).subscribe({
                next: (res: LoginResponse) => {
                    // Check if the response is successful
                    if (res.Status == 200 && res?.Data) {
                        console.log('Login successful', res);
                        // Store token or any other required data
                        localStorage.setItem('authToken', res?.Data?.Token);
                        this.router.navigate(['/dashboard']); // Redirect after successful login
                    } else {
                        console.log('Login failed: ', res.Message);
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
