import { ReduxHelper } from "../../helpers";

export const prefix = 'USER';

export const setAvatar = ReduxHelper.generateLocalAction<string>(
  prefix,
  'SET_AVATAR',
);

export const setQr = ReduxHelper.generateLocalAction<string>(
  prefix,
  'SET_QR',
);
