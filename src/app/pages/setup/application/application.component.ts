import { Component, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from '../../../shared/storage.service';

import { HttpService } from '../../../shared/http.service';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CustomizerSettingsService } from '../../../theme/customizer-settings/customizer-settings.service';
import { IApplication, IApplicationData } from '../../../interface/Application/application.interface';
import { IUser } from '../../../interface';
import { StorageKeys } from '../../../shared/storage-keys';


@Component({
  selector: 'app-application',
  standalone: true,
  imports: [
    NgIf,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatPaginator
  ],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss'
})
export class ApplicationComponent {
  isToggled = false;
  UserCode: number;

  dataSource = new MatTableDataSource<IApplication>([]);

  displayedColumns: string[] = [
    'ApplicationId',
    'ApplicationNameAr',
    'ApplicationNameEn',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public themeService: CustomizerSettingsService,
    private httpService: HttpService,
    private storage: StorageService,
    private router: Router
  ) {
    this.themeService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
  }

  ngOnInit(): void {
    const user: IUser = this.storage.get(StorageKeys.User);
    this.UserCode = user?.USER_CODE ? +user?.USER_CODE : (0 as number);

    this.getApplicationList();
  }

  // Search Filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getApplicationList(): void {

    const body = {
      defaultcolumns: {
        created_by: this.UserCode,
      }
    };

    this.httpService.GetApplicationList(body).subscribe({
      next: (response) => {
        var responseData = response.Data as IApplicationData;
        this.dataSource.data = responseData.ApplicationListData;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('Error occurred:', error);
      },
    });
  }

  ViewData(row: IApplication): void {
    //   this.selectedRow = row;
    //   this.toggleClassView();
  }

  onAddEdit(): void {

  }

  onEdit(row: IApplication): void {

  }

  onDelete(row: IApplication): void {

  }
}