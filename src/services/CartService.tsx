
import { IAddCartRequest, ICartResponse, IUpdateCartRequest } from '../model/cart/ICart';
import { BaseApiService } from './BaseApiService';
const url = '/cart';
class CartService extends BaseApiService {
  public getCartByUser = (userId: string) =>
    this.get<ICartResponse>(`${url}/u/${userId}`);
  public addCart = (body: IAddCartRequest) =>
    this.post<IAddCartRequest, any>(`${url}/addCart`, body);
  public updateItemCart = (body: IUpdateCartRequest, cartItemId: string) =>
    this.put<IUpdateCartRequest, any>(`${url}/updateCart/${cartItemId}`, body);
  public deleteItemCart = (cartItemId: string) =>
    this.delete<any>(`${url}/delCart/${cartItemId}`);
}

export default new CartService(false);
