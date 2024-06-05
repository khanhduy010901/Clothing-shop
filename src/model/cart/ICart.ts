import { IBaseRequest } from "../IBaseRequest";
import { IBaseResponse } from "../IBaseResponse";
import { IUserInfo } from "../user/IUser";

export interface IAddCartRequest extends IBaseRequest {
  ProductID: string;
  Quantity: number;
  UserID: string;
}

export interface IUpdateCartRequest extends IBaseRequest {
  Quantity: number;
}

export interface ICartResponse extends IBaseResponse {
    data: ICart[];
}

export interface ICart {
  _id: string;
  UserID: IUserInfo;
  ProductID: ProductId;
  Quantity: number;
}

export interface ProductId {
  _id: string;
  CategoryID: string;
  Brand: string;
  Description: string;
  Price: number;
  ProductName: string;
  StockQuantity: number;
}
