import { InvitedUser, UpdateUser, UserListFilterRequest, UpdateUserStatus, ListReferralRequestType, UserVerifiedRequest, CreateUserRequest, ResendEmailVerificationRequest, SetPasswordType, LoginUserRequest } from "@/types/user";
import { FetchData } from "@/utils/fetch-utils";
import config from "@/config";
import store from '../../store';
import axios from "axios";
export default class UserService {

  private genericErrorMessage =
    "Connection to the network failed. Please contact our support team example@example.com.";

  public inviteUser(payload: InvitedUser) {
    const url = config.usermgmGatewayUrl + "/api/v1/user/invite";
    const method = "POST";
    return FetchData(url, method, true, false,{
      FirstName: payload.firstname,
      LastName: payload.lastname,
      PhoneNumber: payload.phonenumber,
      Email: payload.email,
      RoleID: payload.roleid,
      Address: payload.address,
      Image: '',
    }).then((result) => {
      if (result.error) {
        if(result.error.message == 'NetworkError when attempting to fetch resource.'){
          store.dispatch('setUniqueErrorStatus', true);
          store.dispatch('setError', 'Faild To Invite User');
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

  public updateUser(payload: UpdateUser) {

    const url = config.usermgmGatewayUrl + "/api/v1/user/update/" + payload.id;
    const method = "POST";
    return FetchData(url, method, true, false,{
      ID: payload.id,
      RoleID: payload.roleid,
      Status: payload.status,
      FirstName: payload.firstname,
      LastName: payload.lastname,
      Email: payload.email,
      Address: payload.address,
      PhoneNumber: payload.phonenumber,
      Image: '',
    }).then((result) => {
      if (result.error) {

        if(result.error.message == 'NetworkError when attempting to fetch resource.'){
          store.dispatch('setUniqueErrorStatus', true);
          store.dispatch('setError', 'Faild To Update User');
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

  public updateUserStatus(payload: UpdateUserStatus) {
    const url = config.usermgmGatewayUrl + "/api/v1/user/status/update/" + payload.id;
    const method = "POST";
    return FetchData(url, method, true, false,{
      ID: payload.id,
      Status: payload.status,
    }).then((result) => {
      if (result.error) {
        if(result.error.message == 'NetworkError when attempting to fetch resource.'){
          store.dispatch('setUniqueErrorStatus', true);
          store.dispatch('setError', 'Faild To Update User Status');
        }else{
          throw result.error.message;
        }
      } else {
        if (result.data) {
          return result.data;
        }
      }
    })
  }

  public listOfUser(payload: UserListFilterRequest) {
    const params = {
      SearchTerm: payload.searchterm,
      StartDate: payload.startdate,
      EndDate: payload.enddate,
      PhoneNumber: payload.phonenumber,
      SortByColumn: payload.sortbycolumn,
      SortBy: payload.sortby,
      Status: payload.status,
      CursorType: payload.cursortype,
      Cursor: payload.cursor,
      RoleID: payload.roleid,
      Limit: String(payload.limit),
    }
    const queryString = new URLSearchParams(params).toString();
    const url = config.usermgmGatewayUrl + "/api/v1/user/list" + "?" + queryString;
    const method = "GET";

    return FetchData(url, method, true, true).then((result) => {
      if (result.error) {
        throw result.error.message;
      } else {
        if (result.data) {
          return result.data;
        }
      }
    })
  }

  public getUserbyId(payload: string) {
    const url = config.usermgmGatewayUrl + "/api/v1/user/get/id/" + payload;
    const method = "GET";
    return FetchData(url, method, true, false,
      {
        ID: payload,
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


  public getReferralUserList(payload: ListReferralRequestType) {

    const params = {
      SearchTerm: payload.searchterm,
      StartDate: payload.startdate,
      EndDate: payload.enddate,
      PhoneNumber: payload.phonenumber,
      SortByColumn: payload.sortbycolumn,
      SortBy: payload.sortby,
      Status: payload.status,
      CursorType: String(payload.cursortype),
      Cursor: payload.cursor,
      Limit: String(payload.limit),
    }
    const queryString = new URLSearchParams(params).toString();
    const url = config.usermgmGatewayUrl + "/usermgm/v1/referral/list" + "?" + queryString;
    const method = "GET";
    return FetchData(url, method, true, true)
      .then((result) => {
        if (result.error) {
          throw result.error;
        } else {
          if (result.data) {
            return result.data;
          }
        }
      });
  }

  public userVerified(payload: UserVerifiedRequest) {
    const url = config.usermgmGatewayUrl + "/usermgm/v1/user/verification/" + payload.emailtoken;
    const method = "GET";
    return FetchData(url, method, true, false)
      .then((result: any) => {
        if (result.error) {
          throw result.error;
        } else {
          if (result.data) {
            return result.data
          }
        }
      })
  }

  public CreateUser(payload: CreateUserRequest) {
    // const url = config.usermgmGatewayUrl + "/usermgm/v1/user/create";
    // const method = "POST";
    // return FetchData(url, method, false, false,{
    //   name: payload.name,
    //   email: payload.email,
    //   mobile_code: payload.mobilecode,
    //   mobile: payload.mobilenumber,
    //   password: payload.password,
    //   photo_url:payload.photourl
    // }).then((result) => {
    //   if (result.error) {
    //     if(result.error.message == 'NetworkError when attempting to fetch resource.'){
    //       store.dispatch('setUniqueErrorStatus', true);
    //       store.dispatch('setError', 'Faild To Create User');
    //     }else{
    //       throw result.error.message;
    //     }
    //   } else {
    //     if (result.data) {
    //       return result.data;
    //     }
    //   }
    // });
    // sohan
    // const url = config.authUrl + "/auth/signup";
    const url = "http://192.168.31.115:8086/api" + "/auth/signup";
    // console.log("url",url)
    return axios.post(url,{
      name: payload.name,
      email: payload.email,
      mobile_code: payload.mobilecode,
      mobile: payload.mobilenumber,
      password: payload.password,
      photo_url:payload.photourl
     },{
      headers : {'X-API-KEY': '72923734847575737372727'}
     }) .then(function (response) {
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
    // sohan
  }

  public LoginUser(payload: LoginUserRequest) {
       const url = config.authUrl + "/auth/login";
       console.log('config.apiKey',config.apiKey)
    return axios.post(url,{
      email:payload.email,password:payload.password
     },{
      headers : {'X-API-KEY': config.apiKey}
     }) .then(function (response) {
      return response
    })
    .catch(function (error) {
      return error
    })
    .finally(function () {
    });

  }

  public ResendEmailVerification(payload: ResendEmailVerificationRequest) {
    const url = config.usermgmGatewayUrl + "/usermgm/v1/user/resend-email-verification";
    const method = "POST";
    return FetchData(url, method, false,false, {
      Email: payload.email
    }).then((result) => {
      if (result.error) {
        if(result.error.message == 'NetworkError when attempting to fetch resource.'){
          store.dispatch('setUniqueErrorStatus', true);
          store.dispatch('setError', 'Faild To Resend Email Verification');
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
  public SetPassword(payload: SetPasswordType) {
    const url = config.usermgmGatewayUrl + "/usermgm/v1/profile/password/set";
    const method = "POST";
    return FetchData(url, method, false,false, {
      Token: payload.token,
      Password: payload.password,
      ConfirmPassword: payload.confirmpassword
    }).then((result) => {
      if (result.error) {
        if(result.error.message == 'NetworkError when attempting to fetch resource.'){
          store.dispatch('setUniqueErrorStatus', true);
          store.dispatch('setError', 'Faild To Set Password');
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

  public getUserTotaCount() {
    const url = config.usermgmGatewayUrl + "/api/v1/user/get/total-count";
    const method = "GET";
    return FetchData(url, method, true, false,
      {})
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



