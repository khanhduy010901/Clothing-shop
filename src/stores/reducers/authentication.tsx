import {PayloadAction} from '@reduxjs/toolkit';
import {
  IBaseReducerState,
  createHandleReducer,
} from '../../helpers/reduxHelpers';
import {AuthenticationActions} from '../actions';
import {IUserInfo} from '../../model/user/IUser';
import {ILoginResponse} from '../../model/auth/ILogin';

interface IAuthenticationState extends IBaseReducerState {
  userInfo?: IUserInfo;
  accountNumber?: string;
  accessToken?: string;
  loginToken?: string;
}

const initialState: IAuthenticationState = {
  accessToken: undefined,
};
const setAuthenticationData = (
  state: IAuthenticationState,
  action: PayloadAction<ILoginResponse>,
) => {
  const {payload} = action;
  state.userInfo = {
    Email: payload.Email,
    FullName: payload.FullName,
    PhoneNumber: payload.PhoneNumber,
    RegistrationDate: payload.RegistrationDate,
    _id: payload._id,
  };
  state.accessToken = payload._id;
};

const logOut = (state: IAuthenticationState) => {
  state.userInfo = undefined;
  state.loginToken = undefined;
  state.accessToken = undefined;
  state.accountNumber = undefined;
};

const setAccessToken = (state: IAuthenticationState, action: PayloadAction<string>) => {
  state.accessToken = action.payload;
}



const AuthenticationReducer = createHandleReducer(initialState, builder => {
  builder
    .addCase(
      AuthenticationActions.setAuthenticationData.request,
      setAuthenticationData,
    )
    .addCase(AuthenticationActions.logout.request, logOut)
    .addCase(
      AuthenticationActions.setAccountNumber.request,
      (state: IAuthenticationState, action: PayloadAction<string>) => {
        state.accountNumber = action.payload;
      },
    )
    .addCase(AuthenticationActions.setAccessToken.request, setAccessToken);
});

export default AuthenticationReducer;
