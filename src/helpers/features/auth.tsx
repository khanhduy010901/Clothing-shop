import { ILoginRequest } from "../../model/auth/ILogin";
import { IRegisterRequest } from "../../model/auth/IRegister";
import AuthenticationService from "../../services/AuthenticationService";
import { useAppSelector, useBaseHook } from "../hookHelper";

export const useAuth = () => {
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const { showLoading, hideLoading } = useBaseHook();

  const onLogin = async (email: string, password: string) => {
    showLoading();
    const params: ILoginRequest = {
      Email: email,
      Password: password,
    };
    const loginResponse = await AuthenticationService.login(params);
    hideLoading();
    return loginResponse;
  };

  const onRegister = async (dataRegister: IRegisterRequest) => {
    showLoading();
    const requestRegisterResponse = await AuthenticationService.register(
      dataRegister
    );
    hideLoading();
    return requestRegisterResponse;
  };

  return {
    onLogin,
    onRegister,
  };
};
