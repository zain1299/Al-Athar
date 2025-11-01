import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { ToggleService } from './toggle.service';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { CustomizerSettingsService } from '../../theme/customizer-settings/customizer-settings.service';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../interface';
import { IMenuItem } from '../../interface/Login/loginResponse.interface';
import { StorageService } from '../../shared/storage.service';
import { StorageKeys } from '../../shared/storage-keys';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        NgScrollbarModule,
        MatExpansionModule,
        RouterLinkActive,
        RouterModule,
        RouterLink,
        NgClass,
        CommonModule,
        NgIf,
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
    isSidebarToggled = false;

    isToggled = false;
    user: IUser = {
        Token: '',
        USER_CODE: '',
        IP: null,
        PC: null,
        URL: null,
        ReferrarURL: null,
        user_screens: null,
        user_actions: [],
        OGScreenList: [],
        MenuItems: [],
        USER_NAME: '',
        USER_EMAIL: '',
        PROFILE_PIC: '',
ApplicationId : ''
    };

    constructor(
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService,
        private storage: StorageService
    ) {
        this.toggleService.isSidebarToggled$.subscribe((isSidebarToggled) => {
            this.isSidebarToggled = isSidebarToggled;
        });
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    appMenuItems: IMenuItem[] = [];

    ngOnInit(): void {
        const UserData: IUser = this.storage.get(StorageKeys.User);
        this.user = UserData;

        if (UserData) {
            const storedMenuItems = UserData.MenuItems;
            this.appMenuItems = this.buildMenuHierarchy(storedMenuItems);
        }
    }

    buildMenuHierarchy(menuItems: IMenuItem[]): IMenuItem[] {
        const menuMap: { [key: number]: IMenuItem } = {};
        const rootItems: IMenuItem[] = [];

        menuItems.forEach((item) => {
            menuMap[item.Id] = { ...item, subMenuItems: [] };
        });

        // Assign subMenuItems to their respective parents
        menuItems.forEach((item) => {
            if (item.ParentId) {
                if (menuMap[item.ParentId]) {
                    menuMap[item.ParentId].subMenuItems!.push(menuMap[item.Id]);
                }
            } else {
                // If no ParentId, it's a root menu item
                rootItems.push(menuMap[item.Id]);
            }
        });

        return rootItems;
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
