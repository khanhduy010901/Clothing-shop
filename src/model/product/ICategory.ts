import { IBaseResponse } from "../IBaseResponse";

export interface IListCategoryResponse extends IBaseResponse {
    data: ICategory[];
}

export interface ICategory {
    _id: string;
    CategoryName: string;
}