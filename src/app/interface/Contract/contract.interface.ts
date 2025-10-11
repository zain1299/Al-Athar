import { ApiResponse } from '../ApiResponse/ApiResponse.interface';
import { IGroup } from '../Group/OG-Group.interface';
import { IOGContractTypes } from '../OGContractTypes/OGContractTypes.interface';
import { IVendor } from '../Vendor/vendor.interface';

export interface IContracts {
    Id: number;
    ContractTitle: string;
    TypeId: number;
    Type?: IOGContractTypes;
    VendorId: number;
    Vendor?: IVendor;
    ContractDetails?: IContractDetails[];
    Description?: string;
    URL?: string;
    StartDate: string;
    EndDate: string;
    ContractGroup?: {
        Id: number;
        Group: IGroup;
    }[];

    Attachment?: any;
}

export interface IContractDetails {
    Id: number;
    ContractId: number;
    contract?: IContracts;
    StartDate: Date;
    EndDate: Date;
    CreatedDate: Date;
    UpdatedDate: Date;
    IsActive: boolean;
}

export interface IContractsResponse extends ApiResponse<IContracts[]> {}
export interface IContractsInsertResponse extends ApiResponse<IContracts> {}
