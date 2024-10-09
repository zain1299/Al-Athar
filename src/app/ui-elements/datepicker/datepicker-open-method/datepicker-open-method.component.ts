import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-datepicker-open-method',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatButtonModule, MatCardModule, MatNativeDateModule],
    templateUrl: './datepicker-open-method.component.html',
    styleUrl: './datepicker-open-method.component.scss'
})
export class DatepickerOpenMethodComponent {}