import { IBaseResponse } from "../IBaseResponse";
import { ICategory } from "./ICategory";

export interface IListProductResponse extends IBaseResponse {
    data: IProductResponse[]
}

export interface IProductResponse extends IBaseResponse {
    _id: string
    CategoryID: ICategory
    Brand: string
    Description: string
    Price: number
    ProductName: string
    StockQuantity: number
}

