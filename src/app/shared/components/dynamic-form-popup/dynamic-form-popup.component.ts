import { Component, EventEmitter, Input, Output, OnChanges, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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

  // ✅ Close popup on ESC key
  @HostListener('document:keydown.escape', ['$event'])
  onEscPress(event: KeyboardEvent) {
    if (this.isActive) {
      this.togglePopup();
    }
  }
}
