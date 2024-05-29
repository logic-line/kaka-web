import config from "@/config";
import { FetchData } from "@/utils/fetch-utils";
import {ListFilterRequest} from "@/types/notification";
import {UpdateNotification} from "@/types/notification";
import store from '../../store';
export default class NotificationService {
    
    public listOfNotifications(payload: ListFilterRequest) {
        const params={
          SearchTerm : payload.SearchTerm,
          SortByColumn : payload.SortByColumn,
          StartDate : payload.StartDate,
          EndDate : payload.EndDate,
          SortBy : payload.SortBy,
          Status : payload.Status,
          IsRead : payload.IsRead,
        }
        const queryString = new URLSearchParams(params).toString();
        const url = config.usermgmGatewayUrl + "/usermgm/v1/notification/list" + '?' + queryString;
        const method = "GET";
        return FetchData(url, method, true, true)
        .then((result) => {
            if (result.error) {
              throw result.error.message;
            } else {
              if (result.data) {
                return result.data;
              }
            }
          });
    
      }

    public UpdateNotificationRequest(payload: UpdateNotification) {
        const url = config.usermgmGatewayUrl + "/usermgm/v1/notification/update/"+ payload.ID;
        const method = "POST";
        return FetchData(url, method, true, true,{
          ID: payload.ID,
          IsRead:payload.IsRead,
        })
        .then((result) => {
            if (result.error) {
              if(result.error.message == 'NetworkError when attempting to fetch resource.'){
                store.dispatch('setUniqueErrorStatus', true);
                store.dispatch('setError', 'Faild To Update Notification');
              }else{
                throw result.error.message;
              }
            } else {
              if (result.data) {
                return result.data;
              }
            }
          });
    
      }

}
