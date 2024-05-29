export default {
    state: {
        filter: {
            status:"",
            importance:"",
            searchterm:"",
        }
    },

    mutations:{
        UPDATE_FILTER(state:any, payload:any){
            state.filter.status = payload.status;
            state.filter.importance = payload.importance;
        },
        UPDATE_SRCTERM(state:any, payload:any){
            state.filter.searchterm = payload;
        },
    },

    actions:{
        setAnnouncementFilter({commit}:any, payload:any){
            commit('UPDATE_FILTER', payload)
        },
        setAnnouncementSrcTerm({commit}:any, payload:any){
            commit('UPDATE_SRCTERM', payload)
        },
    },
}