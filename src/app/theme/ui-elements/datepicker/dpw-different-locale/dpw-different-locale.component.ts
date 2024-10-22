import { Component, Inject, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule, MatDatepickerIntl } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import 'moment/locale/ja';
import 'moment/locale/fr';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-dpw-different-locale',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatButtonModule, MatNativeDateModule, MatCardModule],
    templateUrl: './dpw-different-locale.component.html',
    styleUrl: './dpw-different-locale.component.scss',
    providers: [
        // The locale would typically be provided on the root module of your application. We do it at
        // the component level here, due to limitations of our example generation script.
        {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},
    ],
})
export class DpwDifferentLocaleComponent {

    // Datepicker with Different Locale
    constructor(
        private _adapter: DateAdapter<any>,
        private _intl: MatDatepickerIntl,
        @Inject(MAT_DATE_LOCALE) private _locale: string,
    ) {}

    ngOnInit() {
        this.updateCloseButtonLabel('カレンダーを閉じる');
    }

    french() {
        this._locale = 'fr';
        this._adapter.setLocale(this._locale);
        this.updateCloseButtonLabel('Fermer le calendrier');
    }

    updateCloseButtonLabel(label: string) {
        this._intl.closeCalendarLabel = label;
        this._intl.changes.next();
    }

    getDateFormatString(): string {
        if (this._locale === 'ja-JP') {
            return 'YYYY/MM/DD';
        } else if (this._locale === 'fr') {
            return 'DD/MM/YYYY';
        }
        return '';
    }

}