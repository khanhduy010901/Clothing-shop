import React, { useEffect, useState } from "react";

import { FlatList, TouchableOpacity, View } from "react-native";

import AppText from "../../components/atoms/AppText";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import AppHeader from "../../components/atoms/Header";
import { HookHelper } from "../../helpers";
import { useAppSelector, useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";
import { useOrder } from "../../helpers/features/order";
import { formatVndPrice } from "../../helpers/currencyHelper";
import moment from "moment";

const PaymentItem = ({ item, index }: any) => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { navigation } = useGetNavigation();
  const styles = useStyles(theme);
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        navigation.navigate("OrderDetail", { order: item });
      }}
    >
      <View style={styles.itemCode}>
        <AppText style={styles.idText}>
          {index + 1}.{" "}
          <AppText style={styles.codeText}>
            {formatVndPrice(item.TotalAmount)}
          </AppText>
        </AppText>
        <AppText style={styles.dateText} italic>
          Ngày {moment(item.OrderDate).format("DD/MM/YYYY")}
        </AppText>
      </View>
      <View style={[styles.statusContainer]}>
        <AppText style={styles.idText}>Thành công</AppText>
      </View>
    </TouchableOpacity>
  );
};

export const OrderListScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const { navigation } = useGetNavigation();
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState<{ title: string; description?: string }>();
  const [orderList, setOrderList] = useState<any>([]);
  const { onGetOrderList } = useOrder();

  const getOrderList = async () => {
    try {
      const res = await onGetOrderList();
      if (res.succeeded) {
        setOrderList(res.data);
      } else {
        setShowError(true);
        setError({
          title: "Lỗi",
          description: res.error?.message || "Something went wrong",
        });
      }
    } catch (error: any) {
      setShowError(true);
      setError({
        title: "Lỗi",
        description: error.message,
      });
    }
  };
  useEffect(() => {
    getOrderList();
  }, []);

  const renderListBooking = () => {
    return (
      <View style={{ flex: 1, height: "100%" }}>
        <FlatList
          data={orderList}
          ListHeaderComponent={() => (
            <View style={styles.headerContainer}>
              <AppText style={styles.codeHeader}>Đơn hàng</AppText>
              <AppText style={styles.statusHeader}>Trạng thái</AppText>
            </View>
          )}
          renderItem={({ item, index }) => (
            <PaymentItem item={item} index={index} />
          )}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          style={styles.listStyle}
        />
      </View>
    );
  };
  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <AppHeader title={"Order"} />
      <View style={styles.container}>{renderListBooking()}</View>
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
