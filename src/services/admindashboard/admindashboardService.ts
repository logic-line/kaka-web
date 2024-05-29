import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
import config from "@/config";
import { FetchData } from "@/utils/fetch-utils";
// import { ListWalletUserRequest } from "@/types/wallet";
export default class AdminDashboardService {

  private genericErrorMessage =
    "Connection to the network failed. Please contact our support team example@example.com.";

  getTimeStamp(date: any) {
    const [year, month, day] = date.split("-").map(Number);
    const timestamp = new Timestamp();
    timestamp.setSeconds(Math.floor(Date.UTC(year, month - 1, day) / 1000));
    timestamp.setNanos(0);
    return timestamp;
  }

  public GetWallets() {
    const url = config.apiGatewayUrl + "/api/v1/admin-dashboard/wallets";
    const method = "GET";
    return FetchData(url, method, true, true,
      {})
      .then((result: any) => {
        if (result.error) {
        } else {
          if (result.data) {
            return result.data
          }
        }
      });
  }

  public GetApiDetails() {
    const url = config.apiGatewayUrl + "/api/v1/admin-dashboard/api-details";
    const method = "GET";
    return FetchData(url, method, true, false,
      {})
      .then((result: any) => {
        if (result.error) {
        } else {
          if (result.data) {
            return result.data
          }
        }
      });
  }

  public GetWithdrawals() {
    const url = config.apiGatewayUrl + "/api/v1/admin-dashboard/withdrawals";
    const method = "GET";
    return FetchData(url, method, true, true,
      {})
      .then((result: any) => {
        if (result.error) {
        } else {
          if (result.data) {
            return result.data
          }
        }
      });
  }
  public GetDeposits() {
    const url = config.apiGatewayUrl + "/api/v1/admin-dashboard/deposits";
    const method = "GET";
    return FetchData(url, method, true, true,
      {})
      .then((result: any) => {
        if (result.error) {
        } else {
          if (result.data) {
            return result.data
          }
        }
      });
  }

  public GetTrades() {
    const url = config.apiGatewayUrl + "/api/v1/admin-dashboard/trades";
    const method = "GET";
    return FetchData(url, method, true, true,
      {})
      .then((result: any) => {
        if (result.error) {
        } else {
          if (result.data) {
            return result.data
          }
        }
      });
  }

  public GetUserCommon(id:string) {
    const url = config.apiGatewayUrl + "/api/v1/admin-dashboard/user-common/get/id/"+id;
    const method = "GET";
    return FetchData(url, method, true, false,
      {})
      .then((result: any) => {
        if (result.error) {
        } else {
          if (result.data) {
            return result.data
          }
        }
      });
  }

}