import React, { useEffect, useState } from "react";
import { FlatList, Image, View } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AppText from "../../components/atoms/AppText";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import AppHeader from "../../components/atoms/Header";
import { HookHelper } from "../../helpers";
import { useAppSelector, useGetNavigation } from "../../helpers/hookHelper";
import { theme } from "../../utils/styles/theme";
import useStyles from "./styles";
import { useOrder } from "../../helpers/features/order";
import { images } from "../../../assets";
import { formatVndPrice } from "../../helpers/currencyHelper";

const ItemProduct = ({ item, index }: any) => {
  const styles = useStyles(theme);
  const data = item.ProductID;
  return (
    <View style={styles.itemContainerStyle}>
      <Image source={images.productHolder} style={styles.imageStyle} />

      <View style={styles.textStyle}>
        <AppText style={{ color: "#2e2f30" }}>{data.ProductName}</AppText>
        <View style={styles.priceStyle}>
          <AppText style={{ color: "#2e2f30", fontSize: 12 }}>
            ${data.Price}
          </AppText>
        </View>
      </View>

      <View style={styles.counterStyle}>
        <AppText>x {item.Quantity}</AppText>
      </View>
    </View>
  );
};

export const OrderDetailScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { navigation, route } = useGetNavigation<"OrderDetail">();
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const styles = useStyles(theme);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState<{ title: string; description?: string }>();
  const { onGetOrderDetail } = useOrder();
  const [orderDetail, setOrderDetail] = useState<any>({});
  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };

  const getOrderDetail = async () => {
    const res = await onGetOrderDetail(route.params?.order._id);
    if (res.succeeded && res.data) {
      if (res.data[0]) {
        setOrderDetail(res.data[0]);
      }
    } else {
      setShowError(true);
      setError({ title: "Lỗi", description: res?.error?.message });
    }
  };

  useEffect(() => {
    getOrderDetail();
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader title={"Order Detail"} />
      <View style={styles.header}>
        <View style={styles.statusContainer}>
          <AppText>{"Thành công"}</AppText>
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={orderDetail.DetailCartData}
          renderItem={({ item, index }) => (
            <ItemProduct item={item} index={index} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.receiverContainer}>
        <AppText h5 style={{ marginBottom: 8 }}>
          Receiver
        </AppText>
        {
          orderDetail?.DetailCartData && <View>
            <AppText>
              Full Name:{" "}
              {orderDetail?.DetailCartData[0]?.UserID?.FullName || ""}
            </AppText>
            <AppText>
              Phone Number:{" "}
              {orderDetail?.DetailCartData[0]?.UserID?.PhoneNumber || ""}
            </AppText>
            <AppText>
              Email: {orderDetail?.DetailCartData[0]?.UserID?.Email || ""}
            </AppText>
          </View>
        }
      </View>
      <View style={styles.bottomCotainer}>
        <View style={styles.rowContainer}>
          <View style={styles.rowContainer}>
            <Icon
              name="cart-arrow-right"
              size={20}
              color={"black"}
              style={styles.bottomIcon}
            />
            <AppText style={styles.totalStyle}>
              {orderDetail.Quantity} goods
            </AppText>
          </View>
          <AppText style={styles.totalStyle}>
            Total - {formatVndPrice(orderDetail?.OrderID?.TotalAmount || 0)}
          </AppText>
        </View>
        {/* {(route.params?.isAdmin && route.params.order.status != "Done") && (
          <AppButton
            title={'Accept Order'}
            onPress={() => {
              acceptOrder(route.params?.order.id);
              setTimeout(() => {
                navigation.goBack();
              }, 300);
            }}
          />
        )} */}
      </View>

      <ErrorModal
        confirmTitle={"Try Again"}
        onConfirm={() => tryAgain()}
        isVisible={showError}
        title={error?.title || ""}
        description={error?.description}
      />
    </View>
  );
};
