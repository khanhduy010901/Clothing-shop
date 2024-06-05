import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {
  IBaseReducerState,
  createHandleReducer,
} from '../../helpers/reduxHelpers';
import { UserActions } from '../actions';
interface IUserState extends IBaseReducerState {
  avatar?: string;
  qr?: string;
}

const initialState: IUserState = {};

const setAvatar = (state: IUserState, action: PayloadAction<string>) => {
  state.avatar = action.payload;
};

const setQr = (state: IUserState, action: PayloadAction<string>) => {
  state.qr = action.payload;
};
const UserReducer = createHandleReducer(initialState, builder => {
  builder
    .addCase(UserActions.setAvatar.request, setAvatar)
    .addCase(UserActions.setQr.request, setQr);

});

export default UserReducer;
