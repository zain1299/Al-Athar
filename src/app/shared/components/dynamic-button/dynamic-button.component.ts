import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-dynamic-button',
  standalone: true,
  imports: [MatButtonModule, MatRippleModule, CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-button.component.html',
  styleUrls: ['./dynamic-button.component.scss']
})
export class DynamicButtonComponent {
  // Button label
  @Input() label: string = 'Button';

  // Optional CSS class
  @Input() buttonClass: string = '';

  // Output event when button is clicked
  @Output() onClick = new EventEmitter<void>();

  // Emit click event
  handleClick() {
    this.onClick.emit();
  }
}
