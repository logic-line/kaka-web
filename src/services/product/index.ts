// @ts-ignore
import { ProductListRequest, ProductCreateRequest, ProductUpdateRequest, DeleteProductImage } from "@/types/category";
import { FetchData } from "@/utils/fetch-utils";
import config from "@/config";
import store from '../../store';
import axios, { AxiosRequestConfig } from 'axios';
export default class ProductService {

  private genericErrorMessage =
    "Connection to the network failed. Please contact our support team example@example.com.";

    public CreateProduct(payload: ProductCreateRequest): Promise<any> {
      const token = localStorage.getItem('token');
      const url = config.authUrl + "/product";
      return axios.post(url,{
        title: payload.title,
        description: payload.description,
        icon: payload.icon,
        banner: payload.banner,
        product_category_id:payload.product_category_id,
        base_price:payload.base_price,
        price:payload.price,
        stock:payload.stock,
        offer_message:payload.offer_message,
        offer_applicable:payload.offer_applicable,
       },{
        headers : { 
          'Authorization':'Bearer '+token,
          "X-API-KEY": config.apiKey,
          'Content-Type': 'application/json',
        }
       }) .then(function (response) {
        return(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
      });
    }
    public UpdateProduct(payload: ProductUpdateRequest): Promise<any> {
      const token = localStorage.getItem('token');
      var ID = payload.id
      const url = config.authUrl + "/product/" +ID;
      return axios.put(url,{
        title: payload.title,
        description: payload.description,
        icon: payload.icon,
        banner: payload.banner,
        product_category_id:payload.product_category_id,
        base_price:payload.base_price,
        price:payload.price,
        stock:payload.stock,
        offer_message:payload.offer_message,
        offer_applicable:payload.offer_applicable,
       },{
        headers : { 
          'Authorization':'Bearer '+token,
          "X-API-KEY": config.apiKey,
          'Content-Type': 'application/json',
        }
       }) .then(function (response) {
        return(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
      });
    }

  public listOfProduct(payload: ProductListRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        perPage: payload.perPage,
        page: payload.page,
      };
      const url = config.authUrl + "/product";
      const token = localStorage.getItem('token');
      const headers: AxiosRequestConfig['headers'] = {
        'X-API-KEY': config.apiKey,
        'Authorization': 'Bearer ' + token ,
        'Content-Type': 'application/json',
      };
  
      axios.get(url, { params, headers},)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  public GetProductView(payload: string) {
    return new Promise((resolve, reject) => {
      const params = {
        packageId: payload,
      };
      console.log("config.authUrl",config.authUrl)
      const url = config.authUrl + "/product/"+payload;
      const token = localStorage.getItem('token');
      const headers: AxiosRequestConfig['headers'] = {
        'X-API-KEY': config.apiKey,
        'Authorization': 'Bearer ' + token ,
        'Content-Type': 'application/json',
      };
      axios.get(url, { params, headers},)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
   }
  public GetPackageBookingView(payload: string) {
    return new Promise((resolve, reject) => {
      const params = {
        packageId: payload,
      };
      const url = config.authUrl + "/package/booking/"+payload;
      const token = localStorage.getItem('token');
      const headers: AxiosRequestConfig['headers'] = {
        'X-API-KEY': config.apiKey,
        'Authorization': 'Bearer ' + token ,
        'Content-Type': 'application/json',
      };
      axios.get(url, { params, headers},)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
   }
  public RemoveProduct(payload: string) {
    return new Promise((resolve, reject) => {
      const params = {
        packageId: payload,
      };
      const url = config.authUrl + "/product/"+payload;
      const token = localStorage.getItem('token');
      const headers: AxiosRequestConfig['headers'] = {
        'X-API-KEY': config.apiKey,
        'Authorization': 'Bearer ' + token ,
        'Content-Type': 'application/json',
      };
      axios.delete(url, { params, headers},)
        .then(function (response) {
          console.log(response)
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
   }
   public RemoveProductImage(payload: DeleteProductImage) {
    return new Promise((resolve, reject) => {
      const params = {
        productId: payload.productId,
        imageId:payload.imageId
      };
      const url = config.authUrl + "/product/"+payload.productId+"/image/"+payload.imageId;
      const token = localStorage.getItem('token');
      const headers: AxiosRequestConfig['headers'] = {
        'X-API-KEY': config.apiKey,
        'Authorization': 'Bearer ' + token ,
        'Content-Type': 'application/json',
      };
      axios.delete(url, { params, headers},)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
   }
  
  

}



