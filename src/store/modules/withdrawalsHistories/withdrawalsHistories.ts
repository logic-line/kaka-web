export default {
    state: {
        withdrawalsHistoryfilter: {
            withdrawalstatus:'',
            searchterm:''
        }
    },

    mutations:{
        UPDATE_HISTORY_FILTER(state:any, payload:any){
            state.withdrawalsHistoryfilter.withdrawalstatus = payload.withdrawalstatus;
        },
        UPDATE_HISTORY_SRCTERM(state:any, payload:any){
            state.withdrawalsHistoryfilter.searchterm = payload;
        },
    },

    actions:{
        setWithrawalHistoriesFilter({commit}:any, payload:any){
            commit('UPDATE_HISTORY_FILTER', payload)
        },
        setWithrawalHistoriesSrcTerm({commit}:any, payload:any){
            commit('UPDATE_HISTORY_SRCTERM', payload)
        },
    },
}