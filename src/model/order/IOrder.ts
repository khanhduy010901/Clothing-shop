import { IBaseResponse } from "../IBaseResponse";
import { IProductResponse } from "../product/IProduct";
import { IUserInfo } from "../user/IUser";

export interface IOrder {
  _id: string;
  UserID: String;
  CartID: string[];
  OrderDate: string;
  TotalAmount: number;
  PaymentMethodID: PaymentMethodId;
  Status: number;
}

export interface PaymentMethodId {
  _id: string;
  MethodName: string;
}


export interface IOrderListResponse extends IBaseResponse {
    data: IOrder[];
}

export interface IOrderDetail {
    _id: string
    OrderID: IOrder
    Quantity: number
    DetailCartData: DetailCartData[]
    UnitPrice: number
}

export interface DetailCartData {
    _id: string
    UserID: IUserInfo
    ProductID: IProductResponse
    Quantity: number
}

export interface IOrderDetailResponse extends IBaseResponse {
    data: IOrderDetail[];
}