import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueClickAway from "vue3-click-away";
import './assets/tailwind.css'
import './assets/css/font.css'
import PortalVue from 'portal-vue'
import { createI18n } from 'vue-i18n'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';

import English from '@/lang/english.json';
import French from '@/lang/french.json';
import Portuguese from '@/lang/portuguese.json';

const messages = {
    english: { message: English },
    french: { message: French },
    portuguese: { message: Portuguese },
}

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('language') || 'english',
    fallbackLocale: 'english',
    messages,
})


createApp(App).use(PortalVue).use(store).use(router).use(VueClickAway).use(i18n).use(Vue3Toastify, { autoClose: 3000, } as ToastContainerOptions).mount('#app')
