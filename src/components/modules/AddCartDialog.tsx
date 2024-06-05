import {
  Dimensions,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { images } from "../../../assets";
import AppText from "../atoms/AppText";
import { IProductResponse } from "../../model/product/IProduct";
import { Mixin } from "../../helpers";
import { formatVndPrice } from "../../helpers/currencyHelper";
import { useState } from "react";
import AppButton from "../atoms/Button";
import { useCart } from "../../helpers/features/cart";

interface AddCartDialogProps {
  showDialog: boolean;
  setShowDialog: (value: boolean) => void;
  product: IProductResponse;
  showError: (res: any) => void;
}
const SCREEN_WIDTH = Dimensions.get("window").width;

const AddCartDialog = (props: AddCartDialogProps) => {
  const [amount, setAmount] = useState(1);
  const { onAddCartProduct } = useCart();

  const addCartProduct = async () => {
    const res = await onAddCartProduct(props.product._id, amount);
    if (res.succeeded) {
      props.setShowDialog(false);
    } else {
      props.showError(res);
    }
  };

  return (
    <Modal
      style={{ margin: 0, justifyContent: "flex-end" }}
      animationIn={"fadeInUp"}
      animationOut={"fadeOutDown"}
      onSwipeComplete={() => props.setShowDialog(false)}
      swipeDirection={"down"}
      // ref={modalRef}
      isVisible={props.showDialog}
      deviceWidth={SCREEN_WIDTH}
      statusBarTranslucent={true}
      coverScreen={true}
      onBackdropPress={() => props.setShowDialog(false)}
      onBackButtonPress={() => props.setShowDialog(false)}
    >
      <View style={styles.centeredView}>
        <View style={{ flexDirection: "row", paddingHorizontal: 30 }}>
          <Image
            source={images.productHolder}
            style={{ width: 80, height: 80 }}
          />
          <View
            style={{ justifyContent: "space-between", marginLeft: 30, flex: 1 }}
          >
            <AppText style={styles.txtTitle} numberOfLines={2}>
              {props.product.ProductName}
            </AppText>
            <View style={{ marginVertical: 5 }}>
              <AppText style={[styles.txtTitle, { color: "#F28230" }]}>
                {formatVndPrice(props.product.Price)}
              </AppText>
            </View>
            <View style={styles.amount}>
              <TouchableOpacity
                onPress={() =>
                  setAmount((prev: any) => {
                    if (prev != 1) {
                      return prev - 1;
                    } else {
                      return prev;
                    }
                  })
                }
                style={styles.plus}
              >
                <AppText>-</AppText>
              </TouchableOpacity>
              <View style={styles.viewAmount}>
                <AppText>{amount}</AppText>
              </View>
              <TouchableOpacity
                style={styles.plus}
                onPress={() => setAmount((prev) => prev + 1)}
              >
                <AppText>+</AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.buttonView}>
          <AppButton
            onPress={() => addCartProduct()}
            title={"Thêm vào giỏ hàng"}
            buttonStyle={styles.buttonAddToCartContainer}
            customBtnStyle={{ borderRadius: 0 }}
          />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "white",
    paddingTop: 30,
    paddingBottom: 20,
  },
  txtTitle: {
    fontSize: Mixin.moderateSize(14),
    fontWeight: "500",
    color: "black",
  },
  amount: {
    flexDirection: "row",
    marginTop: 2,
    alignItems: "center",
    // backgroundColor:'red'
  },
  viewAmount: {
    width: 40,
    height: 20,
    borderColor: "#B9B9B9",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  plus: {
    height: 20,
    width: 25,
    borderColor: "#B9B9B9",
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonView: {
    paddingTop: 8,
    paddingHorizontal: 8,
    borderColor: "#D9D9D9",
    marginTop: 20,
  },
  buttonAddToCartContainer: {
    marginTop: 0,
    height: 50,
    borderRadius: 0,
  },
});

export default AddCartDialog;
