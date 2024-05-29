
import { settingModal } from './settingModal'

export default {
    state:{
        defaultSetting: {
            smtp:'',
            email:'',
        } as settingModal,
        loading: false
    },

    mutations:{
        SET_DEFAULT_SETTING(state:any, payload:any){
            state.defaultSetting.smtp = payload;
        },
        UPDATE_DEFAULT_SETTING(state:any, payload:any){
            state.defaultSetting = {};
            state.defaultSetting.smtp = payload;
        },
        LOADING_ON(state:any, payload:any){
            state.loading = true
        },
        LOADING_OFF(state:any, payload:any){
            state.loading = false
        }
    },
    actions:{
        defaultSetting({commit}:any, payload:any){
            commit('SET_DEFAULT_SETTING', payload)
        },
        updateDefaultSetting({commit}:any, payload:any){
            commit('UPDATE_DEFAULT_SETTING', payload)
        },
    },
}
