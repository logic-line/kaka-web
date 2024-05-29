<template> 
    <ul class="bg-white dark:bg-black80">
        <li>
            <router-link @click="changeProfileModalShow" to="/profile" class="flex items-center cursor-pointer hover:bg-kakaPrimary text-black100 hover:dark:text-black100 hover:text-black100 dark:text-secondary py-2 px-4">
                {{ $t('message.profile') }}
            </router-link>
        </li>
        <li>
            <router-link @click="changeProfileModalShow" to="/preference" class="flex items-center cursor-pointer hover:bg-kakaPrimary text-black100 hover:dark:text-black100 hover:text-black100 dark:text-secondary py-2 px-4">
                {{ $t('message.preference') }}
            </router-link>
        </li>
        <li>
            <router-link @click="changeProfileModalShow" to="/security" class="flex items-center cursor-pointer hover:bg-kakaPrimary text-black100 hover:dark:text-black100 hover:text-black100 dark:text-secondary py-2 px-4">
                {{ $t('message.security') }}
            </router-link>
        </li>
        <li>
            <router-link @click="changeProfileModalShow" to="/kyc-verifications" class="flex items-center cursor-pointer hover:bg-kakaPrimary text-black100 hover:dark:text-black100 hover:text-black100 dark:text-secondary py-2 px-4">
                {{ $t('message.kyc-verifications') }}
            </router-link>
        </li>
        <li>
            <router-link @click="changeProfileModalShow" to="/referral" class="flex items-center cursor-pointer hover:bg-kakaPrimary text-black100 hover:dark:text-black100 hover:text-black100 dark:text-secondary py-2 px-4">
                {{ $t('message.referral-link') }}
            </router-link>
        </li>
        <li>
            <router-link @click="changeProfileModalShow" to="/referral/users" class="flex items-center cursor-pointer hover:bg-kakaPrimary text-black100 hover:dark:text-black100 hover:text-black100 dark:text-secondary py-2 px-4">
                {{ $t('message.referral-users') }}
            </router-link>
        </li>
        <li>
            <router-link @click="changeProfileModalShow" to="/refferal/earnings" class="flex items-center cursor-pointer hover:bg-kakaPrimary text-black100 hover:dark:text-black100 hover:text-black100 dark:text-secondary py-2 px-4">
                {{ $t('message.referral-earnings') }}
            </router-link>
        </li>
        <li>
            <router-link @click="changeProfileModalShow" to="/bank-accounts" class="flex items-center cursor-pointer hover:bg-kakaPrimary text-black100 hover:dark:text-black100 hover:text-black100 dark:text-secondary py-2 px-4">
                {{ $t('message.my-banks') }}
            </router-link>
        </li>
        <li>
            <router-link @click="changeProfileModalShow" to="/bank-accounts/create" class="flex items-center cursor-pointer hover:bg-kakaPrimary text-black100 hover:dark:text-black100 hover:text-black100 dark:text-secondary py-2 px-4">
                {{ $t('message.add-new-bank') }}
            </router-link>
        </li>
        <li>
            <router-link @click="changeProfileModalShow" to="/activities" class="flex items-center cursor-pointer hover:bg-kakaPrimary text-black100 hover:dark:text-black100 hover:text-black100 dark:text-secondary py-2 px-4">
                {{ $t('message.recent-activities') }}
            </router-link>
        </li>
        <li>
            <div @click="logout" class="flex cursor-pointer hover:bg-kakaPrimary text-black100 hover:dark:text-black100 hover:text-black100 dark:text-secondary py-2 px-4">
                {{ $t('message.logout') }}
            </div>
        </li>
    </ul> 
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs,} from 'vue'
import { useRouter } from 'vue-router';
import config from '../../config';
import { FetchData } from '../../utils/fetch-utils';
import { useStore } from 'vuex';


export default defineComponent({
    name:'ProfileOptions',

    setup(){
        const router = useRouter()
        const store = useStore();
        const changeProfileModalShow=()=>{
            store.dispatch("setProfileShowModalValue", false)
        }
        const logout=()=>{
            const url = config.authUrl+'/logout?accessToken=' + store.getters["auth/accessToken"];
            const method = "GET";
            FetchData(url, method, false, false)
            .then((result:any) => {
                if (result.error) {
                } else {
                    if(result.data){
                        localStorage.removeItem('vuex');
                        const isAuthenticated = store.getters["auth/isValidTokenExpired"];
                        store.dispatch("auth/resetAuthState")
                        router.push({ path: "/signin" });
                    }
                }
            }); 
            
        }

        return {
            logout,changeProfileModalShow
        }
    }
})
</script>