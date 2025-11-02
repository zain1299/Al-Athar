
export interface ApiResponse<T> {
  Status: number;
  RspStatus: boolean;
  Code: number;
  Message: string;
  Value: any;
  Data: T;
}

export interface IContact {
  Id: number;
  Name: string;
  Email: string;
  Phone: string;
  Message: string;
  CreatedDate: string;
}


export interface IContactResponse extends ApiResponse<IContact[]> {}
