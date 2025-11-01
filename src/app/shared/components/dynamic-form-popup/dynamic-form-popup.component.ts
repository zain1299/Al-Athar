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
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

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
        MatSelectModule,
        MatOptionModule,
    ],
    templateUrl: './dynamic-form-popup.component.html',
    styleUrls: ['./dynamic-form-popup.component.scss'],
})
export class DynamicFormPopupComponent implements OnChanges {
    @Input() title: string = 'Form';
    @Input() isActive: boolean = false;
    @Input() fields: any[] = [];
    @Input() initialData: any = {};
    @Input() mode: 'add' | 'update' = 'add';

    @Output() close = new EventEmitter<void>();
    @Output() submitForm = new EventEmitter<any>();

    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({});
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
        if (this.isActive) {
            this.togglePopup();
        }
    }

    popupVisible = false;
    currentEditingData: any = null;

    onEdit(element: any) {
        this.currentEditingData = element;
        this.popupVisible = true;

        this.fields = this.fields.map((field) => ({
            ...field,
            value: element[field.name] || '',
        }));
    }
}
