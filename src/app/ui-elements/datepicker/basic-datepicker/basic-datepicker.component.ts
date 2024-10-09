import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
    selector: 'app-basic-datepicker',
    standalone: true,
    imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
    templateUrl: './basic-datepicker.component.html',
    styleUrl: './basic-datepicker.component.scss'
})
export class BasicDatepickerComponent {}