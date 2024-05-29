// @ts-ignore
import { CreateLocation, LocationListRequest, UpdateLocation } from "@/types/location";
import { FetchData } from "@/utils/fetch-utils";
import config from "@/config";
import store from '../../store';
import axios, { AxiosRequestConfig } from "axios";
export default class LocationService {

  private genericErrorMessage =
    "Connection to the network failed. Please contact our support team example@example.com.";

  public CreateLocation(payload: CreateLocation): Promise<any> {
    const token = localStorage.getItem('token');
    const url = config.authUrl + "/location";
    return axios.post(url,{
      name:payload.name,
      reference:payload.reference,
      latitude:payload.latitude,
      longitude:payload.longitude,
      enabled:payload.enabled,
      icon:payload.icon,
      banner:payload.banner,
     },{
      headers : { 
        'Authorization':'Bearer '+token,
        "X-API-KEY": config.apiKey,
        "Content-Type": "multipart/form-data"
      }
     }) .then(function (response) {
      console.log("loc res",response)
      return(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
    });
  }
  public UpdateLocation(payload: UpdateLocation): Promise<any> {
    const token = localStorage.getItem('token');
    var ID = payload.id

    console.log("id",ID)
    const url = config.authUrl + "/location/"+ID;
    return axios.put(url,{
      name:payload.name,
      reference:payload.reference,
      latitude:payload.latitude,
      longitude:payload.longitude,
      enabled:payload.enabled,
      icon:payload.icon,
      banner:payload.banner,
     },{
      headers : { 
        'Authorization':'Bearer '+token,
        "X-API-KEY": config.apiKey,
        'Content-Type': 'application/json',
      }
     }) .then(function (response) {
      console.log("loc res",response)
      return(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
    });
  }
  
  public GetLocationView(payload: string) {
    return new Promise((resolve, reject) => {
      console.log("payload",payload)
      const params = {
        id: payload,
      };
      console.log("xyz",payload)
      const url = config.authUrl + "/location/"+payload;
      const token = localStorage.getItem('token');
      const headers: AxiosRequestConfig['headers'] = {
        'Authorization':'Bearer '+token,
        "X-API-KEY": config.apiKey,
        "Content-Type": "multipart/form-data"
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
   public listOfLocation(payload: LocationListRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        perPage: payload.perPage,
        page: payload.page,
      };
      const url = config.authUrl + "/location";
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

  public RemoveLocation(payload: string) {
    return new Promise((resolve, reject) => {
      const params = {
        carID: payload,
      };
      const url = config.authUrl + "/location/"+payload;
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

  // public removeCarImage(payload: string) {
  //   return new Promise((resolve, reject) => {
  //     const params = {
  //       carID: payload,
  //     };
  //     const url = config.authUrl + "/admin/image/"+payload+"/delete";
  //     const token = localStorage.getItem('token');
  //     const headers: AxiosRequestConfig['headers'] = {
  //       'Authorization': 'Bearer ' + token ,
  //       'Content-Type': 'application/json',
  //     };
  //     axios.get(url, { params, headers},)
  //       .then(function (response) {
  //         console.log(response)
  //         resolve(response.data);
  //       })
  //       .catch(function (error) {
  //         reject(error);
  //       });
  //   });
  //  }

}



