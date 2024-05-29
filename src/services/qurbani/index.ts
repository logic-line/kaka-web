// @ts-ignore
import { CreateQurbani,QurbaniListRequest,UpdateQurbani,DeleteQurbaniImage,DeleteQurbaniAnimalType,CreateQurbaniAnimalType,UpdateQurbaniAnimalType,QurbaniBookingListRequest,BookingStatusUpdateRequest } from "@/types/qurbani";
import config from "@/config";
import axios, { AxiosRequestConfig } from "axios";
export default class QurbaniService {

  private genericErrorMessage =
    "Connection to the network failed. Please contact our support team example@example.com.";

  public CreateQurbani(payload: CreateQurbani): Promise<any> {
    const token = localStorage.getItem('token');
    const url = config.authUrl + "/qurbani";
    return axios.post(url,{
      name:payload.name,
      description:payload.description,
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
  public UpdateQurbani(payload: UpdateQurbani): Promise<any> {
    const token = localStorage.getItem('token');
    var ID = payload.id
    const url = config.authUrl + "/qurbani/"+ID;
    return axios.put(url,{
      name:payload.name,
      description:payload.description,
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
  public updateQurbaniType(payload: UpdateQurbaniAnimalType): Promise<any> {
    const token = localStorage.getItem('token');
    var qurbaniID = payload.qurbaniId
    var typeID = payload.typeID
    console.log("upd payload",payload)
    const url = config.authUrl + "/qurbani/"+qurbaniID+"/type/"+typeID;
    return axios.put(url,{
      type:payload.type,
      base_price:payload.base_price,
      price:payload.price,
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
  public ChangeStatus(payload: BookingStatusUpdateRequest): Promise<any> {
    const token = localStorage.getItem('token');
    console.log("sohan",payload.bookingId)
    console.log("sohan",payload.status)
    var bookingid = payload.bookingId
    const url = config.authUrl + "/qurbani/booking/"+bookingid;
    console.log("url 123",url)
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

  public GetQurbaniView(payload: string) {
    return new Promise((resolve, reject) => {
      console.log("payload",payload)
      const params = {
        id: payload,
      };
      const url = config.authUrl + "/qurbani/"+payload;
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
  public GetQurbaniBookingView(payload: string) {
    return new Promise((resolve, reject) => {
      console.log("payload",payload)
      const params = {
        id: payload,
      };
      const url = config.authUrl + "/qurbani/booking/"+payload;
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
  public GetQurbaniTypeView(payload: string) {
    return new Promise((resolve, reject) => {
      console.log("payload",payload)
      const params = {
        id: payload,
      };
      const url = config.authUrl + "/qurbani/"+payload+"/type";
      const token = localStorage.getItem('token');
      const headers: AxiosRequestConfig['headers'] = {
        'Authorization':'Bearer '+token,
        "X-API-KEY": config.apiKey,
        "Content-Type": "multipart/form-data"
      };
      axios.get(url, { params, headers},)
        .then(function (response) {
          console.log("4444",response)
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
   }
  public RemoveQurbani(payload: string) {
    return new Promise((resolve, reject) => {
      const params = {
        carID: payload,
      };
      const url = config.authUrl + "/qurbani/"+payload;
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
  public RemoveQurbaniImage(payload: DeleteQurbaniImage) {
    return new Promise((resolve, reject) => {
      const params = {
        qurbaniId: payload.qurbaniid,
        imageId:payload.imageId
      };
      const url = config.authUrl + "/qurbani/"+payload.qurbaniid+"/image/"+payload.imageId;
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
   public CreateAnimalType(payload: CreateQurbaniAnimalType): Promise<any> {
    const token = localStorage.getItem('token');
    const url = config.authUrl + "/qurbani/"+payload.qurbaniId+"/type";
    return axios.post(url,{
      type:payload.type,
      base_price:payload.base_price,
      price:payload.price,
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
  public RemoveQurbaniType(payload: DeleteQurbaniAnimalType) {
    return new Promise((resolve, reject) => {
      const params = {
        qurbaniId: payload.qurbaniid,
        typeId:payload.typeId
      };
      const url = config.authUrl + "/qurbani/"+payload.qurbaniid+"/type/"+payload.typeId;
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
   public listOfQurbani(payload: QurbaniListRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        perPage: payload.perPage,
        page: payload.page,
      };
      const url = config.authUrl + "/qurbani";
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
   public listOfBookingQurbani(payload: QurbaniBookingListRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = {
        perPage: payload.perPage,
        page: payload.page,
      };
      const url = config.authUrl + "/qurbani/booking";
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

}



