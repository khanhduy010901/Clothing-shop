import { IBaseRequest } from "../IBaseRequest";

export interface IPaymentRequest extends IBaseRequest {
    cartID: string[];
    PaymentMethodID: string;
    language: string;
}