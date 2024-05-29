export default {
    state: {
        receneActivityFilter: {
            searchterm: ""
        }
    },

    mutations:{
        UPDATE_ACTIVITIES_SRCTERM(state:any, payload:any){
            state.receneActivityFilter.searchterm = payload;
        },
    },

    actions:{
        setUserActvitiesSrcTerm({commit}:any, payload:any){
            commit('UPDATE_ACTIVITIES_SRCTERM', payload)
        },
    },
}