import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILabels } from '../interface';

@Injectable({
    providedIn: 'root',
})
export class LabelService {
    private labels: ILabels;
    private currentLanguage: 'en' | 'ar' = 'en'; // Default language

    constructor(private http: HttpClient) {}

    loadLabels(): Observable<ILabels> {
        return this.http.get<ILabels>('../../assets/translation.json');
    }

    setCurrentLanguage(language: 'en' | 'ar'): void {
        this.currentLanguage = language;
    }

    getCancelLabel(): string {
        return this.labels?.buttons.cancel[this.currentLanguage] ?? '';
    }

    getRoleLabel(): string {
        return this.labels?.Role.label[this.currentLanguage] ?? '';
    }
    getRoleLabelEn(): string {
        return this.labels?.Role.labelEn[this.currentLanguage] ?? '';
    }

    getRoleHeadingLabel(): string {
        return this.labels?.Role.headingLabel[this.currentLanguage] ?? '';
    }

    getSaveLabel(): string {
        return this.labels?.buttons.save[this.currentLanguage] ?? '';
    }

    setLabels(labels: ILabels): void {
        this.labels = labels;
    }
}
