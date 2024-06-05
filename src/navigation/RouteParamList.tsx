import { ICart } from "../model/cart/ICart";

export type RouteParamList = {
  TabRoute:
    | undefined
    | {
        screen?: "Home" | "Favorite" | "Cart" | "Profile";
        params?: any;
      };
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Favorite: undefined;
  Cart: undefined;
  Profile: undefined;
  Product: undefined;
  ProductCategory: { category: any } | undefined;
  ProductDetail: { productId: any } | undefined;
  UpdateProfile: undefined;
  ChangePassword: undefined;
  OrderConfirm: { productList: any } | undefined;
  OrderList: undefined;
  OrderDetail: { order: any } | undefined;
  Payment: { cartList: ICart[] } | undefined;
  PaymentWebview: { webUrl: string };
};

export const ProtectedScreens: Array<keyof RouteParamList> = [];
