import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

import AppInput from "../../components/atoms/AppInput";
import AppText from "../../components/atoms/AppText";
import AppButton from "../../components/atoms/Button";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import { HookHelper } from "../../helpers";
import { useAuth } from "../../helpers/features/auth";
import { useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";

export const RegisterScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { navigation } = useGetNavigation();

  const [emailString, setEmailtring] = useState("");
  const [nameString, setNameString] = useState("");
  const [phoneString, setPhoneString] = useState("");
  const [passwordString, setPasswordString] = useState("");
  const [confirmPasswordString, setConfirmPasswordString] = useState("");

  const styles = useStyles(theme);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState<{ title: string; description?: string }>();
  const { onRegister } = useAuth();

  const onNext = async () => {
    if (!validatePhone(phoneString)) {
      setError({
        title: "Số điện thoại không hợp lệ",
        description: "Số điện thoại phải có từ 9 đến 10 chữ số",
      });
      setShowError(true);
      return;
    }

    if (!validatePassword(passwordString, confirmPasswordString)) {
      setError({
        title: "Mật khẩu không khớp",
        description: "Mật khẩu và xác nhận mật khẩu phải giống nhau",
      });
      setShowError(true);
      return;
    }
    // dispatch(AuthenticationActions.setAccountNumber.request("phoneString"));
    const response = await onRegister({
      Email: emailString,
      FullName: nameString,
      PhoneNumber: phoneString,
      Password: passwordString,
    });
    if (response.succeeded) {
      navigation.navigate("Login");
    } else {
      setTimeout(() => {
        setShowError(true);
        setError({
          title: "Lỗi",
          description: response.error?.message || "Something went wrong",
        });
      }, 200);
    }
  };
  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{9,10}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <AppText style={styles.title}>Tạo tài khoản</AppText>
        <AppText style={styles.unregisterText}>
          Sử dụng app ngay hôm nay
        </AppText>
        <View style={styles.inputContainer}>
          <AppText style={styles.inputLabel}>Email</AppText>
          <AppInput
            label={"Nhập Email"}
            value={emailString}
            onChangeText={(text) => setEmailtring(text)}
            containerStyles={styles.inputStyle}
          />
        </View>
        <View style={styles.inputContainer}>
          <AppText style={styles.inputLabel}>Tên đầy đủ</AppText>
          <AppInput
            label={"Nhập tên đầy đủ"}
            value={nameString}
            onChangeText={(text) => setNameString(text)}
            containerStyles={styles.inputStyle}
          />
        </View>
        <View style={styles.inputContainer}>
          <AppText style={styles.inputLabel}>Số điện thoại</AppText>
          <AppInput
            label={"Nhập số điện thoại"}
            value={phoneString}
            maxLength={10}
            onChangeText={(text) => setPhoneString(text)}
            containerStyles={styles.inputStyle}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <AppText style={styles.inputLabel}>Mật khẩu</AppText>
          <AppInput
            label={"Nhập mật khẩu"}
            value={passwordString}
            maxLength={100}
            isPassword
            keyboardType="default"
            onChangeText={(text) => setPasswordString(text)}
            containerStyles={styles.inputStyle}
          />
        </View>
        <View style={styles.inputContainer}>
          <AppText style={styles.inputLabel}>Xác nhận mật khẩu</AppText>
          <AppInput
            label={"Nhập lại mật khẩu"}
            value={confirmPasswordString}
            maxLength={100}
            isPassword
            keyboardType="default"
            onChangeText={(text) => setConfirmPasswordString(text)}
            containerStyles={styles.inputStyle}
          />
        </View>
      </View>

      <AppButton
        title={"Đăng ký"}
        onPress={() => onNext()}
        customBtnStyle={styles.buttonStyle}
      />
      <View style={styles.registerContainer}>
        <AppText style={styles.unregisterText}>Đã có tài khoản </AppText>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <AppText style={styles.primaryText}>Đăng nhập ngay</AppText>
        </TouchableOpacity>
      </View>
      <ErrorModal
        confirmTitle={"Try again"}
        onConfirm={() => tryAgain()}
        isVisible={showError}
        title={error?.title || ""}
        description={error?.description}
      />
    </ScrollView>
  );
};
