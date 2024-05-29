import { ActionContext } from "vuex";
import { AuthState } from "./index";
import store, { RootState } from "@/store";
import config from "@/config";
import { FetchData } from "@/utils/fetch-utils";
import { getRole } from "@/utils/auth-utils";

export async function exchangeCode(
  { commit }: ActionContext<AuthState, RootState>,
  payload: AuthState
) {
  let stateData: AuthState = {
    auth: {
      isValidToken: payload.auth["isValidToken"],
      accessToken: payload.auth["accessToken"],
      role: payload.auth["role"],
    },
  };
  commit("setAuth", stateData);
}

export async function refreshToken({
  commit,
}: ActionContext<AuthState, RootState>) {
  let payload = store.state.auth.auth;
  let stateData: AuthState = {
    auth: {
      isValidToken: false,
      accessToken: "",
      role: "",
    },
  };
  if (payload.accessToken != ""){
    fetch(config.authUrl + "/refreshToken?accessToken=" + payload.accessToken)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error: " + response.status);
        }
      })
      .then(async (data) => {
        let token = store.state.auth.auth.accessToken
        if (data.data.accessToken) {
          token = data.data.accessToken
        }
        let role = ''
        await getRole(token)
          .then(res => {
            if (res) {
              role = res
            }
          })
  
        if (data.data.accessToken) {
          stateData = {
            auth: {
              isValidToken: true,
              accessToken: data.data.accessToken,
              role: role,
            },
          };
  
          commit("setAuth", stateData);
        } else if (data.status == "error") {
          commit("setAuth", stateData);
        }
      })
      .catch((error) => {
        commit("setAuth", stateData);
      });
  }
}


export async function resetAuthState(
  { commit }: ActionContext<AuthState, RootState>,
  payload: AuthState
) {
  let stateData: AuthState = {
    auth: {
      isValidToken: false,
      accessToken: '',
      role: '',
    },
  };
  commit("resetState", stateData);
}