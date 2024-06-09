// @ts-ignore
import { HijamaListRequest, HijamaCreateRequest, HijamaUpdateRequest,DeleteHijamaImage, CreateHijamaImage } from "@/types/hijama";
import { FetchData } from "@/utils/fetch-utils";
import config from "@/config";
import store from '../../store';
import axios, { AxiosRequestConfig } from 'axios';
export default class HijamaService {

  private genericErrorMessage =
    "Connection to the network failed. Please contact our support team example@example.com.";

    public CreateHijama(payload: HijamaCreateRequest): Promise<any> {
      const token = localStorage.getItem('token');
      const url = config.authUrl + "/hijama";
      return axios.post(url,{
        title: payload.title,
        description: payload.description,
        icon: payload.icon,
        banner: payload.banner,
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
    public UpdateHijama(payload: HijamaUpdateRequest): Promise<any> {
      const token = localStorage.getItem('token');
      var ID = payload.id
      const url = config.authUrl + "/hijama/" +ID;
      return axios.put(url,{
        title: payload.title,
        description: payload.description,
        icon: payload.icon,
        banner: payload.banner,
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

  public listOfHijama(payload: HijamaListRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        perPage: payload.perPage,
        page: payload.page,
      };
      const url = config.authUrl + "/hijama";
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

  public GetHijamaView(payload: string) {
    return new Promise((resolve, reject) => {
      const params = {
        packageId: payload,
      };
      const url = config.authUrl + "/hijama/"+payload;
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
   public RemoveHijama(payload: string) {
    return new Promise((resolve, reject) => {
      const params = {
        packageId: payload,
      };
      const url = config.authUrl + "/hijama/"+payload;
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
   public RemoveHijamaImage(payload: DeleteHijamaImage) {
    return new Promise((resolve, reject) => {
      const params = {
        hijamaId: payload.hijamaId,
        imageId:payload.imageId
      };
      const url = config.authUrl + "/hijama/"+payload.hijamaId+"/image/"+payload.imageId;
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



