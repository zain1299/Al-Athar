import { AbstractControl, ValidatorFn } from '@angular/forms';

export function nonEmptyValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const isValid = control.value && control.value.trim().length > 0;
        return isValid ? null : { emptyField: true };
    };
}
