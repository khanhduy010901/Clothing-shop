import {IBaseRequest} from './IBaseRequest';

export interface IPaginationRequest extends IBaseRequest {
  PageSize: number;
  PageIndex: number;
}
