import {ReduxHelper} from '../../helpers';
import { ILoginResponse } from '../../model/auth/ILogin';

export const prefix = 'AUTHENTICATION';

export const setAccountNumber = ReduxHelper.generateLocalAction<string>(
  prefix,
  'SET_ACCOUNT_NUMBER',
);
export const setAccessToken = ReduxHelper.generateLocalAction<string>(
  prefix,
  'SET_ACCESS_TOKEN',
);
export const setAuthenticationData =
  ReduxHelper.generateLocalAction<ILoginResponse>(
    prefix,
    'SET_AUTHENTICATION_DATA',
  );

export const logout = ReduxHelper.generateActions<undefined>(prefix, 'LOGOUT');

