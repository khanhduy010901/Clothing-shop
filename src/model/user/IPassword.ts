import { IBaseRequest } from "../IBaseRequest";

export interface IChangePasswordRequest extends IBaseRequest {
    oldPassword: string;
    newPassword: string;
}