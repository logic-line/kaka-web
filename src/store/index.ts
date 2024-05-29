import { createStore } from "vuex";

import user from "./modules/user/user";
import setting from "./modules/setting/setting";
import auth, { AuthState } from "./modules/auth";
import announcement from "./modules/announcement/announcement";
import withdrawalsHistories from "./modules/withdrawalsHistories/withdrawalsHistories"; 
import KYCAdmin from "./modules/KYCAdmin/KYCAdmin";
import KYCFront from "./modules/KYCFront/KYCFront";
import recentActivities from "./modules/recentActivities/recentActivities";
import referralHistories from "./modules/referralHistories/referralHistories";
import blog from "./modules/blog/blog";
import createPersistedState from "vuex-persistedstate";
import usermanagement from "./modules/usermanagement/usermanagement";
import withdrawalsReview from "./modules/withdrawalsReview/withdrawalsReview";
import allOrders from "./modules/allOrders/allOrders";
import userTradeHistores from "./modules/userTradeHistories/userTradeHistores";
import openOrder from "./modules/openOrder/openOrder";
import myWallet from "./modules/myWallet/myWallet";
import ReferralUsers from "./modules/referralUsers/ReferralUsers";
import UserDepositHistories from "./modules/userDepositHistories/UserDepositHistories";
import myBank from "./modules/myBank/myBank";
import paymentMethod from "./modules/paymentMethod/paymentMethod";
import common from "./modules/common/common";

export interface RootState {
  auth: AuthState;
}

const store = createStore({
  plugins: [createPersistedState()],
  modules: { 
    common, auth, user, setting, announcement, withdrawalsHistories, KYCAdmin, KYCFront,  
    recentActivities, referralHistories, usermanagement, blog, withdrawalsReview,myWallet, allOrders, userTradeHistores, openOrder, ReferralUsers, UserDepositHistories,myBank,paymentMethod
  }
});
export default store;
