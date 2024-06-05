import { ILoginRequest } from "../../model/auth/ILogin";
import { IRegisterRequest } from "../../model/auth/IRegister";
import { IUserInfo } from "../../model/user/IUser";
import AuthenticationService from "../../services/AuthenticationService";
import UserService from "../../services/UserService";
import { useAppSelector, useBaseHook } from "../hookHelper";

export const useUser = () => {
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const { showLoading, hideLoading } = useBaseHook();

  const onUpdateUser = async (
    email: string,
    fullName: string,
    phoneNumber: string,
    _id: string
  ) => {
    showLoading();
    const params: IUserInfo = {
      Email: email,
      FullName: fullName,
      PhoneNumber: phoneNumber,
      _id: _id
    };
    const response = await UserService.updateUser(params);
    hideLoading();
    return response;
  };

  const onGetUser = async (userId: string) => {
    showLoading();
    const response = await UserService.getUser(userId);
    hideLoading();
    return response;
  };

  const onChangePassword = async (oldPassword: string, newPassword: string) => {
    showLoading();
    const params = {
      oldPassword,
      newPassword,
    };
    const response = await UserService.changePassword(params, authenticationReducer.userInfo?._id || "");
    hideLoading();
    return response;
  }

  return {
    onUpdateUser,
    onGetUser,
    onChangePassword
  };
};
