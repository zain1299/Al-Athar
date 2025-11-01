import { ApiResponse } from '../ApiResponse/ApiResponse.interface';

export interface IUserDetails {
  UserCode: number;
  EmployeeCode: number;
  RoleId: number;
  RegionId: number;
  ADName: string;
  UserName: string;
  Password: string;
  CitizenID: string;
  CardExpiryDate: string;
  CardType: string;
  FullNameAr: string;
  FullNameEN: string;
  FirstName: string;
  SecondName: string;
  ThirdName: string;
  FourthName: string;
  HouseName: string;
  CurrentWilayatId: number;
  PermanentWilayatId: number;
  Gender: string;
  EmailID: string;
  GSM: string;
  Qabila: string;
  DepartmentCode: number;
  DOB: string;
  UserTypeCode: number;
  IMG: string; // base64 string
  CommitteeId: number;
  DesignationId: number;
  ApplicationId: number;
  ReferenceId: any;
  CreatedDate: string;
  CreatedBy: number;
  UpdatedDate: string;
  UpdatedBy: number;
  UpdatedIP: string;
  IsActive: boolean;
  UpdatedURL: string;
  ViaPhone: boolean;
}


export interface IDefaultcolumns {
 UserCode: number;
  EmployeeCode: number;
  RoleId: number;
  RegionId: number;
  ADName: string;
  UserName: string;
  Password: string;
  CitizenID: string;
  CardExpiryDate: string;
  CardType: string;
  FullNameAr: string;
  FullNameEN: string;
  FirstName: string;
  SecondName: string;
  ThirdName: string;
  FourthName: string;
  HouseName: string;
  CurrentWilayatId: number;
  PermanentWilayatId: number;
  Gender: string;
  EmailID: string;
  GSM: string;
  Qabila: string;
  DepartmentCode: number;
  DOB: string;
  UserTypeCode: number;
  IMG: string; // base64 string
  CommitteeId: number;
  DesignationId: number;
  ApplicationId: number;
  ReferenceId: any;
  CreatedDate: string;
  CreatedBy: number;
  UpdatedDate: string;
  UpdatedBy: number;
  UpdatedIP: string;
  IsActive: boolean;
  UpdatedURL: string;
  ViaPhone: boolean;
}


export interface ICommitteeResponse extends ApiResponse<IUserDetails[]> {}
export interface ICommitteeInsertResponse extends ApiResponse<IUserDetails> {}
