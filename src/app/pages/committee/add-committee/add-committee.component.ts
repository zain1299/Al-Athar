import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { DynamicFormFieldsComponent } from '../../../shared/components/dynamic-form-fields/dynamic-form-fields.component';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-add-committee',
    standalone: true,
    imports: [ReactiveFormsModule, DynamicFormFieldsComponent, MatCardModule],
    templateUrl: './add-committee.component.html',
})
export class AddCommitteeComponent {
    form: FormGroup;

    committeeFields = [
        {
            name: 'committeeName',
            label: 'اللجنــــة',
            type: 'text',
            col: 6,
            validators: [Validators.required],
        },
        {
            name: 'description',
            label: 'التفاصيل',
            type: 'text',
            col: 6,
            validators: [],
        },
        {
            name: 'meetingNo',
            label: 'رقم الاجتماع',
            type: 'text',
            col: 6,
            placeholder: '([MEETNO]/[YEAR])',
            defaultValue: '',
            validators: [],
        },
        {
            name: 'resetMeetingNo',
            label: 'إعادة تعيين رقم الاجتماع',
            type: 'checkbox',
            col: 6,
            validators: [],
        },
    ];

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({});
    }

    handleCommitteeSubmit(formData: any) {
        console.log('✅ Committee form submitted:', formData);
    }

    onSave() {
        if (this.form.valid) {
            console.log('🎯 Final form values:', this.form.value);
        } else {
            this.form.markAllAsTouched();
        }
    }
}