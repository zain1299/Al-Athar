import { ApiResponse } from '../ApiResponse/ApiResponse.interface';

export interface IAppointmentsAndMeeting {
    dailyEvents: IDailyEvent[];
    upcomingEvent: IDailyEvent;
}

export interface IDailyEvent {
    EventType: string;
    EventTypeAr: string;
    EventTypeId: number;
    Id: number;
    Title: string;
    Date: string;
    Time: string;
    StatusName: string;
    StatusColor: string;
    StatusId: number;
    DurationMin: number;
    AppointmentTypeId?: number;
    AppointmentUser: string;
    AppointmentUserId?: number;
    CreatedBy: string;
    CreatedById: number;
    CreatedByProfilePic: string;
    StartTime: string;
    EndTime: string;
}

export interface IAppointmentsAndMeetingResponse
    extends ApiResponse<IAppointmentsAndMeeting> {}

export interface IAppointmentsAndMeetingBody {
    StartDate: any;
    EndDate: any;
    defaultcolumns: Defaultcolumns;
}

export interface Defaultcolumns {
    created_by: number;
}
