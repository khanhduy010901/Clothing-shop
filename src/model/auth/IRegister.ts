import { IBaseRequest } from "../IBaseRequest";
import { IBaseResponse } from "../IBaseResponse";

export interface IRegisterRequest extends IBaseRequest {
  PhoneNumber: string;
  Password: string;
  Email: string;
  FullName: string;
}
export interface IRegisterResponse extends IBaseResponse {
  msisdn: string;
  fullName: string;
  dob: string;
  gender: number;
  paperType: number;
  idNo: string;
  referenceNumber: string;
  pin: string;
  transactionId: string;
}
