
import { IOrderListResponse, IOrderDetailResponse } from '../model/order/IOrder';
import { IPaymentRequest } from '../model/order/IPayment';
import { BaseApiService } from './BaseApiService';
const url = '/order';
class OrderService extends BaseApiService {
  public getOrderList = (userId: string) =>
    this.get<IOrderListResponse>(`${url}/u/${userId}`);
  public getOrderDetail = (orderId: string) =>
    this.get<IOrderDetailResponse>(`/orderDetail/${orderId}`);
  public createPaymentVnPay = (body: IPaymentRequest, userId: string) =>
    this.post<IPaymentRequest, any>(`${url}/create_payment_url/${userId}`, body);
  public createPaymentCod = (body: IPaymentRequest, userId: string) =>
    this.post<IPaymentRequest, any>(`${url}/create_payment_cod/${userId}`, body);
}

export default new OrderService(false);
