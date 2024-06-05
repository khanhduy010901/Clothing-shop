import React, { useEffect, useState } from "react";

import { Image, TouchableOpacity, View } from "react-native";
// import ImagePicker from 'react-native-image-crop-picker';
// import {
//   PERMISSIONS,
//   RESULTS,
//   openSettings,
//   request,
// } from 'react-native-permissions';
import { images } from "../../../assets";
import AppText from "../../components/atoms/AppText";
import Container from "../../components/atoms/Container";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import AppHeader from "../../components/atoms/Header";
import ItemProfile from "../../components/modules/ItemProfile";
import { HookHelper } from "../../helpers";
import { useAppSelector, useGetNavigation } from "../../helpers/hookHelper";
import { AuthenticationActions } from "../../stores/actions";
import useStyles from "./styles";

export const ProfileScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const { navigation } = useGetNavigation();
  const userInfo = useAppSelector(
    (state) => state.AuthenticationReducer.userInfo
  );

  const avatar = useAppSelector((state) => state.UserReducer.avatar);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState<{ title: string; description?: string }>();
  const styles = useStyles(theme);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {};

  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => {}}>
          <Image
            resizeMode="cover"
            source={avatar ? avatar : images.avatar}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <AppText style={styles.accountName}>{userInfo?.FullName}</AppText>
        <AppText style={styles.accountNumber}>{userInfo?.PhoneNumber}</AppText>
      </View>
    );
  };

  const renderMenu = () => {
    return (
      <View style={styles.menuContainer}>
        <ItemProfile
          icon={images.profileIcon}
          title={"Cập nhật thông tin cá nhân"}
          onPress={() => navigation.navigate("UpdateProfile")}
        />
        <ItemProfile
          icon={images.profileIcon}
          title={"Đổi mật khẩu"}
          onPress={() => navigation.navigate("ChangePassword")}
        />
        <ItemProfile
          icon={images.passwordIcon}
          title={"Đơn hàng"}
          onPress={() => navigation.navigate("OrderList")}
        />
        <ItemProfile
          icon={images.logoutIcon}
          title={"Đăng xuất"}
          onPress={() =>
            dispatch(AuthenticationActions.logout.request())
          }
        />
      </View>
    );
  };

  return (
    <Container scrollEnabled={false}>
      <AppHeader title={"Tài khoản"} shadow hideBack />
      <View style={{ width: "100%" }}>
        {renderHeader()}
        {renderMenu()}
      </View>

      <ErrorModal
        confirmTitle={"Try again"}
        onConfirm={() => tryAgain()}
        isVisible={showError}
        title={error?.title || ""}
        description={error?.description}
      />
    </Container>
  );
};
