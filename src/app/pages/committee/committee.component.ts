import { Component, ViewChild } from '@angular/core';
import { CustomizerSettingsService } from '../../theme/customizer-settings/customizer-settings.service';
import { CommitteeService } from '../../shared/services/committee.service';
import { StorageService } from '../../shared/storage.service';
import { Router } from '@angular/router'; // ✅ FIXED: was from 'express'
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; // ✅ ADD
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // ✅ ADD
import { ICommittee } from '../../interface/committee/committee.interface';
import {
    MatCardHeader,
    MatCard,
    MatCardTitle,
    MatCardContent,
} from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon'; // ✅ FIXED
import { MatButtonModule } from '@angular/material/button'; // ✅ ADD
import { NgFor, NgIf } from '@angular/common'; // ✅ Needed for *ngFor and *ngIf
import { StorageKeys } from '../../shared/storage-keys';
import { IUser } from '../../interface';

@Component({
    selector: 'app-committee',
    standalone: true,
    imports: [
        // ✅ REQUIRED MATERIAL MODULES
        MatCardHeader,
        MatCard,
        MatCardTitle,
        MatCardContent,
        MatTooltipModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        NgFor,
        NgIf,
    ],
    templateUrl: './committee.component.html',
    styleUrls: ['./committee.component.scss'], // ✅ FIXED (was styleUrl)
})
export class CommitteeComponent {
    UserCode!: number;
    selectedRow!: ICommittee;
    dataSource = new MatTableDataSource<ICommittee>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        public themeService: CustomizerSettingsService,
        private httpService: CommitteeService,
        private storage: StorageService,
        private router: Router,
        private toast: ToastrService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        const user: IUser = this.storage.get(StorageKeys.User);
        this.UserCode = user?.USER_CODE ? +user?.USER_CODE : (0 as number);
        this.getCommitteeList();
    }

    displayedColumns: { key: string; header: string; width?: string }[] = [
        { key: 'CommNameAra', header: 'Committee Name (AR)', width: '25%' },
        { key: 'CommNameEng', header: 'Committee Name (EN)', width: '25%' },
        { key: 'action', header: 'Action', width: '15%' },
    ];

    get displayedColumnKeys(): string[] {
        return this.displayedColumns.map((c) => c.key);
    }

    getCommitteeList(): void {
        const body = {
            defaultcolumns: {
                created_by: this.UserCode,
            },
        };

        this.httpService.GetCommitteeList(body).subscribe({
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

    ViewData(_t18: any) {
        console.log('View', _t18);
    }
    onEdit(_t18: any) {
        console.log('Edit', _t18);
    }
    onDelete(_t18: any) {
        console.log('Delete', _t18);
    }
}
