import React, { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { images } from "../../../assets";
import AppText from "../../components/atoms/AppText";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import AppHeader from "../../components/atoms/Header";
import { HookHelper } from "../../helpers";
import { useProduct } from "../../helpers/features/product";
import { useAppSelector, useGetNavigation } from "../../helpers/hookHelper";
import { CategoryList } from "../../model/home/IServices";
import { theme } from "../../utils/styles/theme";
import useStyles from "./styles";
import { formatVndPrice } from "../../helpers/currencyHelper";

const SerivceItem = ({ item }: any) => {
  const { navigation } = useGetNavigation();
  const styles = useStyles(theme);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductCategory", { category: item })}
      style={styles.itemContainer}
    >
      <Image
        source={item.image ? { uri: item.image } : images.menuIcon}
        style={styles.categoryImage}
      />
      <AppText style={styles.categoryText}>{item.CategoryName}</AppText>
    </TouchableOpacity>
  );
};

const ListService = (props: any) => {
  const styles = useStyles(theme);

  return (
    <View style={styles.categoryListContainer}>
      <FlatList
        data={props.categories || CategoryList}
        scrollEnabled={false}
        numColumns={5}
        renderItem={({ item }) => <SerivceItem item={item} type={props.type} />}
        keyExtractor={(item, index) => index.toString()}
        columnWrapperStyle={styles.columnWrapperStyle}
      />
    </View>
  );
};

const ProductItem = ({ item }: any) => {
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
      <View style={styles.rowContainer}>
        <AppText style={styles.productName}>{item.ProductName}</AppText>
        <View style={styles.rowContainer}>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <Image key={index} source={images.star} style={styles.starImage} />
          ))}
        </View>
      </View>
      <AppText style={styles.productPrice}>{formatVndPrice(item.Price)}</AppText>
    </TouchableOpacity>
  );
};

const ClothingRoute = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const styles = useStyles(theme);

  const [showError, setShowError] = useState(false);
  const [error, setError] = useState<{ title: string; description?: string }>();
  const [productList, setProductList] = useState<any>([]);
  const [category, setCategory] = useState<any>([]);
  const { onGetAllCategory, onGetAllProduct } = useProduct();

  useEffect(() => {
    getCategory();
    getAllProduct();
  }, []);

  const getCategory = async () => {
    const res = await onGetAllCategory();
    if (res.succeeded && res.data) {
      setCategory(res.data);
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

  const getAllProduct = async () => {
    const res = await onGetAllProduct();
    if (res.succeeded && res.data) {
      setProductList(res.data);
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

  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };

  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <ListService categories={category} />

      <AppText style={styles.topic}>Popularity</AppText>

      <FlatList
        horizontal={true}
        data={productList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item) => <ProductItem item={item.item} />}
      />

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

export const HomeScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const styles = useStyles(theme);

  return (
    <View style={styles.container}>
      <AppHeader title={"Clothing Store"} hideBack  />
      <View style={styles.rowContainer}>
        <AppText style={styles.title}>Welcome!</AppText>
        <Image source={images.userIcon} style={styles.userIcon} />
      </View>
      <ClothingRoute />
    </View>
  );
};
