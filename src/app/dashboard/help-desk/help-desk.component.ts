import { Component } from '@angular/core';
import { TicketsOpenComponent } from './tickets-open/tickets-open.component';
import { TicketsInProgressComponent } from './tickets-in-progress/tickets-in-progress.component';
import { TicketsResolvedComponent } from './tickets-resolved/tickets-resolved.component';
import { TicketsClosedComponent } from './tickets-closed/tickets-closed.component';
import { NewTicketsCreatedComponent } from './new-tickets-created/new-tickets-created.component';
import { FirstResponseTimeComponent } from './first-response-time/first-response-time.component';
import { AveResolutionTimeComponent } from './ave-resolution-time/ave-resolution-time.component';
import { CustomerSatisfactionComponent } from './customer-satisfaction/customer-satisfaction.component';
import { SlaMonitoringComponent } from './sla-monitoring/sla-monitoring.component';
import { TicketsSolvedAndCleatedComponent } from './tickets-solved-and-cleated/tickets-solved-and-cleated.component';
import { PerformanceOfAgentsComponent } from './performance-of-agents/performance-of-agents.component';
import { TicketsByChannelComponent } from './tickets-by-channel/tickets-by-channel.component';
import { TicketsByTypeComponent } from './tickets-by-type/tickets-by-type.component';
import { RecentCustomerRatingComponent } from './recent-customer-rating/recent-customer-rating.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-help-desk',
    standalone: true,
    imports: [TicketsOpenComponent, TicketsInProgressComponent, TicketsResolvedComponent, TicketsClosedComponent, NewTicketsCreatedComponent, FirstResponseTimeComponent, AveResolutionTimeComponent, CustomerSatisfactionComponent, SlaMonitoringComponent, TicketsSolvedAndCleatedComponent, PerformanceOfAgentsComponent, TicketsByChannelComponent, TicketsByTypeComponent, RecentCustomerRatingComponent, RouterLink],
    templateUrl: './help-desk.component.html',
    styleUrl: './help-desk.component.scss'
})
export class HelpDeskComponent {}