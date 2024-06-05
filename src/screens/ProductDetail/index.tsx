import React, { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";

import { images } from "../../../assets";
import AppText from "../../components/atoms/AppText";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import AppHeader from "../../components/atoms/Header";
import { HookHelper, Mixin } from "../../helpers";
import { formatVndPrice } from "../../helpers/currencyHelper";
import { useProduct } from "../../helpers/features/product";
import { useAppSelector, useGetNavigation } from "../../helpers/hookHelper";
import { IProductResponse } from "../../model/product/IProduct";
import useStyles from "./styles";
import AddCartDialog from "../../components/modules/AddCartDialog";

export const ProductDetailScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { navigation, route } = useGetNavigation<"ProductDetail">();
  const styles = useStyles(theme);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState<{ title: string; description?: string }>();
  const productId = route?.params?.productId;
  const [infoProduct, setInfoProduct] = useState<IProductResponse>();
  const [showCartDialog, setShowCartDialog] = useState(false);
  const { onGetProductDetail } = useProduct();
  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  const onPressAddToCart = () => {
    setShowCartDialog(true);
  };

  const getProductDetail = async () => {
    const res = await onGetProductDetail(productId);
    if (res.succeeded) {
      setInfoProduct(res.data);
    } else {
      setShowError(true);
      setError({ title: "Lỗi", description: res.error?.message });
    }
  };

  const ActionButton = (data: any) => {
    return (
      <View style={{ flexDirection: "row", height: 60, marginTop: 60 }}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#26AB9A",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={onPressAddToCart}
        >
          <Image
            style={{ width: 25, height: 23, tintColor: "white" }}
            resizeMode={"stretch"}
            source={images.cartIcon}
          ></Image>
          <AppText
            style={{
              fontSize: 20,
              color: "white",
              textAlignVertical: "center",
              textAlign: "center",
              marginLeft: 15,
            }}
          >
            Thêm giỏ hàng
          </AppText>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#F28230",
            justifyContent: "center",
          }}
        >
          <AppText
            style={{
              fontSize: 20,
              color: "white",
              textAlignVertical: "center",
              textAlign: "center",
            }}
          >
            Mua ngay
          </AppText>
        </TouchableOpacity> */}
      </View>
    );
  };
  const ProductDetail = () => {
    return (
      <View style={styles.componentContainer_ver2}>
        <AppText
          style={{
            fontSize: Mixin.moderateSize(14),
            color: "black",
            marginBottom: 8,
          }}
        >
          Thông tin sản phẩm
        </AppText>

        <View
          style={{ backgroundColor: "lightgray", height: 1, marginBottom: 8 }}
        />
        <View>
          <View style={{ flexDirection: "row", marginBottom: 15 }}>
            <AppText style={{ marginRight: 10, width: "30%" }}>Loại</AppText>
            <AppText style={{ color: "#000" }}>
              {infoProduct?.CategoryID.CategoryName}
            </AppText>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 15 }}>
            <AppText style={{ marginRight: 10, width: "30%" }}>
              Nhãn hàng
            </AppText>
            <AppText style={{ color: "#000" }}>{infoProduct?.Brand}</AppText>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 15 }}>
            <AppText style={{ marginRight: 10, width: "30%" }}>Tồn kho</AppText>
            <AppText style={{ color: "#000" }}>
              {infoProduct?.StockQuantity}
            </AppText>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 15 }}>
            <AppText style={{ marginRight: 10, width: "30%" }}>Mô tả</AppText>
            <AppText style={{ color: "#000" }}>
              {infoProduct?.Description}
            </AppText>
          </View>
        </View>
        {/* <View
          style={{ backgroundColor: "lightgray", height: 1, marginBottom: 8 }}
        />

        <AppText style={{ color: "gray" }}>{infoProduct?.Description}</AppText> */}
      </View>
    );
  };
  return (
    <View>
      <AppHeader title={""} />

      <ScrollView style={styles.container}>
        <Image style={styles.productCoverImage} source={images.productHolder} />
        <View style={styles.productInfoContainer}>
          <View style={styles.productName}>
            <View>
              <AppText numberOfLines={2} style={styles.textTitle}>
                {infoProduct?.ProductName}
              </AppText>

              <AppText style={styles.productPrice}>
                {formatVndPrice(infoProduct?.Price)}
              </AppText>
            </View>
          </View>
        </View>
        <View style={styles.productRatingContainer}>
          <View style={{ flexDirection: "row" }}>
            {[1, 2, 3, 4, 5].map((value, index) => {
              return (
                <Image
                  source={images.star}
                  style={styles.iconRating}
                  key={index}
                />
              );
            })}
          </View>
        </View>
        <ProductDetail />
        <ActionButton />
      </ScrollView>
      {infoProduct && (
        <AddCartDialog
          showDialog={showCartDialog}
          setShowDialog={setShowCartDialog}
          product={infoProduct}
          showError={(res) => {
            setShowError(true);
            setError({ title: "Lỗi", description: res.error?.message });
          }}
        />
      )}
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
