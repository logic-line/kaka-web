export default {
    state: {
        myWalletFilter: {
            searchterm:"",
        }
    },

    mutations:{
        UPDATE_MY_WALLET_SRCTERM(state:any, payload:any){
            state.myWalletFilter.searchterm = payload;
        },
    },

    actions:{
        setMyWalletSrcTerm({commit}:any, payload:any){
            commit('UPDATE_MY_WALLET_SRCTERM', payload)
        },
    },
}