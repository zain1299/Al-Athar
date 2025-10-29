import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'app-dynamic-form-fields',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
    ],
    templateUrl: './dynamic-form-fields.component.html',
    styleUrls: ['./dynamic-form-fields.component.scss'],
})
export class DynamicFormFieldsComponent implements OnChanges {
    @Input() fields: any[] = [];
    @Input() form!: FormGroup;
    @Input() showSubmit: boolean = true;
    @Output() submitForm = new EventEmitter<any>();

    Validators = Validators;

    constructor(private fb: FormBuilder) {}

    ngOnChanges() {
        if (this.fields?.length > 0 && this.form) {
            this.fields.forEach((field) => {
                if (!this.form.get(field.name)) {
                    this.form.addControl(
                        field.name,
                        this.fb.control('', field.validators || [])
                    );
                }
            });
        }
    }

    onSubmit() {
        if (this.form.valid) {
            this.submitForm.emit(this.form.value);
        } else {
            this.form.markAllAsTouched();
        }
    }
}
