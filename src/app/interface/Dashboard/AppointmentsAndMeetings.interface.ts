import { ApiResponse } from '../ApiResponse/ApiResponse.interface';

export interface IAppointmentsAndMeeting {
    appointmentsAndMeetings: AppointmentsAndMeeting[];
    upcomingEvent: UpcomingEvent;
}

export interface AppointmentsAndMeeting {
    MeetingId: number;
    AppointmentId: number;
    PublicAppointmentId: number;
    VideoCallId: number;
    Title: string;
    Date: string;
    Time: string;
    AppointmentStatus: string;
    AppointmentStatusId: number;
    AppointmentTypeId: number;
    AppointmentUser: string;
    AppointmentCreatedBy: string;
    MeetingStatusId: number;
    MeetingStatusName: string;
    hexCode: string;
    MeetingIdEnc?: string;
    AppointmentFor: number;
    ApplicationName: string;
    CSSClass: string;
    DateWeb: string;
    VideoCallHostName: string;
    VideoCallStatusId: number;
    VideoCallStatus: string;
}

export interface UpcomingEvent {
    MeetingId: number;
    AppointmentId: number;
    PublicAppointmentId: number;
    VideoCallId: number;
    Title: any;
    Date: any;
    Time: any;
    AppointmentStatus: any;
    AppointmentStatusId: number;
    AppointmentTypeId: number;
    AppointmentUser: any;
    AppointmentCreatedBy: any;
    MeetingStatusId: number;
    MeetingStatusName: any;
    hexCode: any;
    MeetingIdEnc: any;
    AppointmentFor: number;
    ApplicationName: any;
    CSSClass: any;
    DateWeb: any;
    VideoCallHostName: any;
    VideoCallStatusId: number;
    VideoCallStatus: any;
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
