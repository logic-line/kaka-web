export default {
    state: {
        openOrdersFilter: {
            ordercategory: '',
            type: '',
            searchterm: ''
        }
    },

    mutations:{
        UPDATE_OPEN_ORDERS_FILTER(state:any, payload:any){
            state.openOrdersFilter.ordercategory = payload.ordercategory;
            state.openOrdersFilter.type = payload.type;
        },
        UPDATE_OPEN_ORDERS_SRCTERM(state:any, payload:any){
            state.openOrdersFilter.searchterm = payload;
        },
    },

    actions:{
        setOpenOrdersFIlter({commit}:any, payload:any){
            commit('UPDATE_OPEN_ORDERS_FILTER', payload)
        },
        setOpenOrdersSrcTerm({commit}:any, payload:any){
            commit('UPDATE_OPEN_ORDERS_SRCTERM', payload)
        },
    },
}