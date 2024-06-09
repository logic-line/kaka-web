// @ts-ignore
import { CategoryListRequest, CategoryCreateRequest, CategoryUpdateRequest,PackageBookingListRequest,BookingStatusUpdateRequest } from "@/types/category";
import { FetchData } from "@/utils/fetch-utils";
import config from "@/config";
import store from '../../store';
import axios, { AxiosRequestConfig } from 'axios';
export default class CategoryService {

  private genericErrorMessage =
    "Connection to the network failed. Please contact our support team example@example.com.";

    public CreateCategory(payload: CategoryCreateRequest): Promise<any> {
      const token = localStorage.getItem('token');
      const url = config.authUrl + "/product/category";
      return axios.post(url,{
        title: payload.title,
        description: payload.description,
        icon: payload.icon,
        banner: payload.banner,
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
    public UpdateCategory(payload: CategoryUpdateRequest): Promise<any> {
      const token = localStorage.getItem('token');
      var ID = payload.id
      const url = config.authUrl + "/product/category/" +ID;
      return axios.put(url,{
        title: payload.title,
        description: payload.description,
        icon: payload.icon,
        banner: payload.banner,
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

  public listOfCategory(payload: CategoryListRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        perPage: payload.perPage,
        page: payload.page,
      };
      const url = config.authUrl + "/product/category";
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

  public GetCategoryView(payload: string) {
    return new Promise((resolve, reject) => {
      const params = {
        packageId: payload,
      };
      const url = config.authUrl + "/product/category/"+payload;
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
  public RemoveCategory(payload: string) {
    return new Promise((resolve, reject) => {
      const params = {
        packageId: payload,
      };
      const url = config.authUrl + "/product/category/"+payload;
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
   public listOfBookingPackage(payload: PackageBookingListRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        perPage: payload.perPage,
        page: payload.page,
      };
      const url = config.authUrl + "/package/booking";
      const token = localStorage.getItem('token');
      const headers: AxiosRequestConfig['headers'] = {
        'X-API-KEY': config.apiKey,
        'Authorization': 'Bearer ' + token ,
        'Content-Type': 'application/json',
      };
  
      axios.get(url, { params, headers},)
        .then(function (response) {
          console.log(response)
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }
  public ChangeStatus(payload: BookingStatusUpdateRequest): Promise<any> {
    const token = localStorage.getItem('token');
    var bookingid = payload.bookingId
    const url = config.authUrl + "/package/booking/"+bookingid;
    return axios.put(url,{
      status:payload.status,
      bookingId:payload.bookingId,
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
    })
    .finally(function () {
    });
  }

}



