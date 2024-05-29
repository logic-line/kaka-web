export default {
    state: {
        paymentMethodFilter: {
            searchterm:"",
            IsActive:"",
        }
    },

    mutations:{
        UPDATE_PAYMENT_METHOD_SRCTERM(state:any, payload:any){
            state.paymentMethodFilter.searchterm = payload;
        },
        UPDATE_PAYMENT_METHOD_STATUS(state:any, payload:any){
            state.paymentMethodFilter.IsActive = payload;
        },
    },

    actions:{
        setPaymentMethodSrcTerm({commit}:any, payload:any){
            commit('UPDATE_PAYMENT_METHOD_SRCTERM', payload)
        },
        setPaymentMethodStatus({commit}:any, payload:any){
            commit('UPDATE_PAYMENT_METHOD_STATUS', payload)
        },
    },
}