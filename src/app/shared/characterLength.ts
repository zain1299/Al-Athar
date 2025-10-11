import { AbstractControl, ValidatorFn } from '@angular/forms';

export function wordCountValidator(maxWords: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value || '';
        const wordCount = value
            .split(/\s+/)
            .filter((word: string) => word.length > 0).length;

        return wordCount > maxWords
            ? { wordCountExceeded: { value: control.value } }
            : null;
    };
}
