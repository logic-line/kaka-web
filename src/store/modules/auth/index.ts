import { GetterTree, Module, MutationTree } from "vuex";
import { RootState } from "@/store";
import * as actions from "./action";

export interface AuthState {
  auth: {
    isValidToken: boolean;
    accessToken: string;
    role:string;
  };
}

const getInitialState = (): AuthState => {
  return {
    auth: {
      isValidToken: false,
      accessToken: "",
      role:"",
    },
  };
};

const initialState: AuthState = getInitialState();

const getters: GetterTree<AuthState, RootState> = {
  isValidTokenExpired: (state: AuthState): boolean => {
    return state.auth.isValidToken;
  },
  accessToken: (state: AuthState): string => {
    return state.auth.accessToken;
  },
  userRole:(state: AuthState): string => {
    return state.auth.role;
  },
};

const mutations: MutationTree<AuthState> = {
  setAuth(state: AuthState, data: AuthState) {
    state.auth = data.auth;
  },
  resetState(state: AuthState) {
    Object.assign(state, getInitialState());
  },
};

const auth: Module<AuthState, RootState> = {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
};

export default auth;
