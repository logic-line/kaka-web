import { InvitedUser } from "@/types/user";
import UserService from "@/services/user";
import config from "@/config";
import UserMockService from "@/mock/user";
let mockService = new UserMockService();

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    createUser(commit: any, payload: InvitedUser) {
      if (config.mock=='true') {
        mockService.FetchCreateUser(payload).then((users: any) => {
        });
      } else {
        
      }
    },
  },
};
