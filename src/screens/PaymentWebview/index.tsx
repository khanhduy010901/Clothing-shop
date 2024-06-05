import { useState } from "react";

import { View } from "react-native";
import WebView from "react-native-webview";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import { HookHelper } from "../../helpers";
import { useAppSelector, useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";

export const PaymentWebviewScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const { route, navigation } = useGetNavigation<"PaymentWebview">();
  const styles = useStyles(theme);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState<{ title: string; description?: string }>();

  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };

  return (
    <View style={styles.container}>
      <WebView style={styles.container} source={{ uri: route.params?.webUrl }} />
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
