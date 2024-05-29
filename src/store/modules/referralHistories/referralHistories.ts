export default {
    state: {
        referralHistoriesFilter: {
            searchterm: ""
        }
    },

    mutations:{
        UPDATE_REFERRAL_SRCTERM(state:any, payload:any){
            state.referralHistoriesFilter.searchterm = payload;
        },
    },

    actions:{
        setReferralHistoriesSrcTerm({commit}:any, payload:any){
            commit('UPDATE_REFERRAL_SRCTERM', payload)
        },
    },
}