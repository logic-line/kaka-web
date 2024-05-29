// @ts-ignore
import { UpdatePreferenceType, ChangePasswordType, GetGoogle2FAType, Google2FARequest, changePassWithCodeType,
  UpdateProfileType,ResetPasswordType,ResetPasswordUpdateType
} from "@/types/profile";

import config from "@/config";
import { FetchData } from "@/utils/fetch-utils";
import store from '../../store';
export default class ProfileService {

  public GetProfile() {
    const url = config.usermgmGatewayUrl + "/usermgm/v1/profile/get/id";
    const method = "GET";

    return FetchData(url, method, true, false)
        .then((result:any) => {
            if (result.error) {
              return result.error;
            } else {
                if(result.data && result.data.Data){
                    return result.data
                }
            }
        });
  }

  public GetPreference() {
    const url = config.usermgmGatewayUrl + "/usermgm/v1/profile/preference/get/id";
    const method = "GET";

    return FetchData(url, method, true, false)
        .then((result:any) => {
            if (result.error) {
              return result.error;
            } else {
                if(result.data && result.data.Data){
                    return result.data
                }
            }
        });
  }

  public UpdatePreference(payload: UpdatePreferenceType) {
    const url = config.usermgmGatewayUrl + "/usermgm/v1/profile/preference/update/id";
    const method = "POST";
    return FetchData(url, method, true, false,{
      DisplayLanguage: payload.displaylanguage,
      DefaultTradePair: payload.defaulttradepair,
    }).then((result) => {
        if (result.error) {
          if(result.error.message == 'NetworkError when attempting to fetch resource.'){
            store.dispatch('setUniqueErrorStatus', true);
            store.dispatch('setError', 'Faild To Update Preference');
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

  public ChangePassword(payload: ChangePasswordType) {
    const url = config.usermgmGatewayUrl + "/usermgm/v1/profile/password/update/id";
    const method = "POST";
    return FetchData(url, method, true, false,{
      CurrentPassword: payload.currentpassword,
      NewPassword: payload.newpassword,
      ConfirmPassword: payload.confirmpassword
    }).then((result) => {
        if (result.error) {
          if(result.error.message == 'NetworkError when attempting to fetch resource.'){
            store.dispatch('setUniqueErrorStatus', true);
            store.dispatch('setError', 'Faild To Change Password');
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
  
  public ResetPassword(payload: ResetPasswordType) {
    const url = config.usermgmGatewayUrl + "/usermgm/v1/profile/password/reset";
    const method = "POST";
    return FetchData(url, method, true, false,{
      Email: payload.email
    }).then((result) => {
        if (result.error) {
          if(result.error.message == 'NetworkError when attempting to fetch resource.'){
            store.dispatch('setUniqueErrorStatus', true);
            store.dispatch('setError', 'Faild To Reset Password');
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
  public ResetPasswordLink() {
    const url = config.usermgmGatewayUrl + "/usermgm/v1/profile/password/reset";
    const method = "GET";
    return FetchData(url, method, true, false,{
    }).then((result) => {
        if (result.error) {
          throw result.error.message;
        } else {
          if (result.data) {
            return result.data;
          }
        }
      });
  }
  public ResetPasswordUpdate(payload: ResetPasswordUpdateType) {
    const url = config.usermgmGatewayUrl + "/usermgm/v1/profile/reset/password/update";
    const method = "POST";
    return FetchData(url, method, false, false,{
      Email: payload.email,
      ResetToken:payload.resettoken,
      NewPassword:payload.newpassword,
      ConfirmPassword:payload.confirmpassword
    }).then((result) => {
        if (result.error) {
          if(result.error.message == 'NetworkError when attempting to fetch resource.'){
            store.dispatch('setUniqueErrorStatus', true);
            store.dispatch('setError', 'Faild To Reset Password Update');
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
  public ChangePassword2FA(payload: changePassWithCodeType) {
    const url = config.usermgmGatewayUrl + "/usermgm/v1/eventdata/validate/mfa";
    const method = "POST";
    return FetchData(url, method, true, false, payload).then((result) => {
        if (result.error) {
          if(result.error.message == 'NetworkError when attempting to fetch resource.'){
            store.dispatch('setUniqueErrorStatus', true);
            store.dispatch('setError', 'Faild To Change Password 2FA');
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

  public GetReferral() {
    const url = config.usermgmGatewayUrl + "/usermgm/v1/profile/referral/get/id";
    const method = "GET";
    return FetchData(url, method, true, false)
        .then((result:any) => {
            if (result.error) {
              return result.error;
            } else {
                if(result.data.Data){
                    return result.data
                }
            }
        });
  }

  public SetGoogle2FA(payload: Google2FARequest) {
    const url = config.usermgmGatewayUrl + "/usermgm/v1/profile/setgoogle2fa";
    const method = "POST";
    return FetchData(url, method, true, false,{
      Email: payload.email,
      Password: payload.password
    }).then((result) => {
        if (result.error) {
          if(result.error.message == 'NetworkError when attempting to fetch resource.'){
            store.dispatch('setUniqueErrorStatus', true);
            store.dispatch('setError', 'Faild To Set Google2FA');
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

  public GetGoogle2FA(payload: GetGoogle2FAType) {
    const url = config.usermgmGatewayUrl + "/usermgm/v1/profile/getgoogle2fa";
    const method = "POST";
    return FetchData(url, method, true, false,{
      Email: payload.email,
      Password: payload.password,
      Code: payload.code,
      Istwofa: payload.istwofa
    }).then((result) => {
        if (result.error) {
          if(result.error.message == 'NetworkError when attempting to fetch resource.'){
            store.dispatch('setUniqueErrorStatus', true);
            store.dispatch('setError', 'Faild To Get Google2FA');
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

  public UpdateProfile(payload: UpdateProfileType) {
    const url = config.usermgmGatewayUrl + "/usermgm/v1/profile/update/id";
    const method = "POST";
    return FetchData(url, method, true, false,{
      FirstName: payload.firstname,
      LastName: payload.lastname,
      PhoneNo: payload.phoneno,
      Country: payload.country,
      StreetAddress: payload.streetaddress,
      DateOfBirth: payload.dateofbirth,
      ProfileImage: payload.profileimage
    }).then((result) => {
        if (result.error) {
          if(result.error.message == 'NetworkError when attempting to fetch resource.'){
            store.dispatch('setUniqueErrorStatus', true);
            store.dispatch('setError', 'Faild To Update Profile');
          }else{
            throw result.error.message;
          }
        } else {
          if (result.data ) {
            return result.data;
          }
        }
      });
  }

  public GetProfileRole() {
    const url = config.usermgmGatewayUrl + "/usermgm/v1/role/get/UserID";
    const method = "GET";

    return FetchData(url, method, true, false)
        .then((result:any) => {
            if (result.error) {
              return result.error;
            } else {
                if(result.data){
                    return result.data
                }
            }
        });
  }

}


