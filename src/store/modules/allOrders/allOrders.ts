export default {
    state: {
        allOrdersFilter: {
            status:'',
            ordercategory: '',
            type: '',
            searchterm: ''
        }
    },

    mutations:{
        UPDATE_ALLORDERS_FILTER(state:any, payload:any){
            state.allOrdersFilter.status = payload.status;
            state.allOrdersFilter.ordercategory = payload.ordercategory;
            state.allOrdersFilter.type = payload.type;
        },
        UPDATE_ALLORDERS_SRCTERM(state:any, payload:any){
            state.allOrdersFilter.searchterm = payload;
        },
    },

    actions:{
        setAllOrdersFIlter({commit}:any, payload:any){
            commit('UPDATE_ALLORDERS_FILTER', payload)
        },
        setAllOrdersSrcTerm({commit}:any, payload:any){
            commit('UPDATE_ALLORDERS_SRCTERM', payload)
        },
    },
}