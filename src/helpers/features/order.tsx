import { IPaymentRequest } from "../../model/order/IPayment";
import OrderService from "../../services/OrderService";
import { useAppSelector, useBaseHook } from "../hookHelper";

export const useOrder = () => {
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const { showLoading, hideLoading } = useBaseHook();

  const onGetOrderList = async () => {
    showLoading();
    const res = await OrderService.getOrderList(
      authenticationReducer.userInfo?._id || ""
    );
    hideLoading();
    return res;
  };

  const onGetOrderDetail = async (orderId: string) => {
    showLoading();
    const res = await OrderService.getOrderDetail(orderId);
    hideLoading();
    return res;
  };

  const onCreatePayment = async (body: IPaymentRequest, type: string) => {
    showLoading();
    let res;
    if (type === "6655f7f4292beaa88d15cad0") {
      res = await OrderService.createPaymentVnPay(
        body,
        authenticationReducer.userInfo?._id || ""
      );
    } else {
      res = await OrderService.createPaymentCod(
        body,
        authenticationReducer.userInfo?._id || ""
      );
    }
    hideLoading();
    return res;
  };

  return {
    onGetOrderList,
    onGetOrderDetail,
    onCreatePayment,
  };
};
