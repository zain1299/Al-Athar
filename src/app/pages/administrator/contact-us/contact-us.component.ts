import { Component, ViewChild } from '@angular/core';
import { CustomizerSettingsService } from '../../../theme/customizer-settings/customizer-settings.service';
import { CommitteeService } from '../../../shared/services/committee.service';
import { StorageService } from '../../../shared/storage.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ICommittee } from '../../../interface/committee/committee.interface';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { StorageKeys } from '../../../shared/storage-keys';
import { IUser } from '../../../interface';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../../common/confirm-dialog/confirm-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { ContactUsService } from '../../../shared/services/contact-us.service';
import { IContact } from '../../../interface/contatcus/contact.interface';

@Component({
    selector: 'app-contact-us',
    standalone: true,
    imports: [
        NgIf,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatMenuModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatPaginator,
        MatIconModule,
        MatPaginatorModule,
        NgFor,
    ],
    templateUrl: './contact-us.component.html',
    styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
    UserCode!: number;
    selectedRow!: IContact;
    dataSource = new MatTableDataSource<IContact>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        public themeService: CustomizerSettingsService,
        private httpService: ContactUsService,
        private storage: StorageService,
        private router: Router,
        private toast: ToastrService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        const user: IUser = this.storage.get(StorageKeys.User);
        this.UserCode = user?.USER_CODE ? +user?.USER_CODE : (0 as number);
        this.getContactList ();
    }

    displayedColumns: { key: string; header: string; width?: string }[] = [
        { key: 'Name', header: 'الاسم', width: '25%' },
        { key: 'Email', header: '	البريد الالكتروني', width: '25%' },
         { key: 'Phone', header: 'رقم الهاتف	', width: '25%' },
          { key: 'Message', header: 'المقترحات', width: '25%' },
           { key: 'CreatedDate', header: 'تاريخ', width: '25%' },
          
    ];

    get displayedColumnKeys(): string[] {
        return this.displayedColumns.map((c) => c.key);
    }

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getContactList(): void {
        const body = {
            defaultcolumns: {
                created_by: this.UserCode,
            },
        };

        this.httpService.GetContactList(body).subscribe({
            next: (response) => {
                const responseData = response.Data as any[];
                this.dataSource.data = responseData;
                this.dataSource.paginator = this.paginator;
                console.log('this.dataSource.data', responseData);
            },
            error: (error) => {
                console.error('Error occurred:', error);
                this.toast.error('Failed to load committee list', 'Error');
            },
        });
    }
}
