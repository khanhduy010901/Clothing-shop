import { IListCategoryResponse } from "../model/product/ICategory";
import {
  IListProductResponse,
  IProductResponse,
} from "../model/product/IProduct";
import { BaseApiService } from "./BaseApiService";
const url = "/product";
class ProductService extends BaseApiService {
  public getAllProduct = () => this.get<IListProductResponse>(`${url}/getAll`);
  public getProductDetail = (productId: string) =>
    this.get<IProductResponse>(`${url}/${productId}`);
  public getAllCategory = () =>
    this.get<IListCategoryResponse>(`/category/getAll`);
  public getProductByCategory = (categoryId: string) =>
    this.get<IListProductResponse>(`${url}/category/${categoryId}`);
  public searchProductByName = (productName: string) =>
    this.get<IListProductResponse>(`${url}/search/name/${productName}`);
  public searchProductByBrand = (brandName: string) =>
    this.get<IListProductResponse>(`${url}/search/brand/${brandName}`);
  public searchProductByPrice = (min: string, max: string) =>
    this.get<IListProductResponse>(
      `${url}/search/price/?min=${min}&max=${max}`
    );
}

export default new ProductService(false);
