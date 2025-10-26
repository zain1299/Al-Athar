import { ApiResponse } from '../ApiResponse/ApiResponse.interface';

export interface ICommittee {
  CommitteeId: number;
  CommitteeIdEnc: string;
  CommType: number;
  CommSubType: number;
  CommNameAra: string;
  CommNameEng: string;
  ElectionNo: string;
  SortOrder: number;
  IsOtherCommittee: boolean;
  ParentCommitteeId: number;
  ParentCommitteeName: string;
  ApplicationID: number;
  CommitteeIcon: any;
  ReferenceId: any;
  RoleId: number;
  MeetingDisplayNoPattern: any;
  IsResetMeetingNo: boolean;
  CommitteeMembers: any;
  defaultcolumns: IDefaultcolumns;
}

export interface IDefaultcolumns {
  created_by: string;
  created_by_name: string;
  created_ip: string;
  created_pc: any;
  created_url: any;
  created_date: string;
  updated_by: any;
  updated_by_name: string;
  updated_ip: string;
  updated_pc: any;
  updated_url: any;
  updated_date?: string;
  is_active: boolean;
}


export interface ICommitteeResponse extends ApiResponse<ICommittee[]> {}
export interface ICommitteeInsertResponse extends ApiResponse<ICommittee> {}
