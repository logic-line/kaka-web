<template>
    <div class="py-20 dark:bg-black80">
        <div class="custom-max-width">
            <div class="flex flex-wrap -mx-4">
               <div class="xl:w-1/5 md:w-1/3 sm:w-1/2 w-full xl:px-4 px-6">
                    <div>
                        <img class="w-20 dark:block hidden mx-auto sm:mx-0" src="@/assets/images/Logo-white.png" alt="">
                        <img class="w-20 dark:hidden block mx-auto sm:mx-0" src="@/assets/images/Logo-dark.png" alt="">
                        <p class="text-base dark:text-white text-black90 my-6 text-center sm:text-start">{{ $t('message.if-you-are-accounts') }}</p>
                        <ul class="flex items-center sm:justify-start justify-center space-x-4">
                            <li v-for="(data,index) in socialIconUrl" :key="index">
                                <a target="_blank" :href="socialIconhref[index]">
                                     <img :src="data" alt="">
                                </a>
                            </li>
                        </ul>
                        <div class="flex items-center sm:justify-start justify-center">
                            <router-link to="/signin" class="ces-btn font-normal mt-6 bg-kakaPrimary">{{ $t('message.sign-in-now') }}</router-link>
                        </div>
                    </div>
               </div>
               <div class="xl:w-1/5 md:w-1/3 sm:w-1/2 w-full xl:px-4 px-6">
                    <div>
                        <h4 class="text-black100 dark:text-white text-2xl mt-10 sm:mt-0 text-center sm:text-start">{{ $t('message.about-ces') }}</h4>
                        <ul class="mt-5">
                            <li class="dark:text-white my-2 first:mt-0 last:mb-0 text-black90 text-sm text-center sm:text-start">
                                <router-link to="/about-us">{{ $t('message.about-us') }}</router-link>
                            </li>
                            <li class="dark:text-white my-2 first:mt-0 last:mb-0 text-black90 text-sm text-center sm:text-start">
                                <router-link to="">{{ $t('message.referral-programs') }}</router-link>
                            </li>
                            <li class="dark:text-white my-2 first:mt-0 last:mb-0 text-black90 text-sm text-center sm:text-start">
                                <router-link to="/privacy-policy">{{ $t('message.privacy-policy') }}</router-link>
                            </li>
                            <li class="dark:text-white my-2 first:mt-0 last:mb-0 text-black90 text-sm text-center sm:text-start">
                                <router-link to="/terms-and-condition">{{ $t('message.tearms-and-condition') }}</router-link>
                            </li>
                            <li class="dark:text-white my-2 first:mt-0 last:mb-0 text-black90 text-sm text-center sm:text-start">
                                <router-link to="">{{ $t('message.fee') }}</router-link>
                            </li>
                        </ul>
                    </div>
               </div>
               <div class="xl:w-1/5 md:w-1/3 sm:w-1/2 w-full xl:px-4 px-6">
                    <div>
                        <h4 class="text-black100 dark:text-white text-2xl mt-10 md:mt-0 text-center sm:text-start">{{ $t('message.products') }}</h4>
                        <ul class="mt-5">
                            <li class="dark:text-white my-2 first:mt-0 last:mb-0 text-black90 text-sm text-center sm:text-start">
                                <router-link to="/exchange">{{ $t('message.exchange') }}</router-link>
                            </li>
                            <li class="dark:text-white my-2 first:mt-0 last:mb-0 text-black90 text-sm text-center sm:text-start">
                                <router-link to="">{{ $t('message.public-api') }}</router-link>
                            </li>
                            <li class="dark:text-white my-2 first:mt-0 last:mb-0 text-black90 text-sm text-center sm:text-start">
                                <router-link to="">{{ $t('message.private-api') }}</router-link>
                            </li>
                            <li class="dark:text-white my-2 first:mt-0 last:mb-0 text-black90 text-sm text-center sm:text-start">
                                <router-link to="/blog">{{ $t('message.blog') }}</router-link>
                            </li>
                            <li class="dark:text-white my-2 first:mt-0 last:mb-0 text-black90 text-sm text-center sm:text-start">
                                <router-link to="/announcement">{{ $t('message.announcement') }}</router-link>
                            </li>
                        </ul>
                    </div>
               </div>
               <div class="xl:w-1/5 md:w-1/3 sm:w-1/2 w-full xl:px-4 px-6 mt-10 xl:mt-0">
                    <div>
                        <h4 class="text-black100 dark:text-white text-2xl text-center sm:text-start">{{ about }}</h4>
                        <ul class="mt-5">
                            <li class="dark:text-white my-2.5 first:mt-0 last:mb-0 text-black90 text-sm text-center sm:text-start">
                                
                                <router-link class="flex items-center sm:justify-start justify-center space-x-2" to="/contact-us">
                                    <svg   svg class="w-5 h-5" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 40 32" enable-background="new 0 0 40 32" xml:space="preserve" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="1"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="currentColor" d="M34.91,14.667c-0.067-3.497-1.359-6.884-3.691-9.549c-2.84-3.248-6.938-5.111-11.242-5.111 c-4.311,0-8.408,1.859-11.242,5.1c-2.355,2.693-3.63,6.121-3.673,9.651c-2.922,0.5-5.084,2.941-5.124,5.919 c-0.012,0.042-0.018,0.086-0.018,0.13C-0.08,24.222,2.672,27,6.055,27h4.539c2.056,3.03,5.527,5,9.383,5 c5.647,0,10.476-4.221,11.229-9.819l0.758-5.633c0.466-3.458-0.585-6.948-2.882-9.574s-5.615-4.133-9.104-4.133 s-6.808,1.506-9.104,4.133S7.524,13.09,7.99,16.548l0.758,5.633c0.184,1.37,0.616,2.656,1.24,3.819H7.919 c-0.486-1.093-0.824-2.292-0.996-3.573l-0.758-5.631c-0.064-0.474-0.099-0.948-0.114-1.421c0.037-0.078,0.062-0.162,0.053-0.255 c-0.005-0.059-0.026-0.113-0.05-0.163C6.05,11.598,7.248,8.325,9.486,5.766c2.645-3.024,6.468-4.758,10.49-4.758 c4.017,0,7.84,1.738,10.49,4.769c2.22,2.538,3.429,5.777,3.445,9.11C33.887,14.94,33.87,15,33.865,15.063 c-0.008,0.088,0.009,0.173,0.043,0.248c-0.013,0.503-0.053,1.007-0.12,1.511l-0.758,5.661c-0.205,1.526-0.607,2.936-1.076,3.772 c-0.086,0.155-0.085,0.344,0.005,0.498C32.049,26.906,32.213,27,32.391,27h1.555C37.284,27,40,24.215,40,20.735 C40,17.674,37.846,15.15,34.91,14.667z M9.738,22.047L8.98,16.415c-0.426-3.172,0.537-6.373,2.645-8.782 c2.106-2.409,5.15-3.791,8.352-3.791s6.245,1.382,8.352,3.791c2.107,2.41,3.07,5.61,2.645,8.782l-0.758,5.633 C29.527,27.151,25.126,31,19.977,31c-3.272,0-6.238-1.557-8.145-4H15c0.018,0,0.032-0.008,0.049-0.01 C15.278,28.134,16.289,29,17.5,29h4c1.379,0,2.5-1.122,2.5-2.5S22.879,24,21.5,24h-4c-1.211,0-2.222,0.866-2.451,2.01 C15.032,26.008,15.018,26,15,26h-3.853C10.429,24.819,9.932,23.486,9.738,22.047z M16,26.5c0-0.827,0.673-1.5,1.5-1.5h4 c0.827,0,1.5,0.673,1.5,1.5S22.327,28,21.5,28h-4C16.673,28,16,27.327,16,26.5z M6.836,26H6.055c-2.804,0-5.091-2.285-5.134-5.111 c0.01-0.041,0.016-0.083,0.016-0.125c0-2.472,1.75-4.516,4.145-4.996c0.022,0.387,0.041,0.774,0.093,1.162l0.758,5.631 C6.096,23.78,6.404,24.93,6.836,26z M33.945,26h-0.767c0.37-0.917,0.673-2.12,0.842-3.384l0.758-5.661 c0.058-0.425,0.097-0.851,0.117-1.275C37.271,16.145,39,18.228,39,20.792C39,23.664,36.732,26,33.945,26z"></path> </g> </g></svg>
                                    <p>{{ $t('message.contact-us-now') }}</p>
                                </router-link>
                            </li>
                            <li class="dark:text-white my-2.5 flex items-center sm:justify-start justify-center space-x-2 first:mt-0 last:mb-0 text-black90 text-sm text-center sm:text-start">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg>
                                <a :href="'mailto:'+email">{{ email }}</a>
                            </li>
                            <li class="dark:text-white my-2.5 flex items-center sm:justify-start justify-center space-x-2 first:mt-0 last:mb-0 text-black90 text-sm text-center sm:text-start">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                <p>{{ address }}</p>
                            </li>
                            <li class="dark:text-white my-2.5 flex items-center sm:justify-start justify-center space-x-2 first:mt-0 last:mb-0 text-black90 text-sm text-center sm:text-start">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                </svg>
                                <p>{{ phonenumber }}</p>
                            </li>
                        </ul>
                    </div>
               </div>
               <div class="xl:w-1/5 md:w-1/3 sm:w-1/2 w-full xl:px-4 px-6 mt-10 xl:mt-0">
                    <div>
                        <h4 class="text-black100 dark:text-white text-2xl text-center sm:text-start">{{ $t('message.trade-on-the-CES') }}</h4>
                        <img class="w-24 my-6 mx-auto sm:mx-0" src="../../../assets/images/qr--code.png" alt="">
                        <p class="dark:text-secondary text-black90 text-center sm:text-start">{{ $t('message.scan-the-app') }}</p>
                    </div>
               </div>
            </div>
        </div>  
      </div>
</template>

<script >
import { defineComponent, ref, reactive, onMounted, toRefs, computed} from 'vue';
import { AllowedSettingData, GetSetting } from "../../../utils/settings-utils"
import { log } from 'mathjs';
export default defineComponent({
    components : {defineComponent,toRefs},
    setup(){
        const state = reactive({
            email : '',
            phonenumber : '',
            address : '',
            about : '',
            socialIcon : [
                {
                    id : 1,
                    name : 'youtube.svg',
                    href : 'https://www.youtube.com'
                },
                {
                    id : 2,
                    name : 'facebook.svg',
                    href : 'https://www.facebook.com'
                },
                {
                    id : 3,
                    name : 'twitter.svg',
                    href : 'https://www.twitter.com'
                },
            ],
            socialIconUrl : [

            ],
            socialIconhref : [

            ],
 
        })
        async function getIsRefferelTrue() {
        let Email = await GetSetting(AllowedSettingData.Email.Slug, AllowedSettingData.Email.SettingsGroup)
        state.email = Email
        let phoneNumber = await GetSetting(AllowedSettingData.PhoneNumber.Slug, AllowedSettingData.PhoneNumber.SettingsGroup)
        state.phonenumber = phoneNumber
        let Address = await GetSetting(AllowedSettingData.Address.Slug, AllowedSettingData.Address.SettingsGroup)
        state.address = Address
        let About = await GetSetting(AllowedSettingData.About.Slug, AllowedSettingData.About.SettingsGroup)
        state.about = About
    }
        onMounted(()=>{
            getIsRefferelTrue()
             for(let i = 0; i < state.socialIcon.length; i++){
                state.socialIconUrl.push(require(`@/assets/images/${state.socialIcon[i].name}`))
                state.socialIconhref.push(state.socialIcon[i].href)
            }
        })
        return {
            ...toRefs(state)
        }
    }
})
</script>