export interface DynamicFormField {
    name: string;           // FormControl name
    label: string;          // Label shown on UI
    placeholder: string;   // Placeholder text
    type: 'text' | 'textarea' | 'number' | 'email' | 'date'; // Field type
    validators?: any[];     // Angular validators
  }
  