export default {
    state: {
        filter: {
            status:"",
            searchterm:"",
            roleid:"",
        }
    },

    mutations:{
        UPDATE_FILTER(state:any, payload:any){
            state.filter.status = payload.status;
            state.filter.roleid = payload.roleid;
        },
        UPDATE_SRCTERM(state:any, payload:any){
            state.filter.searchterm = payload;
        },
    },

    actions:{
        setUserFilter({commit}:any, payload:any){
            commit('UPDATE_FILTER', payload)
        },
        setUserSrcTerm({commit}:any, payload:any){
            commit('UPDATE_SRCTERM', payload)
        },
        
    },
}