import { ApiResponse } from '../ApiResponse/ApiResponse.interface';

export interface IVendor {
    Id: number;
    Name: string;
    PhoneNumber: string;
    Email: string;
    NTN?: string;
    AccountTitle?: string;
    BankName?: string;
    AccountNumberIBN?: string;
}

export interface IVendorResponse extends ApiResponse<IVendor[]> {}
export interface IVendorInsertResponse extends ApiResponse<IVendor> {}
