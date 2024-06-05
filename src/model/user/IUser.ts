import { IBaseResponse } from '../IBaseResponse';


export interface IUserInfo{
  Email?: any;
  FullName?: string;
  Password?: string;
  PhoneNumber?: string;
  RegistrationDate?: string;
  _id?: string;
}

export interface IUserInfoResponse extends IBaseResponse{
  Email?: any;
  FullName?: string;
  Password?: string;
  PhoneNumber?: string;
  RegistrationDate?: string;
  _id?: string;
}

