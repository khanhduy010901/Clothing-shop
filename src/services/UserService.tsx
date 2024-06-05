import { ILoginResponse } from "../model/auth/ILogin";
import { IChangePasswordRequest } from "../model/user/IPassword";
import { IUserInfo } from "../model/user/IUser";
import { BaseApiService } from "./BaseApiService";
const url = "/u";
class UserService extends BaseApiService {
  public updateUser = (body: IUserInfo) =>
    this.put<IUserInfo, any>(`${url}/updateUser/${body._id}`, body);
  public getUser = (userId: string) =>
    this.get<ILoginResponse>(`${url}/${userId}`);
  public changePassword = (body: IChangePasswordRequest, userId: string) =>
    this.post<IChangePasswordRequest, any>(`${url}/changePassword/${userId}`, body);
}

export default new UserService(false);
