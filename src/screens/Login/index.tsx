import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

import AppInput from "../../components/atoms/AppInput";
import AppButton from "../../components/atoms/Button";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import { HookHelper } from "../../helpers";
import { useAppSelector, useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";
import AppText from "../../components/atoms/AppText";
import { AppCheckBox } from "../../components/atoms/AppCheckBox";
import { useAuth } from "../../helpers/features/auth";
import { AuthenticationActions } from "../../stores/actions";

export const LoginScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { navigation } = useGetNavigation();

  const [emailString, setEmailString] = useState("");
  const [passwordString, setPasswordString] = useState("");
  const [savePassword, setSavePassword] = useState(false);
  const styles = useStyles(theme);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState<{ title: string; description?: string }>();
  const { onLogin } = useAuth();
  const onNext = async () => {
    try {
      const response = await onLogin(emailString, passwordString);
      if (response.succeeded && response.data) {
        dispatch(
          AuthenticationActions.setAuthenticationData.request(response.data)
        );
      } else {
        setTimeout(() => {
          setShowError(true);
          setError({
            title: "Lỗi",
            description: response.error?.message || "Something went wrong",
          });
        }, 200);
      }
    } catch (error: any) {
      setShowError(true);
      setError({
        title: "Lỗi",
        description: error.message,
      });
    }
  };
  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };

  return (
    <View style={styles.container}>
      <View>
        <AppText style={styles.title}>Xin chào! 👋</AppText>
        <View style={styles.inputContainer}>
          <AppText style={styles.inputLabel}>Email</AppText>
          <AppInput
            label={"Hãy nhập Email"}
            value={emailString}
            onChangeText={(text) => setEmailString(text)}
            containerStyles={styles.inputStyle}
          />
        </View>
        <View style={styles.inputContainer}>
          <AppText style={styles.inputLabel}>Mật khẩu</AppText>
          <AppInput
            label={"Hãy nhập mật khẩu"}
            value={passwordString}
            maxLength={100}
            isPassword
            keyboardType="default"
            onChangeText={(text) => setPasswordString(text)}
            containerStyles={styles.inputStyle}
          />
        </View>
      </View>
      {/* <View style={styles.rowView}>
        <View style={styles.rememberContainer}>
          <AppCheckBox
            isSelected={savePassword}
            setSelection={setSavePassword}
          />
          <AppText>Ghi nhớ đăng nhập</AppText>
        </View>
        <AppText style={styles.forgotText}>Quên mật khẩu</AppText>
      </View> */}
      <AppButton
        title={"Đăng nhập"}
        onPress={() => onNext()}
        customBtnStyle={styles.buttonStyle}
      />
      <View style={styles.registerContainer}>
        <AppText style={styles.unregisterText}>Chưa tạo tại khoản ? </AppText>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <AppText style={styles.primaryText}>Đăng ký ngay</AppText>
        </TouchableOpacity>
      </View>
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
