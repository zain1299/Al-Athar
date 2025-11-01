export interface DynamicFormField {
    name: string;
    label: string;
    placeholder: string;
    type: 'text' | 'textarea' | 'number' | 'email' | 'date';
    validators?: any[];
}
