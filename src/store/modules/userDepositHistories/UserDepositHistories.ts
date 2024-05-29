export default {
    state: {
        userDhistories: {
            searchterm:"",
            depositstatus:"",
            depositmethod:"",
            startdate:"",
            enddate:"",
        }
    },

    mutations:{
        UPDATE_USER_DH_SRCTERM(state:any, payload:any){
            state.userDhistories.searchterm = payload;
        },
        UPDATE_USER_DH_FILTER(state:any, payload:any){
            state.userDhistories.depositstatus = payload.depositstatus;
            state.userDhistories.depositmethod = payload.depositmethod;
            state.userDhistories.startdate = payload.startdate;
            state.userDhistories.enddate = payload.enddate;
        },
    },

    actions:{
        setUserDHsrcTerm({commit}:any, payload:any){
            commit('UPDATE_USER_DH_SRCTERM', payload)
        },
        setUserDHfilter({commit}:any, payload:any){
            commit('UPDATE_USER_DH_FILTER', payload)
        },
    },
}