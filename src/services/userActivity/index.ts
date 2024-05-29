import { UserActivityListFilterRequest,CreateUserActivitiesRequest } from "@/types/userActivitty";
import config from "@/config";
import { FetchData } from "@/utils/fetch-utils";
import store from '../../store';
export default class UserActivitiesService {
  
  public listOfUserActivities(param: UserActivityListFilterRequest) {
    let url = `${config.usermgmGatewayUrl}/api/v1/user-activities/list`;
    const method = "GET";

    const queryParams = [];

    if (param.searchterm !== '') {
        queryParams.push(`SearchTerm=${param.searchterm}`);
    }

    if (param.cursor !== '') {
        queryParams.push(`Cursor=${param.cursor}`);
        queryParams.push(`Limit=${param.limit}`);
        queryParams.push(`CursorType=${param.cursortype}`);
    }

    if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
    }
    
    return FetchData(url, method, true, true).then((result) => {
        if (result.error) {
          throw result.error.message;
        } else {
          if (result.data) {
            return result.data;
          }
        }
    });
  }

  public CreateUserActivities(payload: CreateUserActivitiesRequest) {
    const url = config.usermgmGatewayUrl+"/api/v1/user-activities/create";
    const method = "POST";
    return FetchData(url, method, true,false,{
      Activity:payload.activity
    }).then((result) => {
      if (result.error) {
        if(result.error.message == 'NetworkError when attempting to fetch resource.'){
          store.dispatch('setUniqueErrorStatus', true);
          store.dispatch('setError', 'Faild To Create User Activities');
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

  public getUserbyIndividualActivities(ID:string,param: UserActivityListFilterRequest) {
    let url = config.usermgmGatewayUrl + `/api/v1/admin-user/${ID}/activities/list`
    const queryParams = [];

    if (param.searchterm !== '') {
        queryParams.push(`SearchTerm=${param.searchterm}`);
    }

    if (param.cursor !== '') {
        queryParams.push(`Cursor=${param.cursor}`);
        queryParams.push(`Limit=${param.limit}`);
        queryParams.push(`CursorType=${param.cursortype}`);
    }

    if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
    }
    const method = "GET";
    return FetchData(url, method, true, false,
      {
        ID: ID,
      })
      .then((result: any) => {
        if (result.error) {
          throw result.error.message;
        } else {
          if (result.data) {
            return result.data
          }
        }
      })
  }
}



