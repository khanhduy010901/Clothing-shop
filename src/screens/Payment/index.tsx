import { useState } from "react";

import { HookHelper } from "../../helpers";
import { useAppSelector, useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";
import { FlatList, ScrollView, View } from "react-native";
import AppHeader from "../../components/atoms/Header";
import moment from "moment";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import AppButton from "../../components/atoms/Button";
import AppText from "../../components/atoms/AppText";
import { formatVndPrice } from "../../helpers/currencyHelper";
import { RadioGroup } from "react-native-radio-buttons-group";
import { theme } from "../../utils/styles/theme";
import { ICart } from "../../model/cart/ICart";
import { useOrder } from "../../helpers/features/order";

const radioButtons = [
  {
    id: "6655f7f4292beaa88d15cad0",
    label: "VnPay",
    labelStyle: { color: "#05253D" },
    value: "1",
    color: theme.colors?.primary,
    borderColor: theme.colors?.primary,
  },
  {
    id: "6655f7fe292beaa88d15cad1",
    label: "COD",
    labelStyle: { color: "#05253D" },
    value: "2",
    color: theme.colors?.primary,
    borderColor: theme.colors?.primary,
  },
];

export const PaymentScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const { route, navigation } = useGetNavigation<"Payment">();
  const styles = useStyles(theme);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState<{ title: string; description?: string }>();
  const [paymentMethod, setPaymentMethod] = useState(
    "6655f7f4292beaa88d15cad0"
  );
  const cartList = route.params?.cartList;
  const { onCreatePayment } = useOrder();

  const createPayment = async () => {
    try {
      const res = await onCreatePayment(
        {
          cartID: cartList?.map((item: ICart) => item._id) ?? [],
          PaymentMethodID: paymentMethod,
          language: "vi",
        },
        paymentMethod
      );
      if (res) {
        if (paymentMethod === "6655f7f4292beaa88d15cad0") {
          navigation.navigate("PaymentWebview", { webUrl: res.data });
        } else {
          navigation.navigate("TabRoute");
        }
      }
    } catch (error) {
      setError({
        title: "Thanh toán thất bại",
        description: "Vui lòng thử lại",
      });
      setShowError(true);
    }
  };

  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };

  const getTotal = () => {
    let total = 0;
    cartList?.forEach((item: ICart) => {
      total += item.ProductID.Price * item.Quantity;
    });
    return total;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <AppHeader title={"Thông tin đơn hàng"} />
      <ScrollView style={styles.container}>
        <View style={styles.line} />
        <AppText style={styles.title}>{"Thông tin đơn hàng"}</AppText>
        <AppText style={styles.subTitle}>
          {moment().format("HH:MM")} {moment().format("DD/MM/YYYY")}
        </AppText>
        <AppText>
          Khách hàng: {authenticationReducer.userInfo?.FullName}
        </AppText>

        <View style={styles.flatListBorder}>
          <FlatList
            scrollEnabled={false}
            data={cartList}
            ListHeaderComponent={() => (
              <View style={styles.flatListHeader}>
                <AppText style={styles.rowOne}>ĐƠN GIÁ</AppText>
                <AppText style={styles.rowTwo}>SL</AppText>
                <AppText style={styles.rowTwo}>THÀNH TIỀN</AppText>
              </View>
            )}
            renderItem={({ item, index }) => (
              <View style={styles.rowView}>
                <AppText style={styles.rowOne}>
                  {index + 1}. {item.ProductID.ProductName}
                </AppText>
                <AppText style={styles.rowTwo}>{item.Quantity}</AppText>
                <AppText style={styles.rowTwo}>
                  {formatVndPrice(item.ProductID.Price * item.Quantity)}
                </AppText>
              </View>
            )}
            ListFooterComponent={() => (
              <View style={styles.flatListFooter}>
                <AppText style={{ flex: 3 }}>Tổng cộng: </AppText>
                <AppText style={styles.rowTwo}>
                  {formatVndPrice(getTotal())}
                </AppText>
              </View>
            )}
          />
        </View>
        <View style={styles.status}>
          <AppText italic>Trạng thái: Chờ thanh toán</AppText>
        </View>

        <View>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={setPaymentMethod}
            selectedId={paymentMethod}
            containerStyle={{ alignItems: "flex-start", marginTop: 16 }}
            color={theme.colors?.primary}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <AppButton title={"Thanh toán"} onPress={() => createPayment()} />
      </View>
      <ErrorModal
        confirmTitle={"Try again"}
        onConfirm={() => tryAgain()}
        isVisible={showError}
        title={error?.title || ""}
        description={error?.description}
      />
    </View>
  );
};
