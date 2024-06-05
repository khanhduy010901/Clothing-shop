import React, { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";

import { images } from "../../../assets";
import AppText from "../../components/atoms/AppText";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import AppHeader from "../../components/atoms/Header";
import { HookHelper } from "../../helpers";
import { formatVndPrice } from "../../helpers/currencyHelper";
import { useProduct } from "../../helpers/features/product";
import { useAppSelector, useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";

const ProductItem = ({ item }: any) => {
  const { theme } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const { navigation } = useGetNavigation();

  return (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate("ProductDetail", { productId: item._id })}
    >
      <Image
        source={item.image ? { uri: item.image } : images.productHolder}
        style={styles.productImage}
      />
      <View>
        <AppText style={styles.productName}>{item.ProductName}</AppText>
        <View style={styles.rowContainer}>
          <AppText style={styles.productPrice}>{formatVndPrice(item.Price)}</AppText>
          <Image source={images.cartIcon} style={styles.cartIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const ProductCategoryScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const styles = useStyles(theme);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState<{ title: string; description?: string }>();
  const [productList, setProductList] = useState<any>([]);
  const { navigation, route } = useGetNavigation<"ProductCategory">();
  const category = route?.params?.category;

  const { onGetProductByCategory } = useProduct();
  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const res = await onGetProductByCategory(category._id);
    if (res.succeeded) {
      setProductList(res.data);
    } else {
      setShowError(true);
      setError({
        title: "Lỗi",
        description: res.errors?.message,
      });
    }
  };

  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };

  return (
    <View>
      <AppHeader title={category.CategoryName} />
      <View style={styles.container}>
        <FlatList
          style={styles.flatlistContainer}
          data={productList}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => <ProductItem item={item} />}
          keyExtractor={(item, index) => index.toString()}
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
