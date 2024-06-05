import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import AppInput from "../../components/atoms/AppInput";
import AppButton from "../../components/atoms/Button";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import AppHeader from "../../components/atoms/Header";
import { HookHelper } from "../../helpers";
import { useUser } from "../../helpers/features/user";
import { useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";

export const ChangePasswordScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();

  const styles = useStyles(theme);
  const { navigation } = useGetNavigation();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showError, setShowError] = useState(false);
  const [error, setError] = useState<{ title: string; description?: string }>();
  const { onChangePassword } = useUser();

  const updatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setShowError(true);
      setError({ title: "Mật khẩu không khớp" });
      return;
    }
    const res = await onChangePassword(oldPassword, newPassword);
    if (res?.succeeded) {
      navigation.goBack();
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
        title={"Thay đổi mật khẩu"}
        shadow
        textStyles={{ fontSize: 22 }}
      />
      <ScrollView style={styles.container}>
        <AppInput
          label={"Mật khẩu cũ"}
          value={oldPassword}
          maxLength={100}
          keyboardType="default"
          isPassword
          onChangeText={(text) => setOldPassword(text)}
          style={styles.inputText}
          labelStyle={styles.inputText}
          containerStyles={styles.inputContainer}
        />
        <AppInput
          label={"Mật khẩu mới"}
          value={newPassword}
          maxLength={100}
          keyboardType="default"
          isPassword
          onChangeText={(text) => setNewPassword(text)}
          style={styles.inputText}
          labelStyle={styles.inputText}
          containerStyles={styles.inputContainer}
        />
        <AppInput
          label={"Nhập lại mật khẩu mới"}
          value={confirmPassword}
          maxLength={100}
          keyboardType="default"
          isPassword
          onChangeText={(text) => setConfirmPassword(text)}
          style={styles.inputText}
          labelStyle={styles.inputText}
          containerStyles={styles.inputContainer}
        />

        <View style={styles.buttonContainer}>
          <AppButton title={"Đổi mật khẩu"} onPress={() => updatePassword()} />
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
