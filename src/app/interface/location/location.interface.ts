export interface ApiResponse<T> {
  Status: number;
  RspStatus: boolean;
  Code: number;
  Message: string;
  Value: any;
  Data: T;
}

export interface IDefaultColumns {
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
  updated_date: string;
  is_active: boolean;
}

export interface ILocation {
  LocationId: number;
  WilayatId: number;
  BuildingId: number;
  BuildingName: string | null;
  FloorNo: number;
  RoomNo: number;
  Description: string;
  GraceTimeMinutes: number;
  LocationName: string;
  defaultcolumns: IDefaultColumns;
}

export interface ILocationResponse extends ApiResponse<ILocation[]> {}
export interface IDefaultColumnsResponse extends ApiResponse<ILocation> {}
