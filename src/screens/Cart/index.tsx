import React, { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";

import useStyles from "./styles";
import { HookHelper } from "../../helpers";
import { useAppSelector, useGetNavigation } from "../../helpers/hookHelper";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import AppHeader from "../../components/atoms/Header";
import AppText from "../../components/atoms/AppText";
import { theme } from "../../utils/styles/theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AppButton from "../../components/atoms/Button";
import { useCart } from "../../helpers/features/cart";
import { ICart } from "../../model/cart/ICart";
import { images } from "../../../assets";
import { formatVndPrice } from "../../helpers/currencyHelper";
import { useFocusEffect } from "@react-navigation/native";

const ItemProduct = ({
  item,
  index,
  updateProductAmount,
  deleteProductCart,
}: any) => {
  const styles = useStyles(theme);
  return (
    <View style={styles.itemContainerStyle}>
      <Image source={images.productHolder} style={styles.imageStyle} />

      <View style={styles.textStyle}>
        <AppText style={{ color: "#2e2f30" }}>
          {item.ProductID.ProductName}
        </AppText>
        <View style={styles.priceStyle}>
          <AppText style={{ color: "#2e2f30", fontSize: 12 }}>
            ${formatVndPrice(item.ProductID.Price)}
          </AppText>
        </View>
      </View>

      <View style={styles.counterStyle}>
        <TouchableOpacity
          onPress={() => updateProductAmount(item._id, item.Quantity - 1)}
        >
          <Icon name="minus" size={14} color={"black"} />
        </TouchableOpacity>

        <AppText>{item.Quantity}</AppText>

        <TouchableOpacity
          onPress={() => updateProductAmount(item._id, item.Quantity + 1)}
        >
          <Icon name="plus" size={14} color={"black"} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          deleteProductCart(item._id);
        }}
      >
        <Icon name="delete" size={20} color={"red"} />
      </TouchableOpacity>
    </View>
  );
};

export const CartScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { navigation } = useGetNavigation();
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const styles = useStyles(theme);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState<{ title: string; description?: string }>();
  const [cartList, setCartList] = useState<any>([]);
  const { onGetCart, onUpdateCartProduct, onDeleteCartProduct } = useCart();
  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };

  useFocusEffect(
    React.useCallback(() => {
      getCart();
      return () => {};
    }, [])
  );
  const getCart = async () => {
    const res = await onGetCart();
    if (res.succeeded) {
      if (res.data) {
        setCartList(res.data);
      } else {
        setCartList([]);
      }
    } else {
      setTimeout(() => {
        setShowError(true);
        setError({
          title: "Lỗi",
          description: res.error?.message || "Something went wrong",
        });
      }, 200);
    }
  };

  const updateProductAmount = async (cartId: string, amount: number) => {
    const res = await onUpdateCartProduct(cartId, amount);
    if (res && res.succeeded) {
      getCart();
    } else {
      setTimeout(() => {
        setShowError(true);
        setError({
          title: "Lỗi",
          description: res?.error?.message || "Something went wrong",
        });
      }, 200);
    }
  };

  const deleteProductCart = async (cartId: string) => {
    const res = await onDeleteCartProduct(cartId);
    if (res && res.succeeded) {
      getCart();
    } else {
      setTimeout(() => {
        setShowError(true);
        setError({
          title: "Lỗi",
          description: res?.error?.message || "Something went wrong",
        });
      }, 200);
    }
  };

  const getTotal = () => {
    let total = 0;
    cartList.forEach((item: ICart) => {
      total += item.ProductID.Price * item.Quantity;
    });
    return total;
  };

  return (
    <View style={styles.container}>
      <AppHeader title={"My cart"} hideBack />
      <View style={styles.listContainer}>
        <FlatList
          data={cartList}
          renderItem={({ item, index }) => (
            <ItemProduct
              item={item}
              index={index}
              updateProductAmount={updateProductAmount}
              deleteProductCart={deleteProductCart}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
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
            <AppText style={styles.totalStyle}>{cartList.length} goods</AppText>
          </View>
          <AppText style={styles.totalStyle}>
            Total - ${formatVndPrice(getTotal())}
          </AppText>
        </View>
        <AppButton
          title={"Place an order"}
          onPress={() => navigation.navigate("Payment", { cartList: cartList })}
        />
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
