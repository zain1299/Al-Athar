import { ApiResponse } from '../ApiResponse/ApiResponse.interface';

export interface IOGContractTypes {
    Id: number;
    Name: string;
}

export interface IOGContractTypesResponse
    extends ApiResponse<IOGContractTypes[]> {}
export interface IOGContractTypesInsertResponse
    extends ApiResponse<IOGContractTypes> {}
