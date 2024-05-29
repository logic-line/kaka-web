export default {
    
    state: {
        myBankFilter: {
            isactive:"",
            isverified:"",
            searchterm:""
        }
    },

    mutations:{
        UPDATE_MY__BANK_FILTER(state:any, payload:any){
            state.myBankFilter.isactive = payload.isactive;
            state.myBankFilter.isverified = payload.isverified;
        },
        UPDATE_MY__BANK_SRCTERM(state:any, payload:any){
            state.myBankFilter.searchterm = payload;
        },
    },

    actions:{
        setMyBankFilter({commit}:any, payload:any){
            commit('UPDATE_MY__BANK_FILTER', payload)
        },
        setMyBankSrcTerm({commit}:any, payload:any){
            commit('UPDATE_MY__BANK_SRCTERM', payload)
        },
    },
}