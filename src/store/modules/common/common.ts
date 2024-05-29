import NotificationService from "@/services/notification";
import { ListFilterRequest } from "@/types/notification";

export default {
    state: {
        isError: false,
        code: 0,
        isProfileDropdownShow: false,
        isUniqueErrorModalShow: false,
        error: '',
        unreadNotificationCount: 0,
        unreadNotifications: [],
    },

    mutations: {
        UPDATE_ERROR_STATUS(state: any, payload: any) {
            state.isError = payload;
        },
        UPDATE_UNIQUE_ERROR_STATUS(state: any, payload: any) {
            state.isUniqueErrorModalShow = payload;
        },
        UPDATE_ERROR_CODE(state: any, payload: any) {
            state.code = payload;
        },
        UPDATE_ERROR(state: any, payload: any) {
            state.error = payload;
        },
        UPDATE_PROFILE_SHOW_VALUE(state: any, payload: any) {
            state.isProfileDropdownShow = payload;
        },
        UPDATE_NOTIFICATIONS(state: any) {
            let payload: ListFilterRequest = {
                SortBy: "",
                SortByColumn: "",
                Status: '0',
                SearchTerm: "",
                StartDate: "",
                EndDate: "",
                IsRead: "FALSE",
            };

            new NotificationService().listOfNotifications(payload).then((response: any) => {
                if (response !== undefined && response.Data !== undefined) {
                    state.isError = false
                    state.unreadNotifications = response.Data.Notification;
                    state.unreadNotificationCount = response.Total
                }
            }).catch((error) => {

            });
            state.unreadNotifications = payload;
        },
    },

    actions: {
        setErrorStatus({ commit }: any, payload: any) {
            commit('UPDATE_ERROR_STATUS', payload)
        },
        setUniqueErrorStatus({ commit }: any, payload: any) {
            commit('UPDATE_UNIQUE_ERROR_STATUS', payload)
        },
        setErrorCode({ commit }: any, payload: any) {
            commit('UPDATE_ERROR_CODE', payload)
        },
        setError({ commit }: any, payload: any) {
            commit('UPDATE_ERROR', payload)
        },
        setProfileShowModalValue({ commit }: any, payload: any) {
            commit('UPDATE_PROFILE_SHOW_VALUE', payload)
        },
        setUpdatedNotifications({ commit }: any) {
            commit('UPDATE_NOTIFICATIONS')
        },
    },
}