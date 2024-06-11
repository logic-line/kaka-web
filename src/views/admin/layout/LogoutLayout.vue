<template>
    <div class="">
      <div class="bg-white dark:bg-black h-screen relative z-0">
        <!-- header start -->
        <div class="flex items-center justify-between px-6 py-4 custom-shodow-one w-full sticky top-0 left-0 bg-kakaPrimary dark:bg-black z-90">
          <div class="sm:w-64 py-4 ">
              <div class="flex lg:justify-between">
                <div class="lg:block hidden">
                  <router-link to="/home" class="main-route">
                    <img class="w-32 dark:block hidden" src="@/assets/images/kaka.svg" alt="">
                  </router-link>
                  <router-link to="/home" class="main-route">
                    <img class="w-32 dark:hidden block" src="@/assets/images/kaka.svg" alt="">
                  </router-link>
                </div>
                  <router-link to="/home" class="main-route">
                    <img class="w-20 md:w-10 lg:hidden block" src="@/assets/images/kaka.svg" alt="">
                  </router-link>
              </div>
          </div>
          <div class="head-width flex items-center justify-between">
            
             <div class="lg:w-8/12 w-full ml-auto">
                <div class="flex items-center justify-end">
                  
                  <ul class="flex items-center justify-end">
                      <li v-if="!authData.isValidToken" class="pr-4 block">
                          <router-link class="block cursor-pointer hover:bg-black  text-white dark:text-secondary py-2 px-4" to="/signin">
                            {{ $t('message.login') }} 
                          </router-link>
                      </li>
                  </ul>
                </div>
            </div>
          </div>
        </div>
        <!-- header end -->
        <!-- sidebar -->
        <div class="flex">
      
          <!-- sidebar end -->
    
          <div id="main-content" class="w-full bg-white dark:bg-black100 dark:text-white custom-height-screen overflow-y-scroll shadow-md">
            <router-view :key="$route.fullPath" class="min-h-[calc(100vh-161px)]"></router-view>
            <footer class="text-center bg-gray-100 dark:bg-black dark:text-white border-t border-transparent dborder-t dark:border-gray-800">
              <p class="p-4">&copy; All rights reserved by KAKA.</p>
            </footer>
          </div>
        </div>
  
    
      </div>
      <!-- mobile responsive menu -->
      
      <Transition>
        <div v-if="mobile_menu_show" class="w-72 h-screen flex flex-col flex-wrap bg-white dark:bg-black90 absolute top-0 right-0 shadow-md">
          <div class="p-4 relative w-full">
            <img class="w-32 dark:block hidden" src="@/assets/images/Logo-white.png" alt="">
            <img class="w-32 dark:hidden block" src="@/assets/images/Logo-dark.png" alt="">
            <svg @click="mobile_menu_show = false" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 absolute hover:text-red-500 duration-300 right-4 top-4 dark:text-white dark:hover:text-red-500 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <ul class="block 2xl:hidden overflow-y-auto w-full flex-1">
              <li class="sm:hidden">
                <div @click="profileDropDown = !profileDropDown" class="profile-btn flex justify-between items-center px-4 py-3.5 hover:bg-kakaPrimary text-black100 hover:text-white dark:text-secondary cursor-pointer" :class="profileDropDown ? 'bg-kakaPrimary text-white' : ''">
                  <p class="pr-2">{{ $t('message.profile') }}</p>
                  <svg :class="profileDropDown ? 'rotate-180': ''" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentcolor" class="duration-300 w-3 h-3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
                <transition name="menuAccordion"
                            @enter="enter"
                            @after-enter="afterEnter"
                            @leave="leave"
                        >
                        <div v-if="profileDropDown" class="profile-body overflow-hidden block sm:hidden">
                          <div class="ml-4 my-4">
                            <profile-for-mobile></profile-for-mobile>
                          </div>
                        </div>
              </transition>
              </li>
              <li class="2xl:hidden">
                  <div @click="orderDropdown = ! orderDropdown" class="order-btn flex justify-between items-center px-4 py-3.5 hover:bg-kakaPrimary text-black100 hover:text-white dark:text-secondary cursor-pointer" :class="orderDropdown ? 'bg-kakaPrimary text-white' : ''">
                      <p class="pr-2">{{ $t('message.orders') }}</p>
                      <svg :class="orderDropdown ? 'rotate-180': ''" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentcolor" class="duration-300 w-3 h-3">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                  </div>
    
                  <transition name="menuAccordion"
                              @enter="enter"
                              @after-enter="afterEnter"
                              @leave="leave">
                              
                        <div v-if="orderDropdown" class="activity-body overflow-hidden block 2xl:hidden">
                          <ul class="my-4">
                            <li>
                                  <router-link to="/open-orders" class="flex items-center cursor-pointer hover:bg-kakaPrimary text-black100 hover:text-white dark:text-secondary py-2 px-4">
                                    {{ $t('message.open-orders') }}
                                  </router-link>
                              </li>
                              <li>
                                  <router-link to="/orders" class="flex items-center cursor-pointer hover:bg-kakaPrimary text-black100 hover:text-white dark:text-secondary py-2 px-4">
                                    {{ $t('message.all-orders') }}
                                  </router-link>
                              </li>
                              <li>
                                  <router-link to="/trade-history" class="flex items-center cursor-pointer hover:bg-kakaPrimary text-black100 hover:text-white dark:text-secondary py-2 px-4">
                                    {{ $t('message.trade-history') }}
                                  </router-link>
                              </li>
                          </ul>
                        </div>
                  </transition>
              </li>
              <li class="2xl:hidden">
                  <div @click="supportDropdown = ! supportDropdown" class="support-btn flex justify-between items-center px-4 py-3.5 hover:bg-kakaPrimary text-black100 hover:text-white dark:text-secondary cursor-pointer" :class="supportDropdown ? 'bg-kakaPrimary text-white' : ''">
                      <p class="pr-2">{{ $t('message.support') }}</p>
                      <svg :class="supportDropdown ? 'rotate-180': ''" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentcolor" class="duration-300 w-3 h-3">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                  </div>
    
                  <transition name="menuAccordion"
                              @enter="enter"
                              @after-enter="afterEnter"
                              @leave="leave">
                              
                        <div v-if="supportDropdown" class="support-body overflow-hidden block 2xl:hidden">
                          <ul class="my-4">
                            <li>
                                  <router-link to="/admin/tickets" class="flex items-center cursor-pointer hover:bg-kakaPrimary text-black100 hover:text-white dark:text-secondary py-2 px-4">
                                    {{ $t('message.support-list') }}
                                  </router-link>
                              </li>
                              <li>
                                  <router-link to="/tickets/create" class="flex items-center cursor-pointer hover:bg-kakaPrimary text-black100 hover:text-white dark:text-secondary py-2 px-4">
                                    {{ $t('message.new-support') }}
                                  </router-link>
                              </li>
                          </ul>
                        </div>
                  </transition>
              </li>
              <li class="hover:bg-kakaPrimary duration-300 text-black100 hover:text-white dark:text-secondary">
                <router-link to="/exchange" class="px-4 py-3.5 block">{{ $t('message.trade') }}</router-link>
              </li>
              <li class="hover:bg-kakaPrimary duration-300 text-black100 hover:text-white dark:text-secondary">
                <router-link to="/market" class="px-4 py-3.5 block">{{ $t('message.market') }}</router-link>
              </li>
              <li class="hover:bg-kakaPrimary duration-300 text-black100 hover:text-white dark:text-secondary">
                  <router-link to="/wallets" class="pr-2 px-4 py-3.5 block">{{ $t('message.wallets') }}</router-link>
              </li>
              <li>
                <router-link to="/blog" class="flex cursor-pointer hover:bg-kakaPrimary text-black100 hover:text-white dark:text-secondary py-3.5 px-4">{{ $t('message.blog') }}</router-link>
              </li>
            </ul>
            <ul class="inline-block md:hidden">
              <li class="flex items-center justify-center">
                <router-link to="/signin" class="inline-flex justify-center cursor-pointer text-center mt-4  duration-500 text-black100 hover:text-primary dark:text-secondary">{{ $t('message.login') }}</router-link>
              </li>
              <li class="flex items-center justify-center">
                <router-link to="/signup" class="inline-flex justify-center cursor-pointer text-center my-4 bg-kakaPrimary duration-500 text-white dark:text-secondary py-2.5 px-10">{{ $t('message.signup') }}</router-link>
              </li>
            </ul>
        </div>
      </Transition>
      <!-- mobile responsive menu -->
       <UnauthorizedModal v-if="isError" :code="code"></UnauthorizedModal>  
       <UniqueFieldErrorModal v-if="isUniqueError"></UniqueFieldErrorModal>  
             
      </div>
</template>
  
<script lang="ts" setup>
  import Dropdown from '../../../components/header/Dropdown.vue';
  import Profile from '../../../components/header/Profile.vue';
  import ProfileForMobile from '../../../components/header/ProfileForMobile.vue';
  import { computed, defineComponent, onUpdated, reactive, onMounted, ref, onBeforeMount} from 'vue'
  import store from "../../../store";
  import { ListFilterRequest, UpdateNotification} from '../../../types/notification';
  import config from "../../../config";

  import NotificationService from "../../../services/notification";

  import { Languages } from "@/utils/lang-utils"
  import { AllowedSettingData,GetSetting } from "@/utils/settings-utils"
  import UnauthorizedModal from '../../../components/error/UnauthorizedModal.vue';
  import UniqueFieldErrorModal from '../../../components/error/UniqueFieldErrorModal.vue';
  
  
  import { useRouter, useRoute } from 'vue-router'
  
    const router = useRouter()
    const route = useRoute()
  

            const islogin = ref(store.state.auth.auth.isValidToken);
            const sidebarL1Menu = ref('');
            const sidebarL2Menu = ref('');
            const sidebarL3Menu = ref('');
            const KYCStatus = ref('');
            const KYCPath = ref('');

            const isSidebarButtonShow = ref(false);
            const authorRole = computed(()=>store.state.auth.auth.role);

            const isError = computed(()=>store.state.common.isError);
            const isUniqueError = computed(()=>store.state.common.isUniqueErrorModalShow);
            const code = computed(()=> store.state.common.code);

            const current_year = ref(2020)
            const hover_on_menu = ref(<String>'')
  
            const mobile_menu_show  = ref(false)
            const mobile_sidebar_show  = ref(false)
            const notification_modal = ref(false)
            const tableData  = ref([])
            const authData = ref(<any>{})
  
            const isSun = ref(false);
            const isMoon = ref(true);
  
            const orderDropdown = ref(false);
            const unreadNotificationNumber = ref([]);
            const unreadNotificationCount = ref(0);
            const supportDropdown = ref(false);
            const orderclass = ref(false);
            const supportclass = ref(false);
            const profileDropDown = computed(()=>store.state.common.isProfileDropdownShow);
            const notificationDropdown = ref(false);
            const langDropdown = ref(false);
            const isRegistration = ref(true)
            const languages = reactive(Languages)
            let currentLang = "";
  
            const systemDefaultLanguage = ref('')
  
            function handleOutSideError(dropdown:any,eventTarget:any,btn:string,content:string){
              if(!eventTarget.closest(`.${btn}`) && !eventTarget.closest(`.${content}`)){
                dropdown.value = false
              }
            }
            function profileDropDownHandle(eventTarget:any,btn:string,content:string){
              if(!eventTarget.closest(`.${btn}`) && !eventTarget.closest(`.${content}`)){
                 store.dispatch("setProfileShowModalValue", false)
              }
            }
  
            window.addEventListener('click',(e)=>{
              profileDropDownHandle(e.target,'profile-btn','profile-body')
              handleOutSideError(orderDropdown,e.target,'order-btn','activity-body')
              handleOutSideError(supportDropdown,e.target,'support-btn','support-body')
              handleOutSideError(notificationDropdown,e.target,'notification-btn','notification-body')
              handleOutSideError(langDropdown,e.target,'lang-icon','lang-body')
            })
  
        // function toggleDarkMode(){
        //     var tmp_mode = localStorage.getItem("mode_status");
        //     if(tmp_mode=='dark'){
        //       document.body.classList.remove('dark');
        //       localStorage.removeItem("mode_status");
        //       isSun.value = false
        //       isMoon.value = true
        //     } else {
        //       document.body.classList.add('dark');
        //       localStorage.setItem("mode_status", 'dark');
        //        isSun.value = true
        //         isMoon.value = false
        //     }
        // }
        
  
        function openSidebarDrop(value:any){
  
          sidebarL2Menu.value='';
          sidebarL3Menu.value='';
  
          if(sidebarL1Menu.value==''){
            sidebarL1Menu.value=value;
          } else if(sidebarL1Menu.value==value){
            sidebarL1Menu.value='';
          } else {
            sidebarL1Menu.value=value;
          }
        }
  
        function openSidebarL2Drop(value:any){
          sidebarL3Menu.value='';
          if(sidebarL2Menu.value==''){
            sidebarL2Menu.value=value;
          } else if(sidebarL2Menu.value==value){
            sidebarL2Menu.value='';
          } else {
            sidebarL2Menu.value=value;
          }
        }
  
        function openSidebarL3Drop(value:any){
          if(sidebarL3Menu.value==''){
            sidebarL3Menu.value=value;
          } else if(sidebarL3Menu.value==value){
            sidebarL3Menu.value='';
          } else {
            sidebarL3Menu.value=value;
          }
        }
  
        function openNotification(){
          notificationDropdown.value = !notificationDropdown.value;
        }
        function changeProfileModalValue(){
          if(store.state.common.isProfileDropdownShow == false){
            store.dispatch("setProfileShowModalValue", true)
          }else{
            store.dispatch("setProfileShowModalValue", false)
          }
          
        }
  
        function openLangDrop(){
          langDropdown.value = !langDropdown.value;
        }
  
        function setLanguage(val:string){
          const languageFound = languages.some(el => el.message === val);
          if (languageFound) {
            localStorage.setItem('language', val);
            window.location.reload();
          }
        }
  
        
  
        function toggelSidebar(){
          mobile_sidebar_show.value = !mobile_sidebar_show.value
        }
  
        function toggleNavMenu(){
          mobile_menu_show.value = !mobile_menu_show.value
          if(window.matchMedia('screen and (max-width: 1024px)').matches){
            mobile_sidebar_show.value = false
          }
          
        }
        
        function resizeFunction(){
          if(islogin.value == true){
            if(authorRole.value != 'user'){
              if(window.matchMedia('screen and (max-width: 1024px)').matches){
                mobile_sidebar_show.value = false
              }else{
                mobile_sidebar_show.value = true
              }
            }else{
              if(window.matchMedia('(min-width: 1280px)').matches){
                mobile_menu_show.value = false
              }
            }
          }
        }
  
        function setTabile(){
              let payload: ListFilterRequest = {
                  SortBy : "",
                  SortByColumn: "",
                  Status : '0',
                  SearchTerm : "",
                  StartDate: "",
                  EndDate: "",
                  IsRead : "",
              };
            let authPayload = store.state.auth.auth;
            if(authPayload.accessToken != ""){
              new NotificationService().listOfNotifications(payload).then((response:any)=>{
                if(response !== undefined && response.Data!==undefined){
                    tableData.value=response.Data.Notification;
                    for(let i =0 ; i < tableData.value.length; i++){
                        if(tableData.value[i].IsRead == "FALSE"){
                          unreadNotificationNumber.value.push(i)
                        }
                    }
                    unreadNotificationCount.value = unreadNotificationNumber.value.length;
                   
                }
              }).catch((error)=>{

              });
            }
          }
  
          function readNotification(e:any){ 
            if(e.IsRead == 'FALSE'){
                let payload: UpdateNotification = {
                  ID : e.ID,
                  IsRead : 'TRUE',
              };

              new NotificationService().UpdateNotificationRequest(payload).then((response:any)=>{
                if(response !== undefined && response.Data!==undefined){
                  
                }
              }).catch((error)=>{

              });
              unreadNotificationCount.value -= 1
            }
          }
        
  
        async function setLanguageAsSystemDefault() {
          let systemLanguage =await GetSetting(AllowedSettingData.DefaultSiteLanguage.Slug,AllowedSettingData.DefaultSiteLanguage.SettingsGroup)
          setLanguage(systemLanguage)
        }
  
        async function isRegistrationAllowed() {
          let isReg =await GetSetting(AllowedSettingData.LayoutModeDark.Slug,AllowedSettingData.LayoutModeDark.SettingsGroup)
          if(isReg !="FALSE"){
            isRegistration.value = false
          }
        }
  
        async function setLayoutSystemDefault() {
          let isDark =await GetSetting(AllowedSettingData.LayoutModeDark.Slug,AllowedSettingData.LayoutModeDark.SettingsGroup)
          if(isDark !="FALSE"){
            localStorage.setItem("mode_status", 'dark');
          }
        }
        onMounted(()=>{
          
          
          store.dispatch("setProfileShowModalValue", false)
          setTabile()
          if(route.name=='admin'){
            router.push({ name:'admin-dashboard'});
          }
          if(route.name=='/'){
                router.push({ name:'home'});
            }
          
          current_year.value = new Date().getFullYear();
          if(authorRole.value != 'user'){
            if(window.matchMedia('screen and (min-width: 1024px)').matches){
            // mobile_sidebar_show.value = true
            isSidebarButtonShow.value = true
            }else{
              // mobile_sidebar_show.value = false
              isSidebarButtonShow.value = false
            }
          }
        
          // dark mode
          // var tmp_mode = localStorage.getItem("mode_status");
          // if(tmp_mode=='dark'){
          //   document.body.classList.add('dark');
          //     isSun.value = true
          //     isMoon.value = false
          // } else {
          //   document.body.classList.remove('dark');
          //   localStorage.removeItem("mode_status");
          //   isSun.value = false
          //   isMoon.value = true
          // }
  
          window.addEventListener('resize',resizeFunction);
          resizeFunction()
  
          // set layout-mode
          if(!localStorage.getItem('mode_status')){
            setLayoutSystemDefault()
          }
          // get user language
          if(!localStorage.getItem('language')){
            setLanguageAsSystemDefault()
          }
  
          isRegistrationAllowed()
          currentLang = localStorage.getItem('language');
        })
  
        onUpdated(()=>{
          KYCPath.value = route.fullPath
          // if(islogin.value == true){
          //   if(authorRole.value != 'user'){
          //     if(route.meta.public == true || route.meta.isLoginPublic){
          //       mobile_sidebar_show.value = false
          //     }
          //   }
          // }

            if(route.name=='open-orders'||route.name=='all-orders'||route.name=='trade-history'){
              orderclass.value=true;
            }
            else{
              orderclass.value=false;
            }
            if(route.name=='create-support'||route.name=='my-support-list'){
              supportclass.value=true;
            }
            else{
              supportclass.value=false;
            }
            if(store.state.auth.auth!==undefined){
              authData.value=store.state.auth.auth; 
              }
            if(authData.value.isValidToken && authorRole.value != 'user'){
                // mobile_sidebar_show.value = true
                isSidebarButtonShow.value = true
            }
            else {
                // mobile_sidebar_show.value = false
                isSidebarButtonShow.value = false
            }
            if(authorRole.value != 'user'){
              if(window.matchMedia('screen and (max-width: 1024px)').matches){
                mobile_sidebar_show.value = false
                isSidebarButtonShow.value = true
              }
            }
          })
  
  
        function enter(element:any) {
          element.style.height = 'auto';
  
          const height = getComputedStyle(element).height;
  
          element.style.height = 0;
  
          getComputedStyle(element).height;
  
          requestAnimationFrame(() => {
              element.style.height = height;
          });
        }
  
        function afterEnter(element:any) {
          element.style.height = 'auto';
        }
  
  
        function leave(element:any) {
          const height = getComputedStyle(element).height;
  
          element.style.height = height;
  
          getComputedStyle(element).height;
  
          requestAnimationFrame(() => {
              element.style.height = 0;
          });
        }
  </script>
  <style scoped>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
  .slide-fade-enter-active {
    transition: all 0.4s ease-out;
  }
  
  .slide-fade-leave-active {
    transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(-20px);
    opacity: 0;
  }
  
  .menuAccordion-enter-from, .menuAccordion-leave-to{
    height: 0;
  }
  
  .menuAccordion-enter-active,.menuAccordion-leave-active{
    transition: all 400ms ease;
  }
  
  a.router-link-exact-active:not(.main-route){
    @apply bg-black text-white
  };
  
  .main-route.router-link-exact-active{
    @apply text-primary
  }
  
  .sidebar-route:hover{
    @apply bg-kakaPrimary text-black100 duration-300
  }
  
  .router-link-exact-active .img-dark{
    @apply hidden
  }
  
  .router-link-exact-active .img-white{
    @apply block
  }
  </style>