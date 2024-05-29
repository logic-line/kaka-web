export default {
    state: {
        filter: {
            startdate:"",
            enddate:"",
            searchterm:"",
        }
    },

    mutations:{
        UPDATE_FILTER(state:any, payload:any){
            state.filter.startdate = payload.startdate;
            state.filter.enddate = payload.enddate;
        },
        UPDATE_SRCTERM(state:any, payload:any){
            state.filter.searchterm = payload;
        },
    },

    actions:{
        setBlogFilter({commit}:any, payload:any){
            commit('UPDATE_FILTER', payload)
        },
        setBlogSrcTerm({commit}:any, payload:any){
            commit('UPDATE_SRCTERM', payload)
        },
    },
}