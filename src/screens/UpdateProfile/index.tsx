import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import AppInput from "../../components/atoms/AppInput";
import AppButton from "../../components/atoms/Button";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import AppHeader from "../../components/atoms/Header";
import { HookHelper } from "../../helpers";
import { useAppSelector, useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";
import { AuthenticationActions } from "../../stores/actions";
import { useUser } from "../../helpers/features/user";

export const UpdateProfileScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const userInfo = useAppSelector(
    (state) => state.AuthenticationReducer.userInfo
  );
  const styles = useStyles(theme);
  const { navigation } = useGetNavigation();

  const [email, setEmail] = useState(userInfo?.Email || "");
  const [phoneNumber, setPhoneNumber] = useState(userInfo?.PhoneNumber || "");
  const [fullName, setFullName] = useState(userInfo?.FullName || "");
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState<{ title: string; description?: string }>();
  const { onUpdateUser, onGetUser } = useUser();

  const updateProfile = async () => {
    const res = await onUpdateUser(
      email,
      fullName,
      phoneNumber,
      userInfo?._id || ""
    );
    if (res?.succeeded) {
      getProfile();
      navigation.goBack();
    } else {
      setShowError(true);
      setError({ title: res?.error?.message || "An error occured" });
    }
  };

  const getProfile = async () => {
    const res = await onGetUser(userInfo?._id || "");
    if (res?.succeeded && res.data) {
      dispatch(AuthenticationActions.setAuthenticationData.request(res.data));
    } else {
      setShowError(true);
      setError({ title: res?.error?.message || "An error occured" });
    }
  };

  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };
  return (
    <View style={styles.viewContainer}>
      <AppHeader
        title={"Update Profile"}
        shadow
        textStyles={{ fontSize: 22 }}
      />
      <ScrollView style={styles.container}>
        <AppInput
          label={"Số điện thoại"}
          value={phoneNumber}
          maxLength={100}
          keyboardType="number-pad"
          onChangeText={(text) => setPhoneNumber(text)}
          style={styles.inputText}
          labelStyle={styles.inputText}
          containerStyles={styles.inputContainer}
        />
        <AppInput
          label={"Tên đầy đủ"}
          value={fullName}
          maxLength={100}
          keyboardType="default"
          onChangeText={(text) => setFullName(text)}
          style={styles.inputText}
          labelStyle={styles.inputText}
          containerStyles={styles.inputContainer}
        />
        <AppInput
          label={"Email"}
          value={email}
          maxLength={100}
          keyboardType="default"
          onChangeText={(text) => setEmail(text)}
          style={styles.inputText}
          labelStyle={styles.inputText}
          containerStyles={styles.inputContainer}
        />

        <View style={styles.buttonContainer}>
          <AppButton title={"Cập nhật"} onPress={() => updateProfile()} />
        </View>
      </ScrollView>
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
