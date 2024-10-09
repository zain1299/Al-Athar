export interface ApiResponse<T> {
    Status: number;
    RspStatus: boolean;
    Code: number;
    Message: string;
    Value: any | null;
    Data: T | null;
}
