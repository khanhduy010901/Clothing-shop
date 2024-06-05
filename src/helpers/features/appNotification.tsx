import { useEffect, useState } from "react";
import { showMessage, hideMessage } from "react-native-flash-message";

export const useGetFirebaseToken = () => {
  // const [token, setToken] = useState<string | undefined>(undefined);
  // const [doneToken, setDoneToken] = useState(false);
  // const { enabled } = useGetNotificationPermission();

  const getToken = async () => {
    return "";
  };

  return { getToken };
};

export const useNotification = () => {
  const showNotification = async (
    title: string,
    body: string,
    onPress?: () => void
  ) => {
    showMessage({
      message: title,
      description: body,
      onPress: () => {
        onPress && onPress();
      },
    });
  };

  return { showNotification };
};


