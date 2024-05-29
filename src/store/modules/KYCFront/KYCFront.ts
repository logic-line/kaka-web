export default {
    
    state: {
        kycFrontFilter: {
            status:"",
            documenttype:"",
            searchterm:""
        }
    },

    mutations:{
        UPDATE_FRONT_FILTER(state:any, payload:any){
            state.kycFrontFilter.status = payload.status;
            state.kycFrontFilter.documenttype = payload.documenttype;
        },
        UPDATE_FRONT_SRCTERM(state:any, payload:any){
            state.kycFrontFilter.searchterm = payload;
        },
    },

    actions:{
        setKYCFrontFilter({commit}:any, payload:any){
            commit('UPDATE_FRONT_FILTER', payload)
        },
        setKYCFrontSrcTerm({commit}:any, payload:any){
            commit('UPDATE_FRONT_SRCTERM', payload)
        },
    },
}