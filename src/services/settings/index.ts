import { GetSettingsRequest, } from "@/types/settings";
import config from "@/config";
import { FetchData } from "@/utils/fetch-utils";

export default class SettingsService {
  
  public GetSetting(payload: GetSettingsRequest) {
      const params={
        SettingsGroup : payload.settingsgroup,
      }
      const queryString = new URLSearchParams(params).toString();
      const url = config.usermgmGatewayUrl + "/usermgm/v1/settings/get/" + payload.slug + '?' + queryString;
      const method = "GET";
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

}



  

 