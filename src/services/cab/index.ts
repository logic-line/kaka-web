// @ts-ignore
import { CabListRequest,CabUpdateRequest } from "@/types/cab";
import { FetchData } from "@/utils/fetch-utils";
import config from "@/config";
import store from '../../store';
import axios, { AxiosRequestConfig } from 'axios';
export default class CabService {

  private genericErrorMessage =
    "Connection to the network failed. Please contact our support team example@example.com.";

  //   public CreatePackage(payload: PackageCreateRequest): Promise<any> {
  //     const token = localStorage.getItem('token');
  //     const url = config.authUrl + "/package";
  //     return axios.post(url,{
  //       name: payload.name,
  //       source: payload.source,
  //       destination: payload.destination,
  //       description: payload.description,
  //       duration: payload.duration,
  //       days: payload.days,
  //       nights: payload.nights,
  //       persons: payload.persons,
  //       base_price: payload.base_price,
  //       discount_price: payload.discount_price,
  //       price: payload.price,
  //       booking_amount: payload.booking_amount,
  //       offer_applicable: payload.offer_applicable,
  //       icon: payload.icon,
  //       banner: payload.banner,
  //       thing_will_love: payload.thing_will_love,
  //      },{
  //       headers : { 
  //         'Authorization':'Bearer '+token,
  //         "X-API-KEY": config.apiKey,
  //         'Content-Type': 'application/json',
  //       }
  //      }) .then(function (response) {
  //       return(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     })
  //     .finally(function () {
  //     });
  //   }
  //   public UpdatePackage(payload: PackageUpdateRequest): Promise<any> {
  //     const token = localStorage.getItem('token');
  //     var ID = payload.id
  //     const url = config.authUrl + "/package/" +ID;
  //     return axios.put(url,{
  //       name: payload.name,
  //       source: payload.source,
  //       destination: payload.destination,
  //       description: payload.description,
  //       duration: payload.duration,
  //       days: payload.days,
  //       nights: payload.nights,
  //       persons: payload.persons,
  //       base_price: payload.base_price,
  //       discount_price: payload.discount_price,
  //       price: payload.price,
  //       booking_amount: payload.booking_amount,
  //       offer_applicable: payload.offer_applicable,
  //       icon: payload.icon,
  //       banner: payload.banner,
  //       thing_will_love: payload.thing_will_love,
  //      },{
  //       headers : { 
  //         'Authorization':'Bearer '+token,
  //         "X-API-KEY": config.apiKey,
  //         'Content-Type': 'application/json',
  //       }
  //      }) .then(function (response) {
  //       return(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     })
  //     .finally(function () {
  //     });
  //   }

  // public listOfPackage(payload: PackageListRequest): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const params = {
  //       perPage: payload.perPage,
  //       page: payload.page,
  //       enabled: payload.enabled,
  //       withLocations: payload.withLocations,
  //     };
  //     const url = config.authUrl + "/package";
  //     const token = localStorage.getItem('token');
  //     const headers: AxiosRequestConfig['headers'] = {
  //       'X-API-KEY': config.apiKey,
  //       'Authorization': 'Bearer ' + token ,
  //       'Content-Type': 'application/json',
  //     };
  
  //     axios.get(url, { params, headers},)
  //       .then(function (response) {
  //         console.log(response)
  //         resolve(response.data); // Resolve the promise with the response data
  //       })
  //       .catch(function (error) {
  //         reject(error); // Reject the promise with the error
  //       });
  //   });
  // }

  // public GetPackageView(payload: string) {
  //   return new Promise((resolve, reject) => {
  //     const params = {
  //       packageId: payload,
  //     };
  //     console.log("config.authUrl",config.authUrl)
  //     const url = config.authUrl + "/package/"+payload+"";
  //     const token = localStorage.getItem('token');
  //     const headers: AxiosRequestConfig['headers'] = {
  //       'X-API-KEY': config.apiKey,
  //       'Authorization': 'Bearer ' + token ,
  //       'Content-Type': 'application/json',
  //     };
  //     axios.get(url, { params, headers},)
  //       .then(function (response) {
  //         resolve(response.data);
  //       })
  //       .catch(function (error) {
  //         reject(error);
  //       });
  //   });
  //  }
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
  // public RemovePackage(payload: string) {
  //   return new Promise((resolve, reject) => {
  //     const params = {
  //       packageId: payload,
  //     };
  //     const url = config.authUrl + "/package/"+payload+"";
  //     const token = localStorage.getItem('token');
  //     const headers: AxiosRequestConfig['headers'] = {
  //       'Authorization': 'Bearer ' + token ,
  //       'Content-Type': 'application/json',
  //     };
  //     axios.delete(url, { params, headers},)
  //       .then(function (response) {
  //         console.log(response)
  //         resolve(response.data);
  //       })
  //       .catch(function (error) {
  //         reject(error);
  //       });
  //   });
  //  }
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
          resolve(response.data); // Resolve the promise with the response data
        })
        .catch(function (error) {
          reject(error); // Reject the promise with the error
        });
    });
  }
  public ChangeStatus(payload: CabUpdateRequest): Promise<any> {
    const token = localStorage.getItem('token');
    var bookingid = payload.bookingId
    const url = config.authUrl + "/package/booking/"+bookingid;
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
      console.log("resssss",response)
      return(response.data);
    })
    .catch(function (error) {
      console.log("sohan error",error);
    })
    .finally(function () {
    });
  }

}



