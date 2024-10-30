import {
    Component,
    EventEmitter,
    Output,
    HostListener,
    forwardRef,
    ChangeDetectorRef,
    OnDestroy,
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
    standalone: true,
    imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        NgIf,
        NgFor,
        MatButtonModule,
    ],
    selector: 'app-draggable-file-upload',
    templateUrl: './draggable-file-upload.component.html',
    styleUrls: ['./draggable-file-upload.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DraggableFileUploadComponent),
            multi: true,
        },
        {
            provide: MatFormFieldControl,
            useExisting: forwardRef(() => DraggableFileUploadComponent),
        },
    ],
})
export class DraggableFileUploadComponent
    implements ControlValueAccessor, MatFormFieldControl<File[]>, OnDestroy
{
    @Output() filesDropped = new EventEmitter<File[]>();
    isDragging = false;
    public innerValue: File[] = [];
    static nextId = 0;
    controlType = 'draggable-file-upload';
    id = `draggable-file-upload-${DraggableFileUploadComponent.nextId++}`;
    stateChanges = new Subject<void>();

    ngControl: any;
    required: boolean = false;
    placeholder: string = '';
    disabled: boolean = false;

    onChange: (files: File[]) => void = () => {};
    onTouched: () => void = () => {};

    get value(): File[] {
        return this.innerValue;
    }

    set value(files: File[]) {
        this.innerValue = files;
        this.onChange(files);
        this.onTouched();
        this.stateChanges.next();
    }

    @HostListener('dragover', ['$event'])
    onDragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = true;
    }

    @HostListener('dragleave', ['$event'])
    onDragLeave(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = false;
    }

    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = false;

        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
            const newFiles = Array.from(files);
            this.value = [...this.innerValue, ...newFiles];
            this.filesDropped.emit(this.value);
        }
    }

    onFileSelect(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            const newFiles = Array.from(input.files);
            this.value = [...this.innerValue, ...newFiles];
            this.filesDropped.emit(this.value);
        }
    }

    removeFile(index: number): void {
        this.innerValue.splice(index, 1);
        this.value = [...this.innerValue];
        this.filesDropped.emit(this.value);
    }

    writeValue(value: File[] | null): void {
        this.innerValue = value || [];
        this.stateChanges.next();
    }

    registerOnChange(fn: (files: File[]) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDescribedByIds(ids: string[]): void {}

    get empty(): boolean {
        return this.innerValue.length === 0;
    }

    get shouldLabelFloat(): boolean {
        return this.innerValue.length > 0;
    }

    get errorState(): boolean {
        return false;
    }

    get focused(): boolean {
        return this.isDragging;
    }

    onContainerClick(event: MouseEvent): void {}

    ngOnDestroy(): void {
        this.stateChanges.complete();
    }
}
