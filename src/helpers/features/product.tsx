import ProductService from "../../services/ProductService";
import { useAppSelector, useBaseHook } from "../hookHelper";

export const useProduct = () => {
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const { showLoading, hideLoading } = useBaseHook();

  const onGetAllProduct = async () => {
    showLoading();
    const res = await ProductService.getAllProduct();
    hideLoading();
    return res;
  };

  const onGetProductDetail = async (productId: string) => {
    showLoading();
    const res = await ProductService.getProductDetail(productId);
    hideLoading();
    return res;
  };

  const onGetAllCategory = async () => {
    showLoading();
    const res = await ProductService.getAllCategory();
    hideLoading();
    return res;
  };

  const onGetProductByCategory = async (categoryId: string) => {
    showLoading();
    const res = await ProductService.getProductByCategory(categoryId);
    hideLoading();
    return res;
  };

  const onSearchProductByName = async (productName: string) => {
    showLoading();
    const res = await ProductService.searchProductByName(productName);
    hideLoading();
    return res;
  }

  const onSearchProductByBrand = async (brandName: string) => {
    showLoading();
    const res = await ProductService.searchProductByBrand(brandName);
    hideLoading();
    return res;
  }

  const onSearchProductByPrice = async (min: string, max: string) => {
    showLoading();
    const res = await ProductService.searchProductByPrice(min, max);
    hideLoading();
    return res;
  }

  return {
    onGetAllProduct,
    onGetProductDetail,
    onGetAllCategory,
    onGetProductByCategory,
    onSearchProductByName,
    onSearchProductByBrand,
    onSearchProductByPrice
  };
};
