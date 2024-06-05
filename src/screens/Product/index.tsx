import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { images } from "../../../assets";
import AppText from "../../components/atoms/AppText";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import AppHeader from "../../components/atoms/Header";
import { HookHelper } from "../../helpers";
import { useAppSelector, useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";
import { Icon } from "react-native-elements";
import { useProduct } from "../../helpers/features/product";
import { formatVndPrice } from "../../helpers/currencyHelper";
import { Picker } from "@react-native-picker/picker";
import { ICategory } from "../../model/product/ICategory";

const ProductItem = ({ item }: any) => {
  const { theme } = HookHelper.useBaseHook();
  const styles = useStyles(theme);
  const { navigation } = useGetNavigation();

  return (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() =>
        navigation.navigate("ProductDetail", { productId: item._id })
      }
    >
      <Image
        source={item.image ? { uri: item.image } : images.productHolder}
        style={styles.productImage}
      />
      <View>
        <AppText style={styles.productName}>{item.ProductName}</AppText>
        <View style={styles.rowContainer}>
          <AppText style={styles.productPrice}>
            {formatVndPrice(item.Price)}
          </AppText>
          <Image source={images.cartIcon} style={styles.cartIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const ProductScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const { navigation } = useGetNavigation<"Product">();

  const styles = useStyles(theme);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState<{ title: string; description?: string }>();
  const [productList, setProductList] = useState<any>([]);
  const [searchText, setSearchText] = React.useState("");
  const {
    onGetAllProduct,
    onSearchProductByName,
    onSearchProductByBrand,
    onSearchProductByPrice,
  } = useProduct();
  const [selectedFilter, setSelectedFilter] = useState("name");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };
  useEffect(() => {
    getAllProduct();
  }, []);

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

  const handleSearch = async () => {
    let res;
    if (selectedFilter === "name") {
      res = await onSearchProductByName(searchText);
    } else if (selectedFilter === "brand") {
      res = await onSearchProductByBrand(searchText);
    } else {
      res = await onSearchProductByPrice(minPrice, maxPrice);
    }
    if (res && res.succeeded) {
      console.log(res);
      
      setProductList(res.data);
    } else {
      setShowError(true);
      setError({
        title: "Lỗi",
        description: res?.error?.message || "Something went wrong",
      });
    }
  };

  return (
    <View>
      <AppHeader hideBack title={"Danh sách sản phẩm"} />
      <View style={styles.container}>
        <Picker
          selectedValue={selectedFilter}
          onValueChange={(itemValue: any, itemIndex) =>
            setSelectedFilter(itemValue)
          }
          style={styles.pickerContainer}
        >
          <Picker.Item label="Tên sản phẩm" value="name" />
          <Picker.Item label="Tên nhãn hàng" value="brand" />
          <Picker.Item label="Giá" value="Price" />
        </Picker>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          {selectedFilter === "Price" ? (
            <View style={styles.priceFilter}>
              <TextInput
                style={styles.priceInput}
                placeholder="Min"
                value={minPrice}
                keyboardType="number-pad"
                onChangeText={(text) => setMinPrice(text)}
              />
              <View style={styles.line} />
              <TextInput
                style={styles.priceInput}
                placeholder="Max"
                value={maxPrice}
                onChangeText={(text) => setMaxPrice(text)}
                keyboardType="number-pad"
              />
            </View>
          ) : (
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.exploreSearchInput}
                placeholder="Tìm kiếm"
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
              />
            </View>
          )}

          <TouchableOpacity
            style={styles.iconSearch}
            onPress={() => {
              handleSearch();
            }}
          >
            <Icon name="search" type="feather" color={"white"} size={20} />
          </TouchableOpacity>
        </View>

        <FlatList
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
