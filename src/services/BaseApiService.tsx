import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import _ from "lodash";
import qs from "qs";
import configureStore from "../stores/configurations/configureStore";
import { AuthenticationActions } from "../stores/actions";
import { BASE_API_URL } from "../utils/Const";
import { IBaseResponse } from "../model/IBaseResponse";

export interface IApiResponse<T = void> {
  data?: T;
  header?: any;
  errors?: any;
  succeeded: boolean;
  failed?: boolean;
  error?: IApiError;
}
export interface IApiError {
  code?: string | number;
  message: string;
}
export interface IErrorResponse {
  error: string;
  error_description: string;
  error_uri: string;
}

interface IApiRequestConfig extends AxiosRequestConfig {
  unProtected?: boolean;
}
const API_CONFIG: AxiosRequestConfig = {
  // returnRejectedPromiseOnError: true,
  // withCredentials: true,
  timeout: 60000, //
  baseURL: BASE_API_URL,
  headers: {
    "Content-type": "application/json",
    "accept-language": "en-Us",
    // timeOffset: Math.round(moment().utcOffset() / 60),
    accept: "*/*",
  },
  paramsSerializer: (params: any) => qs.stringify(params, { indices: false }),
};
export abstract class BaseApiService {
  private instance: AxiosInstance;
  private protectedApi: boolean;
  private controller = new AbortController();
  constructor(protectedApi = true) {
    this.instance = axios.create(API_CONFIG);
    this.protectedApi = protectedApi;
    this.instance.interceptors.request.use(this._handleRequest);
    this.instance.interceptors.response.use(
      (response) => {        
        return response;
      },
      (error) => {
        console.log("ASSADSDAA", error, BASE_API_URL);
        if (error.response.status === 410) {
          const store = configureStore().store;
          if (store.getState().AuthenticationReducer.userInfo) {
            store.dispatch(AuthenticationActions.kickedOut.request());
          }
        }
        if (error.response.status === 401) {
          const store = configureStore().store;
          if (store.getState().AuthenticationReducer.userInfo) {
            store.dispatch(AuthenticationActions.logout.request());
          }
        }
        console.log("ASSADSDAA", error.response.status, error.response);        
        throw new Error(error.response.data.msg);
      }
    );
  }
  private getAccessToken = () => {
    const store = configureStore().store;
    const authenticationReducer = store.getState().AuthenticationReducer;

    return `${authenticationReducer.accessToken}`;
  };
  private _handleRequest = (config: IApiRequestConfig): IApiRequestConfig => {
    try {
      const authorizationKey = this.getAccessToken();
      if (
        this.protectedApi &&
        !config.unProtected
      ) {
        this.controller.abort();
        const CancelToken = axios.CancelToken;
        return {
          ...config,
          cancelToken: new CancelToken((cancel) => cancel("Protected API")),
        };
      }
      if (authorizationKey != undefined) {
        config.headers!.Authorization = "Bearer " + authorizationKey!;
      }
            
      return config;
    } catch (error) {
      throw new Error(error as string);
    }
  };
  private _handleResponse<T extends IBaseResponse>(
    response: AxiosResponse<T | IErrorResponse>
  ): IApiResponse<T> {
    
    if (response.status === 200) {
      const data = response.data as T;
      if (data.code === "MSG_SUCCESS") {
        return {
          data: data.data,
          header: response.headers,
          succeeded: true,
        };
      } else {
        return {
          data: data.data,
          header: response.headers,
          succeeded: true,
          failed: true,
        };
      }
    }

    const error = response.data as IErrorResponse;        
    return {
      succeeded: false,
      error: {
        message: error.error_description,
      },
    };
  }

  private _handleError<T extends IBaseResponse>(
    errorMess: string
  ): IApiResponse<T> {    
    const data = {
      message: errorMess,
    } as T;

    return {
      succeeded: false,
      failed: true,
      error: {
        message: errorMess,
      },
      data,
    };
  }

  convertFormData(data: any) {
    var formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    return formData;
  }

  public async getToken() {
    return "";
  }
 

  public async get<T extends IBaseResponse>(
    url: string,
    config?: IApiRequestConfig
  ) {
    try {
     
      const formConfig: IApiRequestConfig = {
        ...config,
        headers: {
          ...config?.headers,
        },
      };
      const response = await this.instance.get<T>(`${url}`, formConfig);
      console.log("url", url, response);
      return this._handleResponse<T>(response);
    } catch (error: any) {      
      return this._handleError<T>(error.message.toString());
    }
  }
  public async post<P, T extends IBaseResponse>(
    url: string,
    data?: P,
    config?: IApiRequestConfig
  ) {
    try {
      const formConfig: IApiRequestConfig = {
        ...config,
        headers: {
          ...config?.headers,
        },
      };
      const response = await this.instance.post<T>(`${url}`, data, formConfig);
      console.log("url", url, response);
      return this._handleResponse<T>(response);
    } catch (error: any) {
      return this._handleError<T>(error.message.toString());
    }
  }
  public async put<P, T extends IBaseResponse>(
    url: string,
    data?: P,
    config?: IApiRequestConfig
  ) {
    try {
      const formConfig: IApiRequestConfig = {
        ...config,
        headers: {
          ...config?.headers,
        },
      };
      const response = await this.instance.put<T>(`${url}`, data, formConfig);
      return this._handleResponse<T>(response);
    } catch (error) {}
  }
  public async delete<T extends IBaseResponse>(
    url: string,
    config?: IApiRequestConfig
  ) {
    try {
      const formConfig: IApiRequestConfig = {
        ...config,
        headers: {
          ...config?.headers,
        },
      };
      const response = await this.instance.delete<T>(`${url}`, formConfig);
      return this._handleResponse<T>(response);
    } catch (error: any) {
      return this._handleError<T>(error.message.toString());
    }
  }
  public async postForm<P, T extends IBaseResponse>(
    url: string,
    data?: P,
    config?: IApiRequestConfig
  ) {
    try {
      const formConfig: IApiRequestConfig = {
        ...config,
        headers: {
          ...config?.headers,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      const formData = this.convertFormData(data);
      const response = await this.instance.post<T>(
        `${url}`,
        formData,
        formConfig
      );
      return this._handleResponse<T>(response);
    } catch (error: any) {
      return this._handleError<T>(error.message.toString());
    }
  }
}
