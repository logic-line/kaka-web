export default {
    state: {
        userTradeHistoriesFilter: {
            takerfeetype: '',
            makerfeetype: '',
            searchterm: ''
        }
    },

    mutations:{
        UPDATE_USER_TRADE_HISTORIES_FILTER(state:any, payload:any){
            state.userTradeHistoriesFilter.takerfeetype = payload.takerfeetype;
            state.userTradeHistoriesFilter.makerfeetype = payload.makerfeetype;
        },
        UPDATE_USER_TRADE_HISTORIES_SRCTERM(state:any, payload:any){
            state.userTradeHistoriesFilter.searchterm = payload;
        },
    },

    actions:{
        setUserTradeHistoriesFIlter({commit}:any, payload:any){
            commit('UPDATE_USER_TRADE_HISTORIES_FILTER', payload)
        },
        setUserTradeHistoresSrcTerm({commit}:any, payload:any){
            commit('UPDATE_USER_TRADE_HISTORIES_SRCTERM', payload)
        },
    },
}