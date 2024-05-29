// @ts-ignore
import { SaveImageRequest } from "@/types/imageupload";
import { FetchData } from "@/utils/fetch-utils";
import config from "@/config";
import store from '../../store';
import axios, { AxiosRequestConfig } from 'axios';
export default class ImageService {

  private genericErrorMessage =
    "Connection to the network failed. Please contact our support team example@example.com.";

    

    public listOfImage(){
      return new Promise((resolve, reject) => {
        const url = config.authUrl + "/image";
        const token = localStorage.getItem('token');
        const headers: AxiosRequestConfig['headers'] = {
          'Authorization':'Bearer '+token,
          "X-API-KEY": config.apiKey,
          "Content-Type": "multipart/form-data"
        };
        axios.get(url, {headers},)
          .then(function (response) {
            console.log(response)
            resolve(response.data);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    }
    public saveImage(payload: SaveImageRequest): Promise<any> {
      console.log("payload",payload)
      return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token');
        const params = {
          name: payload.name,
          url: payload.url,
        };
        const url = config.authUrl + "/image";
        const headers: AxiosRequestConfig['headers'] = {
          'Authorization':'Bearer '+token,
          "X-API-KEY": config.apiKey,
          "Content-Type": "multipart/form-data"
        };
        axios.post(url, { params, headers},)
          .then(function (response) {
            console.log("save res",response)
            resolve(response.data); 
          })
          .catch(function (error) {
            reject(error); 
          });
      });
    }
  public removeImage(payload: string) {
    return new Promise((resolve, reject) => {
      const params = {
        carID: payload,
      };
      const url = config.authUrl + "/image/"+payload;
      const token = localStorage.getItem('token');
      const headers: AxiosRequestConfig['headers'] = {
        'Authorization':'Bearer '+token,
        "X-API-KEY": config.apiKey,
        "Content-Type": "multipart/form-data"
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
    

}
