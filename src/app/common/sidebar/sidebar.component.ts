import { Component, OnInit } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { ToggleService } from './toggle.service';
import { CommonModule, NgClass } from '@angular/common';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [NgScrollbarModule, MatExpansionModule, RouterLinkActive, RouterModule, RouterLink, NgClass ,CommonModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

    // isSidebarToggled
    isSidebarToggled = false;

    // isToggled
    isToggled = false;
    menuItems = [
        {
            icon: 'ballot',
            title: 'To Do List',
            routerLink: '/to-do-list',
            isExpandable: false,
            badge: null,
            subMenuItems: null
        },
        {
            icon: 'calendar_today',
            title: 'Calendar',
            routerLink: '/calendar',
            isExpandable: false,
            badge: null,
            subMenuItems: null
        },
        {
            icon: 'perm_contact_calendar',
            title: 'Contacts',
            routerLink: '/contacts',
            isExpandable: false,
            badge: null,
            subMenuItems: null
        },
        {
            icon: 'chat',
            title: 'Chat',
            routerLink: '/chat',
            isExpandable: false,
            badge: null,
            subMenuItems: null
        },
        {
            icon: 'email',
            title: 'Email',
            routerLink: null,
            isExpandable: true,
            badge: '3',
            subMenuItems: [
                { icon: null, title: 'Inbox', routerLink: '/email', isExpandable: false, badge: null, subMenuItems: null },
                { icon: null, title: 'Compose', routerLink: '/email/compose', isExpandable: false, badge: null, subMenuItems: null },
                { icon: null, title: 'Read', routerLink: '/email/read', isExpandable: false, badge: null, subMenuItems: null }
            ]
        },
        {
            icon: 'keyboard_command_key',
            title: 'Kanban Board',
            routerLink: '/kanban-board',
            isExpandable: false,
            badge: null,
            subMenuItems: null
        }
    ];

    constructor(
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService,private http: HttpClient
    ) {
        this.toggleService.isSidebarToggled$.subscribe(isSidebarToggled => {
            this.isSidebarToggled = isSidebarToggled;
        });
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    appMenuItems: any[] = [];

  
    ngOnInit(): void {
        
    
        // Save menu items in localStorage
        localStorage.setItem('appMenuItems', JSON.stringify(this.menuItems));
    
        // Load menu items from localStorage
        
        const storedMenuItems = localStorage.getItem('appMenuItems');
        if (storedMenuItems) {
            this.appMenuItems = JSON.parse(storedMenuItems);
        }
    }

    // Burger Menu Toggle
    toggle() {
        this.toggleService.toggle();
    }

    // Mat Expansion
    panelOpenState = false;

    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }

    // Sidebar Dark
    toggleSidebarTheme() {
        this.themeService.toggleSidebarTheme();
    }

    // Right Sidebar
    toggleRightSidebarTheme() {
        this.themeService.toggleRightSidebarTheme();
    }

    // Hide Sidebar
    toggleHideSidebarTheme() {
        this.themeService.toggleHideSidebarTheme();
    }

    // Header Dark Mode
    toggleHeaderTheme() {
        this.themeService.toggleHeaderTheme();
    }

    // Card Border
    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}