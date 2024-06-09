// @ts-ignore
import { CabListRequest,CabUpdateRequest } from "@/types/cab";
import { FetchData } from "@/utils/fetch-utils";
import config from "@/config";
import store from '../../store';
import axios, { AxiosRequestConfig } from 'axios';
export default class CabService {

  private genericErrorMessage =
    "Connection to the network failed. Please contact our support team example@example.com.";

  public GetCabBookingView(payload: string) {
    return new Promise((resolve, reject) => {
      const params = {
        bookingId: payload,
      };
      const url = config.authUrl + "/cab/booking/"+payload;
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

   public listOfBookingCab(payload: CabListRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        perPage: payload.perPage,
        page: payload.page,
      };
      const url = config.authUrl + "/cab/booking";
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
  public ChangeStatus(payload: CabUpdateRequest): Promise<any> {
    const token = localStorage.getItem('token');
    var bookingid = payload.bookingId
    const url = config.authUrl + "/cab/booking/"+bookingid;
    console.log('status', payload.status)
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



