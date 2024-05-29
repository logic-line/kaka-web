export default {
    state: {
        withdrawalReviewFilter: {
            withdrawalstatus:"",
            searchterm: ""
        }
    },

    mutations:{
        UPDATE_REVIEW_FILTER(state:any, payload:any){
            state.withdrawalReviewFilter.withdrawalstatus = payload.withdrawalstatus;
        },
        UPDATE_REVIEW_SRCTERM(state:any, payload:any){
            state.withdrawalReviewFilter.searchterm = payload;
        },
    },

    actions:{
        setWithrawalReviewFIlter({commit}:any, payload:any){
            commit('UPDATE_REVIEW_FILTER', payload)
        },
        setWithrawalReviewSrcTerm({commit}:any, payload:any){
            commit('UPDATE_REVIEW_SRCTERM', payload)
        },
    },
}