import { IAddCartRequest, IUpdateCartRequest } from "../../model/cart/ICart";
import CartService from "../../services/CartService";
import { useAppSelector, useBaseHook } from "../hookHelper";

export const useCart = () => {
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const { showLoading, hideLoading } = useBaseHook();

  const onGetCart = async () => {
    showLoading();
    const res = await CartService.getCartByUser(
      authenticationReducer.userInfo?._id || ""
    );
    hideLoading();
    return res;
  };

  const onAddCartProduct = async (productId: string, amount: number) => {
    showLoading();
    const res = await CartService.addCart({
      ProductID: productId,
      Quantity: amount,
      UserID: authenticationReducer.userInfo?._id || "",
    });
    hideLoading();
    return res;
  };

  const onUpdateCartProduct = async (cartItemId: string, quantity: number) => {
    showLoading();
    const res = await CartService.updateItemCart(
      { Quantity: quantity },
      cartItemId
    );
    hideLoading();
    return res;
  };

  const onDeleteCartProduct = async (cartItemId: string) => {
    showLoading();
    const res = await CartService.deleteItemCart(cartItemId);
    hideLoading();
    return res;
  };

  return {
    onGetCart,
    onAddCartProduct,
    onUpdateCartProduct,
    onDeleteCartProduct,
  };
};
