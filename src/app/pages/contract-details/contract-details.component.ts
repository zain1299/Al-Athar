import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HttpService } from '../../shared/http.service';
import { CustomizerSettingsService } from '../../theme/customizer-settings/customizer-settings.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
    IContractDetails,
    IContracts,
} from '../../interface/Contract/contract.interface';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-contract-details',
    standalone: true,
    imports: [
        MatCardModule,
        NgIf,
        CommonModule,
        MatButtonModule,
        MatTableModule,
        MatChipsModule,
    ],
    templateUrl: './contract-details.component.html',
    styleUrls: ['./contract-details.component.scss'],
})
export class ContractDetailsComponent implements OnInit {
    isToggled = false;
    selectedRow: IContracts;
    HistoryClassApplied: boolean = false;

    isModalOpen = false;
    modalContent: SafeResourceUrl; // Change this to SafeResourceUrl
    isImage: boolean;
    hostUrl: any = environment.contractHostURL;

    constructor(
        public themeService: CustomizerSettingsService,
        private httpService: HttpService,
        private router: Router,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer
    ) {
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
        const contractId = this.route.snapshot.paramMap.get('id');

        if (contractId) {
            this.contractsList(+contractId);
        }
    }

    contractsList(contractId: number) {
        this.httpService.getContractDetails(contractId).subscribe({
            next: (response) => {
                this.selectedRow = response.Data as IContracts;
            },
            error: (error) => {
                console.error('Error occurred:', error);
            },
        });
    }

    closePage(): void {
        this.router.navigate(['/contract']);
    }

    toggleHistoryModal(): void {
        this.HistoryClassApplied = !this.HistoryClassApplied;
    }

    findActiveContractDetail(
        details: IContractDetails[] | undefined
    ): IContractDetails {
        return (
            details?.find((x) => x.IsActive === true) ||
            ({} as IContractDetails)
        );
    }

    openDocument(attachment: any) {
        this.isImage = attachment.FileType.startsWith('image/');

        const url = this.hostUrl + attachment.FilePath;

        if (this.isImage) {
            this.modalContent = this.sanitizer.bypassSecurityTrustUrl(url);
        } else {
            // Sanitize the PDF URL
            this.modalContent =
                this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }

        this.isModalOpen = true;
    }

    // Close the modal
    closeModal() {
        this.isModalOpen = false;
    }
}
