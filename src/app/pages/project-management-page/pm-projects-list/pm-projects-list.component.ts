import { NgClass, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-pm-projects-list',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, NgIf, MatTooltipModule, MatProgressBarModule, NgClass],
    templateUrl: './pm-projects-list.component.html',
    styleUrl: './pm-projects-list.component.scss'
})
export class PmProjectsListComponent {

    displayedColumns: string[] = ['id', 'projectName', 'startDate', 'endDate', 'projectManager', 'budget', 'teamMembers', 'progress', 'status', 'action'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        id: '#951',
        projectName: 'Hotel management system',
        startDate: '15 Nov, 2023',
        endDate: '15 Dec, 2023',
        projectManager: 'Walter Frazier',
        budget: '$5,250',
        teamMembers: {
            img1: 'assets/images/users/user5.jpg',
            img2: 'assets/images/users/user13.jpg'
        },
        progress: 90,
        status: {
            inProgress: 'In Progress',
            // pending: 'Pending',
            // completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#547',
        projectName: 'Product development',
        startDate: '14 Nov, 2023',
        endDate: '14 Dec, 2023',
        projectManager: 'Kimberly Anderson',
        budget: '$4,870',
        teamMembers: {
            img1: 'assets/images/users/user7.jpg',
            img2: 'assets/images/users/user9.jpg',
            img3: 'assets/images/users/user12.jpg'
        },
        progress: 85,
        status: {
            // inProgress: 'In Progress',
            pending: 'Pending',
            // completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#658',
        projectName: 'Python upgrade',
        startDate: '13 Nov, 2023',
        endDate: '13 Dec, 2023',
        projectManager: 'Roscoe Guerrero',
        budget: '$3,500',
        teamMembers: {
            img1: 'assets/images/users/user16.jpg',
            img2: 'assets/images/users/user17.jpg'
        },
        progress: 100,
        status: {
            // inProgress: 'In Progress',
            // pending: 'Pending',
            completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#367',
        projectName: 'Project monitoring',
        startDate: '12 Nov, 2023',
        endDate: '12 Dec, 2023',
        projectManager: 'Robert Stewart',
        budget: '$7,550',
        teamMembers: {
            img1: 'assets/images/users/user11.jpg',
            img2: 'assets/images/users/user3.jpg',
            img3: 'assets/images/users/user8.jpg'
        },
        progress: 5,
        status: {
            // inProgress: 'In Progress',
            // pending: 'Pending',
            // completed: 'Completed',
            notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#469',
        projectName: 'Project alpho',
        startDate: '11 Nov, 2023',
        endDate: '11 Dec, 2023',
        projectManager: 'Dustin Fritch',
        budget: '$2,500',
        teamMembers: {
            img1: 'assets/images/users/user15.jpg',
            img2: 'assets/images/users/user6.jpg'
        },
        progress: 85,
        status: {
            inProgress: 'In Progress',
            // pending: 'Pending',
            // completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#431',
        projectName: 'Daxa dashboard design',
        startDate: '10 Nov, 2023',
        endDate: '10 Dec, 2023',
        projectManager: 'Carol Camacho',
        budget: '$6,500',
        teamMembers: {
            img1: 'assets/images/users/user10.jpg',
            img2: 'assets/images/users/user5.jpg'
        },
        progress: 90,
        status: {
            inProgress: 'In Progress',
            // pending: 'Pending',
            // completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#547',
        projectName: 'Vaxo app design',
        startDate: '09 Nov, 2023',
        endDate: '09 Dec, 2023',
        projectManager: 'Robert Heinemann',
        budget: '$2,950',
        teamMembers: {
            img1: 'assets/images/users/user7.jpg',
            img2: 'assets/images/users/user12.jpg',
            img3: 'assets/images/users/user16.jpg'
        },
        progress: 70,
        status: {
            // inProgress: 'In Progress',
            pending: 'Pending',
            // completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#658',
        projectName: 'Aoriv ai design',
        startDate: '08 Nov, 2023',
        endDate: '08 Dec, 2023',
        projectManager: 'Jonathan Jones',
        budget: '$4,350',
        teamMembers: {
            img1: 'assets/images/users/user17.jpg',
            img2: 'assets/images/users/user13.jpg'
        },
        progress: 100,
        status: {
            // inProgress: 'In Progress',
            // pending: 'Pending',
            completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#367',
        projectName: 'Beja banking finance',
        startDate: '07 Nov, 2023',
        endDate: '07 Dec, 2023',
        projectManager: 'David Williams',
        budget: '$3,500',
        teamMembers: {
            img1: 'assets/images/users/user3.jpg',
            img2: 'assets/images/users/user8.jpg'
        },
        progress: 5,
        status: {
            // inProgress: 'In Progress',
            // pending: 'Pending',
            // completed: 'Completed',
            notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#469',
        projectName: 'Aegis accounting service',
        startDate: '06 Nov, 2023',
        endDate: '06 Dec, 2023',
        projectManager: 'Steve Smith',
        budget: '$8,000',
        teamMembers: {
            img1: 'assets/images/users/user6.jpg',
            img2: 'assets/images/users/user13.jpg'
        },
        progress: 85,
        status: {
            inProgress: 'In Progress',
            // pending: 'Pending',
            // completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#469',
        projectName: 'Aegis accounting service',
        startDate: '06 Nov, 2023',
        endDate: '06 Dec, 2023',
        projectManager: 'Steve Smith',
        budget: '$8,000',
        teamMembers: {
            img1: 'assets/images/users/user6.jpg',
            img2: 'assets/images/users/user13.jpg'
        },
        progress: 85,
        status: {
            inProgress: 'In Progress',
            // pending: 'Pending',
            // completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#367',
        projectName: 'Beja banking finance',
        startDate: '07 Nov, 2023',
        endDate: '07 Dec, 2023',
        projectManager: 'David Williams',
        budget: '$3,500',
        teamMembers: {
            img1: 'assets/images/users/user3.jpg',
            img2: 'assets/images/users/user8.jpg'
        },
        progress: 5,
        status: {
            // inProgress: 'In Progress',
            // pending: 'Pending',
            // completed: 'Completed',
            notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#658',
        projectName: 'Aoriv ai design',
        startDate: '08 Nov, 2023',
        endDate: '08 Dec, 2023',
        projectManager: 'Jonathan Jones',
        budget: '$4,350',
        teamMembers: {
            img1: 'assets/images/users/user17.jpg',
            img2: 'assets/images/users/user13.jpg'
        },
        progress: 100,
        status: {
            // inProgress: 'In Progress',
            // pending: 'Pending',
            completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#547',
        projectName: 'Vaxo app design',
        startDate: '09 Nov, 2023',
        endDate: '09 Dec, 2023',
        projectManager: 'Robert Heinemann',
        budget: '$2,950',
        teamMembers: {
            img1: 'assets/images/users/user7.jpg',
            img2: 'assets/images/users/user12.jpg',
            img3: 'assets/images/users/user16.jpg'
        },
        progress: 70,
        status: {
            // inProgress: 'In Progress',
            pending: 'Pending',
            // completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#431',
        projectName: 'Daxa dashboard design',
        startDate: '10 Nov, 2023',
        endDate: '10 Dec, 2023',
        projectManager: 'Carol Camacho',
        budget: '$6,500',
        teamMembers: {
            img1: 'assets/images/users/user10.jpg',
            img2: 'assets/images/users/user5.jpg'
        },
        progress: 90,
        status: {
            inProgress: 'In Progress',
            // pending: 'Pending',
            // completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#469',
        projectName: 'Project alpho',
        startDate: '11 Nov, 2023',
        endDate: '11 Dec, 2023',
        projectManager: 'Dustin Fritch',
        budget: '$2,500',
        teamMembers: {
            img1: 'assets/images/users/user15.jpg',
            img2: 'assets/images/users/user6.jpg'
        },
        progress: 85,
        status: {
            inProgress: 'In Progress',
            // pending: 'Pending',
            // completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#367',
        projectName: 'Project monitoring',
        startDate: '12 Nov, 2023',
        endDate: '12 Dec, 2023',
        projectManager: 'Robert Stewart',
        budget: '$7,550',
        teamMembers: {
            img1: 'assets/images/users/user11.jpg',
            img2: 'assets/images/users/user3.jpg',
            img3: 'assets/images/users/user8.jpg'
        },
        progress: 5,
        status: {
            // inProgress: 'In Progress',
            // pending: 'Pending',
            // completed: 'Completed',
            notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#658',
        projectName: 'Python upgrade',
        startDate: '13 Nov, 2023',
        endDate: '13 Dec, 2023',
        projectManager: 'Roscoe Guerrero',
        budget: '$3,500',
        teamMembers: {
            img1: 'assets/images/users/user16.jpg',
            img2: 'assets/images/users/user17.jpg'
        },
        progress: 100,
        status: {
            // inProgress: 'In Progress',
            // pending: 'Pending',
            completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#547',
        projectName: 'Product development',
        startDate: '14 Nov, 2023',
        endDate: '14 Dec, 2023',
        projectManager: 'Kimberly Anderson',
        budget: '$4,870',
        teamMembers: {
            img1: 'assets/images/users/user7.jpg',
            img2: 'assets/images/users/user9.jpg',
            img3: 'assets/images/users/user12.jpg'
        },
        progress: 85,
        status: {
            // inProgress: 'In Progress',
            pending: 'Pending',
            // completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    },
    {
        id: '#951',
        projectName: 'Hotel management system',
        startDate: '15 Nov, 2023',
        endDate: '15 Dec, 2023',
        projectManager: 'Walter Frazier',
        budget: '$5,250',
        teamMembers: {
            img1: 'assets/images/users/user5.jpg',
            img2: 'assets/images/users/user13.jpg'
        },
        progress: 90,
        status: {
            inProgress: 'In Progress',
            // pending: 'Pending',
            // completed: 'Completed',
            // notStarted: 'Not Started',
        },
        action: {
            view: 'visibility',
            delete: 'delete'
        }
    }
];
export interface PeriodicElement {
    id: string;
    projectName: string;
    startDate: string;
    endDate: string;
    projectManager: string;
    budget: string;
    teamMembers: any;
    progress: number;
    status: any;
    action: any;
}