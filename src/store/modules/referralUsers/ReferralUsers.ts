export default {
    state: {
        referralUserFilter: {
            status:"",
            searchterm:"",
        }
    },

    mutations:{
        UPDATE_R_USER_FILTER(state:any, payload:any){
            state.referralUserFilter.status = payload.status;
        },
        UPDATE_R_USER_SRCTERM(state:any, payload:any){
            state.referralUserFilter.searchterm = payload;
        },
    },

    actions:{
        setReferralUserFilter({commit}:any, payload:any){
            commit('UPDATE_R_USER_FILTER', payload);
        },
        setReferralUserSrcTerm({commit}:any, payload:any){
            commit('UPDATE_R_USER_SRCTERM', payload);
        },
    },
}