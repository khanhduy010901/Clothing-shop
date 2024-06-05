
import { IBaseRequest } from '../IBaseRequest';
import { IBaseResponse } from '../IBaseResponse';

export interface ILoginRequest extends IBaseRequest {
  Email: string;
  Password: string;
}

export interface ILoginResponse extends IBaseResponse {
  Email?: any;
  FullName?: string;
  Password?: string;
  PhoneNumber?: string;
  RegistrationDate?: string;
  _id?: string;
}
