import { ListSettingsRequest } from "@/types/settings";
import config from "@/config";
import { FetchData } from "@/utils/fetch-utils";

export default class ApplicationSetting {

  public GetListSettings(payload: ListSettingsRequest) {
    const url = config.usermgmGatewayUrl + "/usermgm/v1/settings/list";
    const method = "GET";
    return FetchData(url, method, true, true,{
        SettingsGroup: payload.settingsgroup
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

}



  

 