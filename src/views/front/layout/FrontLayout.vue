<template>
  <div>
    <div class="bg-white dark:bg-black h-screen relative z-0">
  
      <!-- header start -->
      <div class="flex items-center justify-between px-6 custom-shodow-one w-full sticky top-0 left-0 bg-white dark:bg-black z-50">
        <div class="sm:w-64 py-4 ">
            <div class="flex lg:justify-between">
              <div class="lg:block hidden">
                <router-link to="/home" class="main-route">
                  <img class="w-32 dark:block hidden" src="@/assets/images/Logo-white.png" alt="">
                </router-link>
                <router-link to="/home" class="main-route">
                  <img class="w-32 dark:hidden block" src="@/assets/images/Logo-dark.png" alt="">
                </router-link>
              </div>
                <router-link to="/home" class="main-route">
                  <img class="w-10 lg:hidden block" src="@/assets/images/logo-mobile.png" alt="">
                </router-link>
            </div>
        </div>
        <div class="head-width flex items-center justify-between">
          <div class="lg:w-1/3 xl:block hidden">
            <ul class="flex space-x-7">
              <li>
                <router-link to="/exchange" class="main-route flex items-center duration-300 text-black100 hover:text-primary dark:text-secondary dark:hover:text-primary">
                  {{ $t('message.trade') }}
                </router-link>
              </li>
              <li>
                <router-link to="/market" class="main-route flex items-center duration-300 text-black100 hover:text-primary dark:text-secondary dark:hover:text-primary">
                  {{ $t('message.market') }}
                </router-link>
              </li>
              <li>
                <router-link to="/blog" class="main-route flex items-center duration-300 text-black100 hover:text-primary dark:text-secondary dark:hover:text-primary">
                  {{ $t('message.blog') }}
                </router-link>
              </li>
              <li>
                <router-link to="/announcement" class="main-route flex items-center duration-300 text-black100 hover:text-primary dark:text-secondary dark:hover:text-primary">
                  Announcement
                </router-link>
              </li>
            </ul>
          </div>
           <div class="lg:w-8/12 w-full ml-auto">
              <div class="flex items-center justify-end">
                <ul v-if="authData.isValidToken" class="flex items-center justify-end">
                    <li>
                      <router-link to="/wallets" class="main-route xl:flex hidden items-center duration-300 text-black100 hover:text-primary dark:text-secondary dark:hover:text-primary pr-6">{{ $t('message.wallets') }}</router-link>
                    </li>
                    <li @mouseenter="orderDropdown = true" @mouseleave="orderDropdown = false" class="relative xl:flex hidden pr-6">
                        <div class="order-btn flex items-center cursor-pointer py-4 text-black100 hover:text-primary dark:text-secondary dark:hover:text-primary" :class="orderDropdown||orderclass ? 'text-primary dark:text-primary': ''">
                          <p class="pr-2 cursor-pointer main-route">{{ $t('message.orders') }}</p>
                          <svg :class="orderDropdown? 'rotate-180': ''" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentcolor" class="w-3 h-3">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        </div>
                        <div v-if="orderDropdown" class="activity-body absolute top-14 -left-[70px]">
                          <dropdown>
                            <template v-slot:body>
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
                            </template>
                      </dropdown>
                    </div>
                    </li>
                    <li @mouseenter="supportDropdown = true" @mouseleave="supportDropdown = false" class="relative xl:flex hidden pr-6">
                        <div class="flex items-center cursor-pointer py-4 text-black100 hover:text-primary dark:text-secondary dark:hover:text-primary" :class="supportDropdown||supportclass ? 'text-primary dark:text-primary': ''">
                          <p class="pr-2 cursor-pointer main-route">{{ $t('message.support') }}</p>
                          <svg :class="supportDropdown? 'rotate-180': ''" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentcolor" class="w-3 h-3">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        </div>
                        <div v-if="supportDropdown" class="support-body absolute top-14 -left-[70px]">
                          <dropdown>
                            <template v-slot:body>
                              <li>
                                  <router-link to="/tickets" class="flex items-center cursor-pointer hover:bg-kakaPrimary text-black100 hover:text-white dark:text-secondary py-2 px-4">
                                    {{ $t('message.support-list') }}
                                  </router-link>
                              </li>
                              <li>
                                  <router-link to="/tickets/create" class="flex items-center cursor-pointer hover:bg-kakaPrimary text-black100 hover:text-white dark:text-secondary py-2 px-4">
                                    {{ $t('message.new-support') }}
                                  </router-link>
                              </li>
                            </template>
                      </dropdown>
                    </div>
                    </li>

                    <!-- TODO: For now notifications is commented out..Will work on it in future. -->

                    <li @click="openNotification" class="relative  py-4 pr-6">
                      <div class="notification-btn text-black100 hover:text-primary dark:text-secondary dark:hover:text-primary">
                        <svg :class="notificationDropdown? 'text-primary dark:text-primary':''" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 cursor-pointer dark:text-white">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                        </svg>
                      </div>
                      
                      <div v-if="notificationDropdown" class="notification-body absolute right-4 top-14 z-30">        
                        <div class="h-3 w-3 bg-secondary dark:bg-black80 absolute rotate-45 z-10 right-4 -top-1.5 shadow-l-md"></div>
                        <div class="bg-secondary dark:bg-black80 z-30 relative">
                          <ul v-for="data in tableData" :key="data.ID">
                              <li class="flex cursor-pointer hover:bg-kakaPrimary text-black100 hover:text-white dark:text-secondary py-3 px-4 w-56">
                                {{data.Title}}
                              </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li class="relative py-4 sm:block hidden pr-6">
                      <div @click="profileDropDown = !profileDropDown" class="profile-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 cursor-pointer dark:text-white hover:text-primary dark:hover:text-primary" :class="profileDropDown ? 'text-primary dark:text-primary':''">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div v-if="profileDropDown" class="profile-modal-shadow w-[261px] profile-body absolute right-4 top-14 z-30">
                        <profile></profile>
                      </div>
                    </li>
                </ul>
                <ul class="flex items-center justify-end">
                    <!-- <li class="block" v-if="!authData.isValidToken">
                        <router-link class="block cursor-pointer hover:bg-kakaPrimary text-black100 hover:text-white dark:text-secondary py-2 px-4" to="/signup">
                          {{ $t('message.signup') }}
                        </router-link>
                    </li> -->
                    <li v-if="!authData.isValidToken" class="pr-4 block">
                        <router-link class="block cursor-pointer hover:bg-kakaPrimary text-black100 hover:text-white dark:text-secondary py-2 px-4" to="/signin">
                          {{ $t('message.login') }} 
                        </router-link>
                    </li>

                    <!-- language -->
                    <li class="pr-6 py-4 relative">
                      <div @click="openLangDrop" class="lang-icon">
                        <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 cursor-pointer dark:text-white">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg> -->
                        <img v-if="currentLang=='english'" class="w-6 h-6 cursor-pointer rounded-full" src="@/assets/images/usFlag.png" alt="flag">
                        <img v-if="currentLang=='portuguese'" class="w-6 h-6 cursor-pointer rounded-full" src="@/assets/images/portugal-flag.png" alt="flag">
                      </div>

                      <div v-if="langDropdown" class="lang-body absolute right-4 top-14 z-30">        
                        <div class="h-3 w-3 bg-secondary dark:bg-black80 absolute rotate-45 z-10 right-4 -top-1.5 shadow-l-md"></div>
                        <div class="bg-secondary dark:bg-black80 z-30 relative">
                          <div class="p-1 w-20 dark:text-white">
                            <div @click="setLanguage('english')" :class="currentLang=='english'? 'flex items-center justify-between mb-1 p-1 cursor-pointer bg-kakaPrimary hover:bg-kakaPrimary':'flex items-center justify-between mb-1 p-1 cursor-pointer hover:bg-kakaPrimary'">
                              <p class="mr-1">Eng</p>
                              <img class="w-7" src="@/assets/images/usFlag.png" alt="flag">
                            </div>
                            <div @click="setLanguage('portuguese')" :class="currentLang=='portuguese'? 'flex items-center justify-between p-1 cursor-pointer bg-kakaPrimary hover:bg-kakaPrimary':'flex items-center justify-between p-1 cursor-pointer hover:bg-kakaPrimary'">
                              <p class="mr-1">Por</p>
                              <img class="w-7" src="@/assets/images/portugal-flag.png" alt="flag">
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li class="pr-4">
                        <svg @click="toggleDarkMode" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 cursor-pointer dark:text-white">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                        </svg>
                    </li>
                    <li class="xl:hidden block">
                      <svg @click="toggleNavMenu" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer dark:text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
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
          <router-view></router-view>
        </div>
      </div>
  
      <footer class="text-center bg-gray-100 dark:bg-black dark:text-white border-t border-transparent dborder-t dark:border-gray-800 sticky bottom-0 left-0">
        <p class="p-4">&copy; Copyright LogicLine 2024 </p>
      </footer>
  
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

    </div>
</template>

<script lang="ts" setup>
import Dropdown from '../../../components/header/Dropdown.vue';
import Profile from '../../../components/header/Profile.vue';
import ProfileForMobile from '../../../components/header/ProfileForMobile.vue';
import { computed, defineComponent, onUpdated, reactive, onMounted, ref} from 'vue'
import store from "../../../store";
import { ListFilterRequest, UpdateNotification} from '../../../types/notification';
import config from "../../../config";
import NotificationMockService from "../../../mock/notification";
import NotificationService from "../../../services/notification";
import notification from '../../../mock/notification/data/notification';
import { Languages } from "@/utils/lang-utils"
import { AllowedSettingData,GetSetting } from "@/utils/settings-utils"
import UnauthorizedModal from '../../../components/error/UnauthorizedModal.vue';


import { useRouter, useRoute } from 'vue-router'

  const router = useRouter()
  const route = useRoute()

let mockService = new NotificationMockService();

          const sidebarL1Menu = ref('');
          const sidebarL2Menu = ref('');
          const sidebarL3Menu = ref('');
          const isError = computed(()=>store.state.common.isError);
          const code = computed(()=> store.state.common.code);

          const current_year = ref(2020)
          const hover_on_menu = ref(<String>'')

          const mobile_menu_show  = ref(false)
          const mobile_sidebar_show  = ref(false)
          const notification_modal = ref(false)
          const tableData  = ref([])
          const authData = ref(<any>{})

          const orderDropdown = ref(false);
          const supportDropdown = ref(false);
          const orderclass = ref(false);
          const supportclass = ref(false);
          const profileDropDown = ref(false);
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

          window.addEventListener('click',(e)=>{
            handleOutSideError(profileDropDown,e.target,'profile-btn','profile-body')
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
      //     } else {
      //       document.body.classList.add('dark');
      //       localStorage.setItem("mode_status", 'dark');
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
        setTabile()
        notificationDropdown.value = !notificationDropdown.value;
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
        if(window.matchMedia('screen and (max-width: 1024px)').matches){
          mobile_sidebar_show.value = false
        }else{
          mobile_sidebar_show.value = true
        }
        if(window.matchMedia('(min-width: 1280px)').matches){
          mobile_menu_show.value = false
        }
      }

      function setTabile(){
            let payload: ListFilterRequest = {
                SortBy : "",
                SortByColumn: "",
                Status : 0,
                SearchTerm : "",
                StartDate: "",
                EndDate: ""
            };
            if (config.mock) {
                mockService.FetchGetNotificationList(payload).then((response:any) => {
                    tableData.value = response.Data.Notification;
                });
            } else {
                new NotificationService().listOfNotification(payload);
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
        if(route.name=='admin'){
          router.push({ name:'admin-dashboard'});
        }
        if(route.name=='/'){
              router.push({ name:'home'});
          }
        
        current_year.value = new Date().getFullYear();
        if(window.matchMedia('screen and (min-width: 1024px)').matches){
          mobile_sidebar_show.value = true
        }else{
          mobile_sidebar_show.value = false
        }

        // dark mode
        // var tmp_mode = localStorage.getItem("mode_status");
        // if(tmp_mode=='dark'){
        //   document.body.classList.add('dark');
        // } else {
        //   document.body.classList.remove('dark');
        //   localStorage.removeItem("mode_status");
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
          if(authData.value.isValidToken){
              mobile_sidebar_show.value = true
          }
          else {
                mobile_sidebar_show.value = false
            }
          if(window.matchMedia('screen and (max-width: 1024px)').matches){
            mobile_sidebar_show.value = false
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
  @apply bg-kakaPrimary text-white
}

.main-route.router-link-exact-active{
  @apply text-primary
}

.sidebar-route:hover{
  @apply bg-kakaPrimary text-white duration-300
}

.router-link-exact-active .img-dark{
  @apply hidden
}

.router-link-exact-active .img-white{
  @apply block
}
</style>
