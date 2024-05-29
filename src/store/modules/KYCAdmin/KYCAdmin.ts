export default {
    state: {
        kycAdminFilter: {
            status:"",
            documenttype:"",
            searchterm: ""
        }
    },

    mutations:{
        UPDATE_ADMIN_KYC_FILTER(state:any, payload:any){
            state.kycAdminFilter.status = payload.status;
            state.kycAdminFilter.documenttype = payload.documenttype;
        },
        UPDATE_ADMIN_KYC_SRCTERM(state:any, payload:any){
            state.kycAdminFilter.searchterm = payload;
        },
    },

    actions:{
        setKYCAdminFilter({commit}:any, payload:any){
            commit('UPDATE_ADMIN_KYC_FILTER', payload)
        },
        setKYCAdminSrcTerm({commit}:any, payload:any){
            commit('UPDATE_ADMIN_KYC_SRCTERM', payload)
        },
    },
}