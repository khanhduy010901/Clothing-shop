
import { ILoginRequest, ILoginResponse } from '../model/auth/ILogin';
import { IRegisterRequest, IRegisterResponse } from '../model/auth/IRegister';
import {BaseApiService} from './BaseApiService';
const url = '/u';
class AuthenticationService extends BaseApiService {
  public login = (body: ILoginRequest) =>
    this.post<ILoginRequest, ILoginResponse>(`${url}/login`, body);
  public register = (body: IRegisterRequest) =>
    this.post<IRegisterRequest, IRegisterResponse>(`${url}/register`, body);
}

export default new AuthenticationService(false);
