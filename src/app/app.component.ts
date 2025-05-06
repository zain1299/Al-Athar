declare let $: any;
import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { ToggleService } from '../app/common/sidebar/toggle.service';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import {
    CommonModule,
    Location,
    LocationStrategy,
    NgIf,
    PathLocationStrategy,
} from '@angular/common';
import { CustomizerSettingsComponent } from './theme/customizer-settings/customizer-settings.component';
import {
    RouterOutlet,
    Router,
    NavigationCancel,
    NavigationEnd,
    RouterLink,
} from '@angular/router';
import { CustomizerSettingsService } from './theme/customizer-settings/customizer-settings.service';
import { IUser } from './interface';
import { StorageService } from './shared/storage.service';
import { StorageKeys } from './shared/storage-keys';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        SidebarComponent,
        HeaderComponent,
        FooterComponent,
        RouterLink,
        CustomizerSettingsComponent,
        NgIf,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [
        Location,
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
    ],
})
export class AppComponent {
    title = 'Daxa -  Angular 17 Material Design Admin Dashboard Template';
    routerSubscription: any;
    location: any;

    // isSidebarToggled
    isSidebarToggled = false;

    // isToggled
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
    };

    constructor(
        public router: Router,
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

        this.user = this.storage.get(StorageKeys.User);
    }

    // ngOnInit
    ngOnInit() {
        this.recallJsFuntions();
        this.setRTL();
    }

    // recallJsFuntions
    recallJsFuntions() {
        this.routerSubscription = this.router.events
            .pipe(
                filter(
                    (event) =>
                        event instanceof NavigationEnd ||
                        event instanceof NavigationCancel
                )
            )
            .subscribe((event) => {
                this.location = this.router.url;
                if (!(event instanceof NavigationEnd)) {
                    return;
                }
                window.scrollTo(0, 0);
            });
    }

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

    // Card Border Radius
    toggleCardBorderRadiusTheme() {
        this.themeService.toggleCardBorderRadiusTheme();
    }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    setRTL() {
        this.themeService.setRTL();
    }
}
