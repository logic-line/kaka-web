// @ts-ignore
import config from "@/config";
import axios, { AxiosRequestConfig } from "axios";
export default class DashboardService {

  public DashboardView() {
    return new Promise((resolve, reject) => {
      const params = {};
      const url = config.authUrl + "/dashboard";
      const token = localStorage.getItem('token');
      const headers: AxiosRequestConfig['headers'] = {
        'Authorization':'Bearer '+token,
        "X-API-KEY": config.apiKey,
        "Content-Type": "multipart/form-data"
      };
      axios.get(url, { params, headers},)
        .then(function (response) {
          console.log(response)
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
   }
  

}



