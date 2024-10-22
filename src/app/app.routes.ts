import { Routes } from '@angular/router';
import { EcommerceComponent } from './theme/dashboard/ecommerce/ecommerce.component';
import { CrmComponent } from './theme/dashboard/crm/crm.component';
import { ProjectManagementComponent } from './theme/dashboard/project-management/project-management.component';
import { LmsComponent } from './theme/dashboard/lms/lms.component';
import { HelpDeskComponent } from './theme/dashboard/help-desk/help-desk.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { EcommercePageComponent } from './theme/pages/ecommerce-page/ecommerce-page.component';
import { EProductsGridComponent } from './theme/pages/ecommerce-page/e-products-grid/e-products-grid.component';
import { EProductsListComponent } from './theme/pages/ecommerce-page/e-products-list/e-products-list.component';
import { EProductDetailsComponent } from './theme/pages/ecommerce-page/e-product-details/e-product-details.component';
import { ECreateProductComponent } from './theme/pages/ecommerce-page/e-create-product/e-create-product.component';
import { EEditProductComponent } from './theme/pages/ecommerce-page/e-edit-product/e-edit-product.component';
import { EOrdersComponent } from './theme/pages/ecommerce-page/e-orders/e-orders.component';
import { EOrderDetailsComponent } from './theme/pages/ecommerce-page/e-order-details/e-order-details.component';
import { ECreateOrderComponent } from './theme/pages/ecommerce-page/e-create-order/e-create-order.component';
import { ECustomersComponent } from './theme/pages/ecommerce-page/e-customers/e-customers.component';
import { ECartComponent } from './theme/pages/ecommerce-page/e-cart/e-cart.component';
import { ECheckoutComponent } from './theme/pages/ecommerce-page/e-checkout/e-checkout.component';
import { ESellersComponent } from './theme/pages/ecommerce-page/e-sellers/e-sellers.component';
import { ERefundsComponent } from './theme/pages/ecommerce-page/e-refunds/e-refunds.component';
import { CrmPageComponent } from './theme/pages/crm-page/crm-page.component';
import { CCustomersComponent } from './theme/pages/crm-page/c-customers/c-customers.component';
import { CLeadsComponent } from './theme/pages/crm-page/c-leads/c-leads.component';
import { CDealsComponent } from './theme/pages/crm-page/c-deals/c-deals.component';
import { ECategoriesComponent } from './theme/pages/ecommerce-page/e-categories/e-categories.component';
import { ECreateCategoryComponent } from './theme/pages/ecommerce-page/e-create-category/e-create-category.component';
import { EEditCategoryComponent } from './theme/pages/ecommerce-page/e-edit-category/e-edit-category.component';
import { EReviewsComponent } from './theme/pages/ecommerce-page/e-reviews/e-reviews.component';
import { ESellerDetailsComponent } from './theme/pages/ecommerce-page/e-seller-details/e-seller-details.component';
import { ECustomerDetailsComponent } from './theme/pages/ecommerce-page/e-customer-details/e-customer-details.component';
import { ECreateSellerComponent } from './theme/pages/ecommerce-page/e-create-seller/e-create-seller.component';
import { CCreateContactComponent } from './theme/pages/crm-page/c-create-contact/c-create-contact.component';
import { CEditContactComponent } from './theme/pages/crm-page/c-edit-contact/c-edit-contact.component';
import { CCreateLeadComponent } from './theme/pages/crm-page/c-create-lead/c-create-lead.component';
import { CEditLeadComponent } from './theme/pages/crm-page/c-edit-lead/c-edit-lead.component';
import { CCreateDealComponent } from './theme/pages/crm-page/c-create-deal/c-create-deal.component';
import { PmProjectOverviewComponent } from './theme/pages/project-management-page/pm-project-overview/pm-project-overview.component';
import { PmProjectsListComponent } from './theme/pages/project-management-page/pm-projects-list/pm-projects-list.component';
import { PmClientsComponent } from './theme/pages/project-management-page/pm-clients/pm-clients.component';
import { PmTeamsComponent } from './theme/pages/project-management-page/pm-teams/pm-teams.component';
import { PmKanbanBoardComponent } from './theme/pages/project-management-page/pm-kanban-board/pm-kanban-board.component';
import { PmUsersComponent } from './theme/pages/project-management-page/pm-users/pm-users.component';
import { PmCreateProjectComponent } from './theme/pages/project-management-page/pm-create-project/pm-create-project.component';
import { PmCreateUserComponent } from './theme/pages/project-management-page/pm-create-user/pm-create-user.component';
import { PmEditUserComponent } from './theme/pages/project-management-page/pm-edit-user/pm-edit-user.component';
import { LmsPageComponent } from './theme/pages/lms-page/lms-page.component';
import { LCoursesComponent } from './theme/pages/lms-page/l-courses/l-courses.component';
import { ProjectManagementPageComponent } from './theme/pages/project-management-page/project-management-page.component';
import { LCourseDetailsComponent } from './theme/pages/lms-page/l-course-details/l-course-details.component';
import { LCreateCourseComponent } from './theme/pages/lms-page/l-create-course/l-create-course.component';
import { LEditCourseComponent } from './theme/pages/lms-page/l-edit-course/l-edit-course.component';
import { LInstructorsComponent } from './theme/pages/lms-page/l-instructors/l-instructors.component';
import { HelpDeskPageComponent } from './theme/pages/help-desk-page/help-desk-page.component';
import { HdTicketsComponent } from './theme/pages/help-desk-page/hd-tickets/hd-tickets.component';
import { HdTicketDetailsComponent } from './theme/pages/help-desk-page/hd-ticket-details/hd-ticket-details.component';
import { HdAgentsComponent } from './theme/pages/help-desk-page/hd-agents/hd-agents.component';
import { HdReportsComponent } from './theme/pages/help-desk-page/hd-reports/hd-reports.component';
import { EOrderTrackingComponent } from './theme/pages/ecommerce-page/e-order-tracking/e-order-tracking.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ToDoListComponent } from './pages/to-do-list/to-do-list.component';
import { ChatComponent } from './pages/chat/chat.component';
import { FileManagerComponent } from './pages/file-manager/file-manager.component';
import { EmailComponent } from './pages/email/email.component';
import { InboxComponent } from './pages/email/inbox/inbox.component';
import { ComposeComponent } from './pages/email/compose/compose.component';
import { ReadComponent } from './pages/email/read/read.component';
import { EventsPageComponent } from './theme/pages/events-page/events-page.component';
import { EventsListComponent } from './theme/pages/events-page/events-list/events-list.component';
import { EventDetailsComponent } from './theme/pages/events-page/event-details/event-details.component';
import { CreateAnEventComponent } from './theme/pages/events-page/create-an-event/create-an-event.component';
import { EditAnEventComponent } from './theme/pages/events-page/edit-an-event/edit-an-event.component';
import { InvoicesPageComponent } from './theme/pages/invoices-page/invoices-page.component';
import { InvoicesComponent } from './theme/pages/invoices-page/invoices/invoices.component';
import { InvoiceDetailsComponent } from './theme/pages/invoices-page/invoice-details/invoice-details.component';
import { CContactsComponent } from './theme/pages/crm-page/c-contacts/c-contacts.component';
import { MyDriveComponent } from './pages/file-manager/my-drive/my-drive.component';
import { AssetsComponent } from './pages/file-manager/assets/assets.component';
import { ProjectsComponent } from './pages/file-manager/projects/projects.component';
import { PersonalComponent } from './pages/file-manager/personal/personal.component';
import { ApplicationsComponent } from './pages/file-manager/applications/applications.component';
import { DocumentsComponent } from './pages/file-manager/documents/documents.component';
import { MediaComponent } from './pages/file-manager/media/media.component';
import { StarterComponent } from './theme/starter/starter.component';
import { PricingPageComponent } from './theme/pages/pricing-page/pricing-page.component';
import { KanbanBoardComponent } from './pages/kanban-board/kanban-board.component';
import { SocialPageComponent } from './theme/pages/social-page/social-page.component';
import { ProfileComponent } from './theme/pages/social-page/profile/profile.component';
import { TimelineComponent } from './theme/pages/social-page/profile/timeline/timeline.component';
import { AboutComponent } from './theme/pages/social-page/profile/about/about.component';
import { ActivityComponent } from './theme/pages/social-page/profile/activity/activity.component';
import { NotificationsPageComponent } from './theme/pages/notifications-page/notifications-page.component';
import { UsersPageComponent } from './theme/pages/users-page/users-page.component';
import { TeamMembersComponent } from './theme/pages/users-page/team-members/team-members.component';
import { UsersListComponent } from './theme/pages/users-page/users-list/users-list.component';
import { AddUserComponent } from './theme/pages/users-page/add-user/add-user.component';
import { ProfilePageComponent } from './theme/pages/profile-page/profile-page.component';
import { UserProfileComponent } from './theme/pages/profile-page/user-profile/user-profile.component';
import { TeamsComponent } from './theme/pages/profile-page/teams/teams.component';
import { PProjectsComponent } from './theme/pages/profile-page/p-projects/p-projects.component';
import { IconsComponent } from './theme/icons/icons.component';
import { MaterialSymbolsComponent } from './theme/icons/material-symbols/material-symbols.component';
import { RemixiconComponent } from './theme/icons/remixicon/remixicon.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { LockScreenComponent } from './authentication/lock-screen/lock-screen.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { ConfirmEmailComponent } from './authentication/confirm-email/confirm-email.component';
import { MembersPageComponent } from './theme/pages/members-page/members-page.component';
import { ProfileSettingsComponent } from './theme/pages/social-page/profile-settings/profile-settings.component';
import { SettingsComponent } from './theme/settings/settings.component';
import { AccountSettingsComponent } from './theme/settings/account-settings/account-settings.component';
import { ChangePasswordComponent } from './theme/settings/change-password/change-password.component';
import { ConnectionsComponent } from './theme/settings/connections/connections.component';
import { PrivacyPolicyComponent } from './theme/settings/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './theme/settings/terms-conditions/terms-conditions.component';
import { MapsPageComponent } from './theme/pages/maps-page/maps-page.component';
import { InternalErrorComponent } from './common/internal-error/internal-error.component';
import { BlankPageComponent } from './common/blank-page/blank-page.component';
import { ComingSoonPageComponent } from './theme/pages/coming-soon-page/coming-soon-page.component';
import { SearchPageComponent } from './theme/pages/search-page/search-page.component';
import { GalleryPageComponent } from './theme/pages/gallery-page/gallery-page.component';
import { TestimonialsPageComponent } from './theme/pages/testimonials-page/testimonials-page.component';
import { TimelinePageComponent } from './theme/pages/timeline-page/timeline-page.component';
import { ChartsComponent } from './theme/charts/charts.component';
import { GaugeComponent } from './theme/charts/gauge/gauge.component';
import { ApexchartsComponent } from './theme/charts/apexcharts/apexcharts.component';
import { TablesComponent } from './theme/tables/tables.component';
import { BasicTableComponent } from './theme/tables/basic-table/basic-table.component';
import { DataTableComponent } from './theme/tables/data-table/data-table.component';
import { WidgetsComponent } from './theme/widgets/widgets.component';
import { MyProfileComponent } from './theme/my-profile/my-profile.component';
import { UiElementsComponent } from './theme/ui-elements/ui-elements.component';
import { AlertsComponent } from './theme/ui-elements/alerts/alerts.component';
import { AutocompleteComponent } from './theme/ui-elements/autocomplete/autocomplete.component';
import { InputComponent } from './theme/ui-elements/input/input.component';
import { AvatarsComponent } from './theme/ui-elements/avatars/avatars.component';
import { BadgesComponent } from './theme/ui-elements/badges/badges.component';
import { BreadcrumbComponent } from './theme/ui-elements/breadcrumb/breadcrumb.component';
import { ButtonToggleComponent } from './theme/ui-elements/button-toggle/button-toggle.component';
import { DatepickerComponent } from './theme/ui-elements/datepicker/datepicker.component';
import { AccordionComponent } from './theme/ui-elements/accordion/accordion.component';
import { BottomSheetComponent } from './theme/ui-elements/bottom-sheet/bottom-sheet.component';
import { ButtonsComponent } from './theme/ui-elements/buttons/buttons.component';
import { CardsComponent } from './theme/ui-elements/cards/cards.component';
import { CarouselsComponent } from './theme/ui-elements/carousels/carousels.component';
import { CheckboxComponent } from './theme/ui-elements/checkbox/checkbox.component';
import { ChipsComponent } from './theme/ui-elements/chips/chips.component';
import { ColorPickerComponent } from './theme/ui-elements/color-picker/color-picker.component';
import { DialogComponent } from './theme/ui-elements/dialog/dialog.component';
import { DividerComponent } from './theme/ui-elements/divider/divider.component';
import { GridListComponent } from './theme/ui-elements/grid-list/grid-list.component';
import { FormFieldComponent } from './theme/ui-elements/form-field/form-field.component';
import { DragDropComponent } from './theme/ui-elements/drag-drop/drag-drop.component';
import { ExpansionComponent } from './theme/ui-elements/expansion/expansion.component';
import { ClipboardComponent } from './theme/ui-elements/clipboard/clipboard.component';
import { IconComponent } from './theme/ui-elements/icon/icon.component';
import { ListComponent } from './theme/ui-elements/list/list.component';
import { ListboxComponent } from './theme/ui-elements/listbox/listbox.component';
import { MenusComponent } from './theme/ui-elements/menus/menus.component';
import { PaginationComponent } from './theme/ui-elements/pagination/pagination.component';
import { ProgressBarComponent } from './theme/ui-elements/progress-bar/progress-bar.component';
import { RadioComponent } from './theme/ui-elements/radio/radio.component';
import { SelectComponent } from './theme/ui-elements/select/select.component';
import { SidenavComponent } from './theme/ui-elements/sidenav/sidenav.component';
import { SlideToggleComponent } from './theme/ui-elements/slide-toggle/slide-toggle.component';
import { SliderComponent } from './theme/ui-elements/slider/slider.component';
import { SnackbarComponent } from './theme/ui-elements/snackbar/snackbar.component';
import { StepperComponent } from './theme/ui-elements/stepper/stepper.component';
import { TypographyComponent } from './theme/ui-elements/typography/typography.component';
import { TooltipComponent } from './theme/ui-elements/tooltip/tooltip.component';
import { ToolbarComponent } from './theme/ui-elements/toolbar/toolbar.component';
import { VideosComponent } from './theme/ui-elements/videos/videos.component';
import { TreeComponent } from './theme/ui-elements/tree/tree.component';
import { TabsComponent } from './theme/ui-elements/tabs/tabs.component';
import { TableComponent } from './theme/ui-elements/table/table.component';
import { FormsComponent } from './theme/forms/forms.component';
import { BasicElementsComponent } from './theme/forms/basic-elements/basic-elements.component';
import { AdvancedElementsComponent } from './theme/forms/advanced-elements/advanced-elements.component';
import { WizardComponent } from './theme/forms/wizard/wizard.component';
import { EditorsComponent } from './theme/forms/editors/editors.component';
import { FileUploaderComponent } from './theme/forms/file-uploader/file-uploader.component';
import { FaqPageComponent } from './theme/pages/faq-page/faq-page.component';
import { RatioComponent } from './theme/ui-elements/ratio/ratio.component';
import { UtilitiesComponent } from './theme/ui-elements/utilities/utilities.component';
import { LoginGuardGuard } from './shared/guards/login.guard';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'authentication',
        component: AuthenticationComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: '', component: SignInComponent },
            { path: 'sign-up', component: SignUpComponent },
            { path: 'forgot-password', component: ForgotPasswordComponent },
            { path: 'reset-password', component: ResetPasswordComponent },
            { path: 'lock-screen', component: LockScreenComponent },
            { path: 'confirm-email', component: ConfirmEmailComponent },
            { path: 'logout', component: LogoutComponent },
        ],
    },
    {
        path: 'administrator',
        // canActivate: [AuthGuard],
        loadChildren: () =>
            import('./pages/administrator/administrator.module').then(
                (m) => m.AdministratorRoutingModule
            ),
    },
    {
        path: 'dashboard',
        component: EcommerceComponent,
        canActivate: [AuthGuard],
    },
    { path: 'crm', component: CrmComponent, canActivate: [AuthGuard] },
    {
        path: 'project-management',
        component: ProjectManagementComponent,
        canActivate: [AuthGuard],
    },
    { path: 'lms', component: LmsComponent, canActivate: [AuthGuard] },
    {
        path: 'help-desk',
        component: HelpDeskComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'to-do-list',
        component: ToDoListComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'calendar',
        component: CalendarComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'contacts',
        component: ContactsComponent,
        canActivate: [AuthGuard],
    },
    { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
    {
        path: 'kanban-board',
        component: KanbanBoardComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'file-manager',
        component: FileManagerComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: MyDriveComponent },
            { path: 'assets', component: AssetsComponent },
            { path: 'projects', component: ProjectsComponent },
            { path: 'personal', component: PersonalComponent },
            { path: 'applications', component: ApplicationsComponent },
            { path: 'documents', component: DocumentsComponent },
            { path: 'media', component: MediaComponent },
        ],
    },
    {
        path: 'email',
        component: EmailComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: InboxComponent },
            { path: 'compose', component: ComposeComponent },
            { path: 'read', component: ReadComponent },
        ],
    },
    {
        path: 'ecommerce-page',
        component: EcommercePageComponent,
        children: [
            { path: '', component: EProductsGridComponent },
            { path: 'products-list', component: EProductsListComponent },
            { path: 'product-details', component: EProductDetailsComponent },
            { path: 'create-product', component: ECreateProductComponent },
            { path: 'edit-product', component: EEditProductComponent },
            { path: 'orders', component: EOrdersComponent },
            { path: 'order-details', component: EOrderDetailsComponent },
            { path: 'create-order', component: ECreateOrderComponent },
            { path: 'order-tracking', component: EOrderTrackingComponent },
            { path: 'customers', component: ECustomersComponent },
            { path: 'customer-details', component: ECustomerDetailsComponent },
            { path: 'cart', component: ECartComponent },
            { path: 'checkout', component: ECheckoutComponent },
            { path: 'sellers', component: ESellersComponent },
            { path: 'seller-details', component: ESellerDetailsComponent },
            { path: 'create-seller', component: ECreateSellerComponent },
            { path: 'refunds', component: ERefundsComponent },
            { path: 'categories', component: ECategoriesComponent },
            { path: 'create-category', component: ECreateCategoryComponent },
            { path: 'edit-category', component: EEditCategoryComponent },
            { path: 'reviews', component: EReviewsComponent },
        ],
        canActivate: [AuthGuard],
    },
    {
        path: 'crm-page',
        component: CrmPageComponent,
        children: [
            { path: '', component: CContactsComponent },
            { path: 'create-contact', component: CCreateContactComponent },
            { path: 'edit-contact', component: CEditContactComponent },
            { path: 'customers', component: CCustomersComponent },
            { path: 'create-lead', component: CCreateLeadComponent },
            { path: 'edit-lead', component: CEditLeadComponent },
            { path: 'leads', component: CLeadsComponent },
            { path: 'deals', component: CDealsComponent },
            { path: 'create-deal', component: CCreateDealComponent },
        ],
        canActivate: [AuthGuard],
    },
    {
        path: 'project-management-page',
        component: ProjectManagementPageComponent,
        children: [
            { path: '', component: PmProjectOverviewComponent },
            { path: 'projects-list', component: PmProjectsListComponent },
            { path: 'create-project', component: PmCreateProjectComponent },
            { path: 'clients', component: PmClientsComponent },
            { path: 'teams', component: PmTeamsComponent },
            { path: 'kanban-board', component: PmKanbanBoardComponent },
            { path: 'users', component: PmUsersComponent },
            { path: 'create-user', component: PmCreateUserComponent },
            { path: 'edit-user', component: PmEditUserComponent },
        ],
        // canActivate: [AuthGuard],
    },
    {
        path: 'lms-page',
        component: LmsPageComponent,
        children: [
            { path: '', component: LCoursesComponent },
            { path: 'course-details', component: LCourseDetailsComponent },
            { path: 'create-course', component: LCreateCourseComponent },
            { path: 'edit-course', component: LEditCourseComponent },
            { path: 'instructors', component: LInstructorsComponent },
        ],
        canActivate: [AuthGuard],
    },
    {
        path: 'help-desk-page',
        component: HelpDeskPageComponent,
        children: [
            { path: '', component: HdTicketsComponent },
            { path: 'ticket-details', component: HdTicketDetailsComponent },
            { path: 'agents', component: HdAgentsComponent },
            { path: 'reports', component: HdReportsComponent },
        ],
        canActivate: [AuthGuard],
    },
    {
        path: 'events',
        component: EventsPageComponent,
        children: [
            { path: '', component: EventsListComponent },
            { path: 'event-details', component: EventDetailsComponent },
            { path: 'create-an-event', component: CreateAnEventComponent },
            { path: 'edit-an-event', component: EditAnEventComponent },
        ],
        canActivate: [AuthGuard],
    },
    {
        path: 'invoices',
        component: InvoicesPageComponent,
        children: [
            { path: '', component: InvoicesComponent },
            { path: 'invoice-details', component: InvoiceDetailsComponent },
        ],
        canActivate: [AuthGuard],
    },
    {
        path: 'social',
        component: SocialPageComponent,
        children: [
            {
                path: '',
                component: ProfileComponent,
                children: [
                    { path: '', component: TimelineComponent },
                    { path: 'about', component: AboutComponent },
                    { path: 'activity', component: ActivityComponent },
                ],
            },
            { path: 'settings', component: ProfileSettingsComponent },
        ],
        canActivate: [AuthGuard],
    },
    { path: 'starter', component: StarterComponent, canActivate: [AuthGuard] },
    { path: 'faq', component: FaqPageComponent, canActivate: [AuthGuard] },
    {
        path: 'pricing',
        component: PricingPageComponent,
        canActivate: [AuthGuard],
    },
    { path: 'maps', component: MapsPageComponent, canActivate: [AuthGuard] },
    {
        path: 'notifications',
        component: NotificationsPageComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'members',
        component: MembersPageComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'users',
        component: UsersPageComponent,
        children: [
            { path: '', component: TeamMembersComponent },
            { path: 'users-list', component: UsersListComponent },
            { path: 'add-user', component: AddUserComponent },
        ],
        canActivate: [AuthGuard],
    },
    {
        path: 'profile',
        component: ProfilePageComponent,
        children: [
            { path: '', component: UserProfileComponent },
            { path: 'teams', component: TeamsComponent },
            { path: 'projects', component: PProjectsComponent },
        ],
        canActivate: [AuthGuard],
    },
    {
        path: 'icons',
        component: IconsComponent,
        children: [
            { path: '', component: MaterialSymbolsComponent },
            { path: 'remixicon', component: RemixiconComponent },
        ],
    },

    { path: 'my-profile', component: MyProfileComponent },
    {
        path: 'settings',
        component: SettingsComponent,
        children: [
            { path: '', component: AccountSettingsComponent },
            { path: 'change-password', component: ChangePasswordComponent },
            { path: 'connections', component: ConnectionsComponent },
            { path: 'privacy-policy', component: PrivacyPolicyComponent },
            { path: 'terms-conditions', component: TermsConditionsComponent },
        ],
    },
    { path: 'timeline', component: TimelinePageComponent },
    { path: 'gallery', component: GalleryPageComponent },
    { path: 'testimonials', component: TestimonialsPageComponent },
    { path: 'search', component: SearchPageComponent },
    { path: 'coming-soon', component: ComingSoonPageComponent },
    { path: 'blank-page', component: BlankPageComponent },
    { path: 'internal-error', component: InternalErrorComponent },
    { path: 'widgets', component: WidgetsComponent },
    {
        path: 'charts',
        component: ChartsComponent,
        children: [
            { path: '', component: ApexchartsComponent },
            { path: 'gauge', component: GaugeComponent },
        ],
    },
    {
        path: 'tables',
        component: TablesComponent,
        children: [
            { path: '', component: BasicTableComponent },
            { path: 'data-table', component: DataTableComponent },
        ],
    },
    {
        path: 'ui-kit',
        component: UiElementsComponent,
        children: [
            { path: '', component: AlertsComponent },
            { path: 'autocomplete', component: AutocompleteComponent },
            { path: 'avatars', component: AvatarsComponent },
            { path: 'accordion', component: AccordionComponent },
            { path: 'badges', component: BadgesComponent },
            { path: 'breadcrumb', component: BreadcrumbComponent },
            { path: 'button-toggle', component: ButtonToggleComponent },
            { path: 'bottom-sheet', component: BottomSheetComponent },
            { path: 'buttons', component: ButtonsComponent },
            { path: 'cards', component: CardsComponent },
            { path: 'carousels', component: CarouselsComponent },
            { path: 'checkbox', component: CheckboxComponent },
            { path: 'chips', component: ChipsComponent },
            { path: 'color-picker', component: ColorPickerComponent },
            { path: 'clipboard', component: ClipboardComponent },
            { path: 'datepicker', component: DatepickerComponent },
            { path: 'dialog', component: DialogComponent },
            { path: 'divider', component: DividerComponent },
            { path: 'drag-drop', component: DragDropComponent },
            { path: 'expansion', component: ExpansionComponent },
            { path: 'form-field', component: FormFieldComponent },
            { path: 'grid-list', component: GridListComponent },
            { path: 'input', component: InputComponent },
            { path: 'icon', component: IconComponent },
            { path: 'list', component: ListComponent },
            { path: 'listbox', component: ListboxComponent },
            { path: 'menus', component: MenusComponent },
            { path: 'pagination', component: PaginationComponent },
            { path: 'progress-bar', component: ProgressBarComponent },
            { path: 'radio', component: RadioComponent },
            { path: 'ratio', component: RatioComponent },
            { path: 'select', component: SelectComponent },
            { path: 'sidenav', component: SidenavComponent },
            { path: 'slide-toggle', component: SlideToggleComponent },
            { path: 'slider', component: SliderComponent },
            { path: 'snackbar', component: SnackbarComponent },
            { path: 'stepper', component: StepperComponent },
            { path: 'typography', component: TypographyComponent },
            { path: 'tooltip', component: TooltipComponent },
            { path: 'toolbar', component: ToolbarComponent },
            { path: 'table', component: TableComponent },
            { path: 'tabs', component: TabsComponent },
            { path: 'tree', component: TreeComponent },
            { path: 'videos', component: VideosComponent },
            { path: 'utilities', component: UtilitiesComponent },
        ],
    },
    {
        path: 'forms',
        component: FormsComponent,
        children: [
            { path: '', component: BasicElementsComponent },
            { path: 'advanced-elements', component: AdvancedElementsComponent },
            { path: 'wizard', component: WizardComponent },
            { path: 'editors', component: EditorsComponent },
            { path: 'file-uploader', component: FileUploaderComponent },
        ],
    },
    // Here add new pages component

    { path: '**', component: NotFoundComponent }, // This line will remain down from the whole pages component list
];
