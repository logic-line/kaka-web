<template>
    <div class="">
      <div class="bg-white dark:bg-black h-screen relative z-0">
        <!-- header start -->
        <div class="flex items-center justify-between px-6 py-4 custom-shodow-one w-full sticky top-0 left-0 bg-kakaPrimary dark:bg-black z-90">
          <div class="sm:w-64 w-full py-4">
              <div class="flex lg:justify-between space-x-0">
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
                <div v-if="islogin"  class="my-auto ml-7 mr-3">
                  <img @click="toggelSidebar" class="dark:block hidden cursor-pointer ml-3" src="@/assets/images/colapslogo-dark.svg" alt="">
                  <img @click="toggelSidebar" class="dark:hidden block cursor-pointer ml-3" src="@/assets/images/colapslogo-light.svg" alt="">
                </div>
              </div>
          </div>
          <div class="head-width flex items-center justify-between ml-4">
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
                                    <router-link to="/open-orders" class="flex items-center cursor-pointer hover:bg-kakaPrimary text-black100 hover:text-black100 dark:hover:text-black100 dark:text-white py-2 px-4">
                                      {{ $t('message.open-orders') }}
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="/orders" class="flex items-center cursor-pointer hover:bg-kakaPrimary text-black100 hover:text-black100 dark:hover:text-black100 dark:text-white py-2 px-4">
                                      {{ $t('message.all-orders') }}
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="/trade-history" class="flex items-center cursor-pointer hover:bg-kakaPrimary text-black100 hover:text-black100 dark:hover:text-black100 dark:text-white py-2 px-4">
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
                                    <router-link to="/tickets" class="flex items-center cursor-pointer hover:bg-kakaPrimary text-black100 hover:text-black100 dark:hover:text-black100 dark:text-white py-2 px-4">
                                      {{ $t('message.support-list') }}
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="/tickets/create" class="flex items-center cursor-pointer hover:bg-kakaPrimary text-black100 hover:text-black100 dark:hover:text-black100 dark:text-white py-2 px-4">
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
                        <div v-if="unreadNotificationCount != 0" class="w-5 h-5 rounded-full text-white flex items-center justify-center bg-red-500 text-[10px] absolute top-2 right-4">
                            {{unreadNotificationCount}}
                        </div>
                    
                        <div v-if="notificationDropdown" class="notification-body profile-modal-shadow absolute sm:right-4 -right-[113px] top-14 z-30 w-72 flex flex-col justify-between bg-white dark:bg-black80 h-[355px] shadow-gray-400">
                            <div class="h-3 w-3 bg-white dark:bg-black80 absolute rotate-45 z-10 sm:right-4 right-1/2 -top-1.5 shadow-l-md"></div>
                            <div class="px-4 py-3">
                              <p class="text-xl font-medium text-black80 dark:text-white">{{$t("message.__________Notification_________")}}</p>
                            </div>
                              <ul v-if="tableData.length != 0" class="flex-1 overflow-y-scroll">
                                <li v-for="data in tableData" :key="data.ID" @click="readNotification(data)">
                                    <router-link :to="data.Link" class="cursor-pointer group block w-full hover:bg-kakaPrimary text-black100 hover:dark:text-black100 hover:text-white dark:text-secondary py-3 px-4" v-if="data.IsRead == 'FALSE'">
                                      <p class="text-sm">{{data.Title}}</p>
                                    </router-link>
                                </li>
                              </ul>
                            <div v-if="unreadNotificationCount != 0" class="p-4">
                                  <Router-link to="/notification-list" class="bg-black90 text-white py-1 px-4 text-center block">See All</Router-link>
                            </div>
                             <div v-if="unreadNotificationCount == 0" class="flex items-center justify-center h-[calc(100%-52px)]">
                                <div class="p-4 text-center">
                                  <p class="text-black100 dark:text-white text-lg font-medium mb-1">{{ $t('message.no-notification-yet') }}</p>
                                  <p class="capitalize text-sm dark:text-white">{{ $t('message.no-notification-message') }}</p>
                                </div>
                            </div>
                        </div>
                      </li>
                      <li v-if="islogin" class="relative py-4 pr-6">
                        <div @click="changeProfileModalValue" class="profile-btn">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 cursor-pointer dark:text-white hover:text-primary dark:hover:text-primary" :class="profileDropDown ? 'text-primary dark:text-primary':''">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div v-if="profileDropDown" class="profile-modal-shadow sm:w-[261px] w-[240px] profile-body absolute right-4 top-14 z-30">
                          <profile></profile>
                        </div>
                      </li>
                  </ul>
                  <ul v-if="!islogin" class="flex items-center justify-end text-black100">
                      <li v-if="!authData.isValidToken" class="pr-4 block">
                          <router-link class="block cursor-pointer hover:bg-black  hover:text-white dark:text-secondary py-2 px-4" to="/signin">
                            {{ $t('message.login') }} 
                          </router-link>
                      </li>
  
                  </ul>
                  <ul v-if="islogin" class="flex items-center justify-end text-black100">
                    <div @click="logout" class="flex justify-center cursor-pointer text-center py-2 px-4 font-medium">
                      <!-- {{ $t('message.logout') }} -->
                      <span>
                          <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="fa-secondary" opacity=".4" d="M256 0c17.7 0 32 14.3 32 32V256c0 17.7-14.3 32-32 32s-32-14.3-32-32V32c0-17.7 14.3-32 32-32z"/><path class="fa-primary" d="M147.7 75.5c11.3 13.6 9.4 33.8-4.1 45.1C104.7 152.9 80 201.6 80 256c0 97.2 78.8 176 176 176s176-78.8 176-176c0-54.4-24.7-103.1-63.5-135.4c-13.6-11.3-15.4-31.5-4.1-45.1s31.5-15.4 45.1-4.1C462.2 115.4 496 181.8 496 256c0 132.5-107.5 240-240 240S16 388.6 16 256c0-74.2 33.7-140.6 86.6-184.6c13.6-11.3 33.8-9.4 45.1 4.1z"/></svg>
                      </span>
                    </div>
                  </ul>
                </div>
            </div>
          </div>
        </div>
        <!-- header end -->
        <!-- sidebar -->
        <div class="flex">
            <Transition name="slide-fade">
            <ul v-if="mobile_sidebar_show" class="sidebar-min-width h-full custom-shadow-sidebar pt-4 dark:text-white custom-height-screen customScrollY overflow-y-scroll lg:relative absolute bg-white dark:bg-black z-50">
              <!-- TODO: For now dashboard is commented out..Will work on it in future. -->
              <!-- <li>
                <div @click="openSidebarDrop('userManagement')" class="mt-2 capitalize group w-full flex items-center px-4 py-3.5 pr-12 cursor-pointer relative">
                  <svg class="w-6 h-6 dark:block hidden" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2,21h8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20,1,1,0,0,0,2,21ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5ZM22.546,15.6h-.707a.468.468,0,0,1-.428-.3l0-.006a.467.467,0,0,1,.089-.516l.5-.5a.454.454,0,0,0,0-.643l-.63-.63a.454.454,0,0,0-.643,0l-.5.5a.467.467,0,0,1-.516.089l-.006,0a.468.468,0,0,1-.3-.428v-.707A.454.454,0,0,0,18.946,12h-.892a.454.454,0,0,0-.454.454v.707a.468.468,0,0,1-.3.428l-.006,0a.467.467,0,0,1-.516-.089l-.5-.5a.454.454,0,0,0-.643,0l-.63.63a.454.454,0,0,0,0,.643l.5.5a.467.467,0,0,1,.089.516l0,.006a.468.468,0,0,1-.428.3h-.707a.454.454,0,0,0-.454.454v.892a.454.454,0,0,0,.454.454h.707a.468.468,0,0,1,.428.3l0,.006a.467.467,0,0,1-.089.516l-.5.5a.454.454,0,0,0,0,.643l.63.63a.454.454,0,0,0,.643,0l.5-.5a.467.467,0,0,1,.516-.089l.006,0a.468.468,0,0,1,.3.428v.707a.454.454,0,0,0,.454.454h.892a.454.454,0,0,0,.454-.454v-.707a.468.468,0,0,1,.3-.428l.006,0a.467.467,0,0,1,.516.089l.5.5a.454.454,0,0,0,.643,0l.63-.63a.454.454,0,0,0,0-.643l-.5-.5a.467.467,0,0,1-.089-.516l0-.006a.468.468,0,0,1,.428-.3h.707A.454.454,0,0,0,23,16.946v-.892A.454.454,0,0,0,22.546,15.6ZM18.5,17.85a1.35,1.35,0,1,1,1.35-1.35A1.349,1.349,0,0,1,18.5,17.85Z"></path></g></svg>
                  <svg class="w-6 h-6 dark:hidden block" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2,21h8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20,1,1,0,0,0,2,21ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5ZM22.546,15.6h-.707a.468.468,0,0,1-.428-.3l0-.006a.467.467,0,0,1,.089-.516l.5-.5a.454.454,0,0,0,0-.643l-.63-.63a.454.454,0,0,0-.643,0l-.5.5a.467.467,0,0,1-.516.089l-.006,0a.468.468,0,0,1-.3-.428v-.707A.454.454,0,0,0,18.946,12h-.892a.454.454,0,0,0-.454.454v.707a.468.468,0,0,1-.3.428l-.006,0a.467.467,0,0,1-.516-.089l-.5-.5a.454.454,0,0,0-.643,0l-.63.63a.454.454,0,0,0,0,.643l.5.5a.467.467,0,0,1,.089.516l0,.006a.468.468,0,0,1-.428.3h-.707a.454.454,0,0,0-.454.454v.892a.454.454,0,0,0,.454.454h.707a.468.468,0,0,1,.428.3l0,.006a.467.467,0,0,1-.089.516l-.5.5a.454.454,0,0,0,0,.643l.63.63a.454.454,0,0,0,.643,0l.5-.5a.467.467,0,0,1,.516-.089l.006,0a.468.468,0,0,1,.3.428v.707a.454.454,0,0,0,.454.454h.892a.454.454,0,0,0,.454-.454v-.707a.468.468,0,0,1,.3-.428l.006,0a.467.467,0,0,1,.516.089l.5.5a.454.454,0,0,0,.643,0l.63-.63a.454.454,0,0,0,0-.643l-.5-.5a.467.467,0,0,1-.089-.516l0-.006a.468.468,0,0,1,.428-.3h.707A.454.454,0,0,0,23,16.946v-.892A.454.454,0,0,0,22.546,15.6ZM18.5,17.85a1.35,1.35,0,1,1,1.35-1.35A1.349,1.349,0,0,1,18.5,17.85Z"></path></g></svg>
                  <p class="pl-2">{{ $t('message.user-management') }}</p>
                  <div class="group-hover:block absolute left-0 w-1 h-full bg-kakaPrimary rounded-r-lg" :class="sidebarL1Menu=='userManagement' ? 'block': 'hidden'"></div>
                  
                  <svg class="w-4 h-4 absolute right-6 duration-300" :class="sidebarL1Menu=='userManagement'? 'rotate-180':''" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>    
                </div>
  
                <transition name="menuAccordion"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @leave="leave">
                    <ul v-show="sidebarL1Menu=='userManagement'" class="pl-6 overflow-hidden">
                      <li>
                        <router-link to="/admin/users/invite" class="mt-3 sidebar-route capitalize group w-full flex items-center px-4 py-3 cursor-pointer relative">
                          <p class="pl-2">{{ $t('message.invite-user') }}</p>  
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/admin/users" class="mt-3 sidebar-route capitalize group w-full flex items-center px-4 py-3 cursor-pointer relative">
                          <p class="pl-2">{{ $t('message.user-list') }}</p>  
                        </router-link>
                      </li>
                    </ul>
                </transition>
              </li> -->
              <li>
                 <router-link to="/admin/dashboard" class="mt-3 sidebar-route capitalize group w-full flex items-center px-4 py-3 cursor-pointer relative">
                       <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.4" d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z" fill="currentColor"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z" fill="currentColor"></path>
                            </svg>
                      <p class="pl-2">Dashboard</p>  
                    </router-link>
              </li>
              <li>
                <div @click="openSidebarDrop('location')" class="mt-2 capitalize group w-full flex items-center px-4 py-3.5 pr-12 cursor-pointer relative">
                  <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path class="fa-secondary" opacity=".4" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 112a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/><path class="fa-primary" d="M192 144a48 48 0 1 0 0 96 48 48 0 1 0 0-96z"/></svg>

                  <p class="pl-2">{{ $t('message.location') }}</p>
                  <div class="group-hover:block absolute left-0 w-1 h-full bg-kakaPrimary rounded-r-lg" :class="sidebarL1Menu=='location' ? 'block': 'hidden'"></div>
                  
                  <svg class="w-4 h-4 absolute right-6 duration-300" :class="sidebarL1Menu=='location'? 'rotate-180':''" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>    
                </div>
  
                <transition name="menuAccordion"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @leave="leave">
                    <ul v-show="sidebarL1Menu=='location'" class="pl-6 overflow-hidden">
                      <li>
                        <router-link to="/admin/locations" class="mt-3 sidebar-route capitalize group w-full flex items-center px-4 py-3 cursor-pointer relative">
                          <p class="pl-2">List Locations</p>  
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/admin/loaction/create" class="mt-3 sidebar-route capitalize group w-full flex items-center px-4 py-3 cursor-pointer relative">
                          <p class="pl-2">Create Location</p>  
                        </router-link>
                      </li>
                    </ul>
                </transition>
  
              </li>
              <li>
                <div @click="openSidebarDrop('ServiceCategory')" class="mt-2 capitalize group w-full flex items-center px-4 py-3.5 pr-12 cursor-pointer relative">
                 <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path class="fa-secondary" opacity=".4" d="M16.3 151.8c-17.8 13.1-21.6 38.1-8.5 55.9s38.1 21.6 55.9 8.5L183.4 128H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H288 224c-17.7 0-32 14.3-32 32s14.3 32 32 32h64 16 78.3c29.1 0 57.3-9.9 80-28l44.9-36H544c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32H384 223.5c-29 0-57.3 9.3-80.7 26.5L16.3 151.8zm366.1 8.3a.5 .5 0 1 1 .9-.1 .5 .5 0 1 1 -.9 .1z"/><path class="fa-primary" d="M559.7 360.2c17.8-13.1 21.6-38.1 8.5-55.9s-38.1-21.6-55.9-8.5L392.6 384H272c-8.8 0-16-7.2-16-16s7.2-16 16-16h16 64c17.7 0 32-14.3 32-32s-14.3-32-32-32H288 272 193.7c-29.1 0-57.3 9.9-80 28L68.8 352H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H192 352.5c29 0 57.3-9.3 80.7-26.5l126.6-93.3zm-366.1-8.3a.5 .5 0 1 1 -.9 .2 .5 .5 0 1 1 .9-.2z"/></svg>
                  <p class="pl-2">{{ $t('message.ServiceCategory') }}</p>
                  <div class="group-hover:block absolute left-0 w-1 h-full bg-kakaPrimary rounded-r-lg" :class="sidebarL1Menu=='ServiceCategory' ? 'block': 'hidden'"></div>
                  
                  <svg class="w-4 h-4 absolute right-6 duration-300" :class="sidebarL1Menu=='ServiceCategory'? 'rotate-180':''" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>    
                </div>
  
                <transition name="menuAccordion"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @leave="leave">
                    <ul v-show="sidebarL1Menu=='ServiceCategory'" class="pl-6 overflow-hidden">
                       <li>
                        <div @click="openSidebarL2Drop('qurbani')" class="mt-2 capitalize group w-full flex items-center px-4 py-3.5 pr-12 cursor-pointer relative">
                          <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M128 144V408c0 4.4 3.6 8 8 8h32c4.4 0 8-3.6 8-8V352.2v-.5V336c0-53 43-96 96-96s96 43 96 96v15.8 .5V408c0 4.4 3.6 8 8 8h32c4.4 0 8-3.6 8-8V240c0-5.5 2.9-10.7 7.6-13.6s10.6-3.2 15.6-.7l64 32c5.4 2.7 8.8 8.3 8.8 14.3v62.7c0 3 .9 6 2.5 8.6l37.3 58.6c5.6 8.8 15.3 14.1 25.7 14.1c16.8 0 30.5-13.6 30.5-30.5V298c0-3.3-1-6.4-2.8-9.1L594.8 274c-1.9-2.7-2.8-5.9-2.8-9.1V200c0-4.4-3.6-8-8-8c-4 0-7.3 2.9-7.9 6.7c-1.1 6.4-5.9 11.6-12.3 13s-12.9-1.1-16.7-6.5l-51.7-74.7C480.5 108.9 456 96 429.7 96h-30c-1.9 26.9-13.4 52.3-32.5 71.4l-3.1 3.1c-24 24-56.6 37.5-90.5 37.5h-3.2c-33.9 0-66.5-13.5-90.5-37.5l-3.1-3.1c-16.6-16.6-27.4-37.8-31.2-60.5C134.8 115.7 128 129 128 144zm71.4 .8l3.1 3.1c18 18 42.4 28.1 67.9 28.1h3.2c25.5 0 49.9-10.1 67.9-28.1l3.1-3.1c13.2-13.2 21.3-30.4 23.1-48.8H176.4c1.8 18.4 9.9 35.6 23.1 48.8zm8.6 231V408c0 22.1-17.9 40-40 40H136c-22.1 0-40-17.9-40-40V144c0-18 6-34.6 16-48c-26.5 0-48 21.5-48 48v80 16 28.8C64 297.1 41.1 320 12.8 320C5.7 320 0 314.3 0 307.2V288c0-23.7 12.9-44.4 32-55.4V144c0-44.2 35.8-80 80-80h64H429.7c36.8 0 71.2 18 92.1 48.2l38.5 55.6c6.6-4.9 14.9-7.8 23.7-7.8c22.1 0 40 17.9 40 40v59.9l7.5 10.8c5.6 8 8.5 17.6 8.5 27.3v87.5c0 34.5-28 62.5-62.5 62.5c-21.4 0-41.2-10.9-52.7-28.9l-37.3-58.6c-4.9-7.7-7.5-16.6-7.5-25.8V281.9l-32-16V408c0 22.1-17.9 40-40 40H376c-22.1 0-40-17.9-40-40V375.8c-6.6 2-14.6 3.8-24 5.3V392c0 8.8-7.2 16-16 16s-16-7.2-16-16v-8.1c-2.6 .1-5.3 .1-8 .1s-5.4 0-8-.1V392c0 8.8-7.2 16-16 16s-16-7.2-16-16V381.1c-9.4-1.5-17.4-3.3-24-5.3zm0-33.8c2.1 .8 4.7 1.8 7.7 2.7c11.4 3.5 29.8 7.3 56.3 7.3s44.9-3.8 56.3-7.3c3-.9 5.6-1.9 7.7-2.7v-6c0-35.3-28.7-64-64-64s-64 28.7-64 64v6zm344-22a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z"/></svg>

                          <p class="pl-2">Qurbani</p>
                          <div class="group-hover:block absolute left-0 w-1 h-full bg-kakaPrimary rounded-r-lg" :class="sidebarL2Menu=='qurbani' ? 'block': 'hidden'"></div>
                          
                          <svg class="w-4 h-4 absolute right-6 duration-300" :class="sidebarL2Menu=='qurbani'? 'rotate-180':''" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>    
                        </div>
          
                        <transition name="menuAccordion"
                            @enter="enter"
                            @after-enter="afterEnter"
                            @leave="leave">
                            <ul v-show="sidebarL2Menu=='qurbani'" class="pl-6 overflow-hidden">
                              <li>
                                <router-link to="/admin/qurbanis" class="mt-3 sidebar-route capitalize group w-full flex items-center px-4 py-3 cursor-pointer relative">
                                  <p class="pl-2">List Qurbani</p>  
                                </router-link>
                              </li>
                              <li>
                                <router-link to="/admin/qurbani/create" class="mt-3 sidebar-route capitalize group w-full flex items-center px-4 py-3 cursor-pointer relative">
                                  <p class="pl-2">Create Qurbani</p>  
                                </router-link>
                              </li>
                               <li>
                                <router-link to="/admin/qurbanis/booking" class="mt-3 sidebar-route capitalize group w-full flex items-center px-4 py-3 cursor-pointer relative">
                                  <p class="pl-2">List Qurbani Booking</p>  
                                </router-link>
                              </li>
                            </ul>
                        </transition>
          
                      </li>
                    </ul>
                    
                </transition>
  
              </li>
              <li>
                <div @click="openSidebarDrop('Ecommerce')" class="mt-2 capitalize group w-full flex items-center px-4 py-3.5 pr-12 cursor-pointer relative">
                 <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path class="fa-secondary" opacity=".4" d="M64 192H96h32H320h64H512h32 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V224H384V384v80c0 26.5-21.5 48-48 48H112c-26.5 0-48-21.5-48-48V384 192zm256 32H128V384H320V224z"/><path class="fa-primary" d="M603.2 192H36.8C16.5 192 0 175.5 0 155.2c0-7.3 2.2-14.4 6.2-20.4L81.8 21.4C90.7 8 105.6 0 121.7 0H518.3c16.1 0 31 8 39.9 21.4l75.6 113.3c4 6.1 6.2 13.2 6.2 20.4c0 20.3-16.5 36.8-36.8 36.8z"/></svg>
                  <p class="pl-2">{{ $t('Ecommerce') }}</p>
                  <div class="group-hover:block absolute left-0 w-1 h-full bg-kakaPrimary rounded-r-lg" :class="sidebarL1Menu=='Ecommerce' ? 'block': 'hidden'"></div>
                  
                  <svg class="w-4 h-4 absolute right-6 duration-300" :class="sidebarL1Menu=='Ecommerce'? 'rotate-180':''" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>    
                </div>
  
                <transition name="menuAccordion"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @leave="leave">
                    <ul v-show="sidebarL1Menu=='Ecommerce'" class="pl-6 overflow-hidden">
                       <li>
                        <div @click="openSidebarL2Drop('category')" class="mt-2 capitalize group w-full flex items-center px-4 py-3.5 pr-12 cursor-pointer relative">
                          <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="fa-secondary" opacity=".4" d="M160 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32zm32 128H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/><path class="fa-primary" d="M16 72c0-13.3 10.7-24 24-24H88c13.3 0 24 10.7 24 24v48c0 13.3-10.7 24-24 24H40c-13.3 0-24-10.7-24-24V72zm0 160c0-13.3 10.7-24 24-24H88c13.3 0 24 10.7 24 24v48c0 13.3-10.7 24-24 24H40c-13.3 0-24-10.7-24-24V232zM40 368H88c13.3 0 24 10.7 24 24v48c0 13.3-10.7 24-24 24H40c-13.3 0-24-10.7-24-24V392c0-13.3 10.7-24 24-24z"/></svg>

                          <p class="pl-2">category</p>
                          <div class="group-hover:block absolute left-0 w-1 h-full bg-kakaPrimary rounded-r-lg" :class="sidebarL2Menu=='category' ? 'block': 'hidden'"></div>
                          
                          <svg class="w-4 h-4 absolute right-6 duration-300" :class="sidebarL2Menu=='category'? 'rotate-180':''" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>    
                        </div>
          
                        <transition name="menuAccordion"
                            @enter="enter"
                            @after-enter="afterEnter"
                            @leave="leave">
                            <ul v-show="sidebarL2Menu=='category'" class="pl-6 overflow-hidden">
                              <li>
                                <router-link to="/admin/ecommerce/categorys" class="mt-3 sidebar-route capitalize group w-full flex items-center px-4 py-3 cursor-pointer relative">
                                  <p class="pl-2">List category</p>  
                                </router-link>
                              </li>
                              <li>
                                <router-link to="/admin/ecommerce/category/create" class="mt-3 sidebar-route capitalize group w-full flex items-center px-4 py-3 cursor-pointer relative">
                                  <p class="pl-2">Create category</p>  
                                </router-link>
                              </li>
                            </ul>
                        </transition>
          
                      </li>
                       <li>
                        <div @click="openSidebarL2Drop('product')" class="mt-2 capitalize group w-full flex items-center px-4 py-3.5 pr-12 cursor-pointer relative">
                         <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path class="fa-secondary" opacity=".4" d="M200.6 32C205 19.5 198.5 5.8 186 1.4S159.8 3.5 155.4 16L144.7 46.2l-9.9-29.8C130.6 3.8 117-3 104.4 1.2S85 19 89.2 31.6l9.4 28.3L71.2 37.4C60.9 29 45.8 30.5 37.4 40.8S30.5 66.2 40.8 74.6L67 96H221l26.2-21.4c10.3-8.4 11.8-23.5 3.4-33.8s-23.5-11.8-33.8-3.4L191.3 58.3 200.6 32zM592 224h-4.1c-9.9 28-36.6 48-67.9 48H448v80H640V272c0-26.5-21.5-48-48-48zM448 384V512H592c26.5 0 48-21.5 48-48V384H448zm-32 0H224v80c0 26.5 21.5 48 48 48H416V384zm0-32V272H400 344c-31.3 0-58-20-67.9-48H272c-26.5 0-48 21.5-48 48v80H416z"/><path class="fa-primary" d="M48 96C21.5 96 0 117.5 0 144V464c0 26.5 21.5 48 48 48H200.6c-5.4-9.4-8.6-20.3-8.6-32V256c0-29.9 20.5-55 48.2-62c1.8-31 17.1-58.2 40.1-76.1C271.7 104.7 256.9 96 240 96H48zm315.5 89.5L393.1 224H344c-13.3 0-24-10.7-24-24c0-13.1 10.8-24 24.2-24c7.6 0 14.7 3.5 19.3 9.5zM344 272h56 16v80H224v32H416V512h32V384H640V352H448V272h72c39.8 0 72-32.2 72-72c0-39.9-32.5-72-72.2-72c-22.4 0-43.6 10.4-57.3 28.2L432 195.8l-30.5-39.6c-13.7-17.8-35-28.2-57.3-28.2c-39.7 0-72.2 32.1-72.2 72c0 39.8 32.2 72 72 72zm175.8-96c13.4 0 24.2 10.9 24.2 24c0 13.3-10.7 24-24 24H470.9l29.6-38.5c4.6-5.9 11.7-9.5 19.3-9.5z"/></svg>

                          <p class="pl-2">product</p>
                          <div class="group-hover:block absolute left-0 w-1 h-full bg-kakaPrimary rounded-r-lg" :class="sidebarL2Menu=='product' ? 'block': 'hidden'"></div>
                          
                          <svg class="w-4 h-4 absolute right-6 duration-300" :class="sidebarL2Menu=='product'? 'rotate-180':''" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>    
                        </div>
          
                        <transition name="menuAccordion"
                            @enter="enter"
                            @after-enter="afterEnter"
                            @leave="leave">
                            <ul v-show="sidebarL2Menu=='product'" class="pl-6 overflow-hidden">
                              <li>
                                <router-link to="/admin/ecommerce/products" class="mt-3 sidebar-route capitalize group w-full flex items-center px-4 py-3 cursor-pointer relative">
                                  <p class="pl-2">List product</p>  
                                </router-link>
                              </li>
                              <li>
                                <router-link to="/admin/ecommerce/product/create" class="mt-3 sidebar-route capitalize group w-full flex items-center px-4 py-3 cursor-pointer relative">
                                  <p class="pl-2">Create product</p>  
                                </router-link>
                              </li>
                            </ul>
                        </transition>
          
                      </li>
                    </ul>
                    
                </transition>
  
              </li>
              <li>
                <div @click="openSidebarDrop('package')" class="mt-2 capitalize group w-full flex items-center px-4 py-3.5 pr-12 cursor-pointer relative">
                  <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path class="fa-secondary" opacity=".4" d="M261.9 296c4.4-7.7 1.8-17.4-5.9-21.9s-17.4-1.8-21.9 5.9l-32 55.4L147.7 304c-15.3-8.8-34.9-3.6-43.7 11.7L40 426.6c-8.8 15.3-3.6 34.9 11.7 43.7l55.4 32c15.3 8.8 34.9 3.6 43.7-11.7l64-110.9c1.5-2.6 2.6-5.2 3.3-8L261.9 296z"/><path class="fa-primary" d="M384 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM350.5 199.3c-1 .4-1.9 .8-2.9 1.2l-8 3.5c-16.4 7.3-29 21.2-34.7 38.2l-2.6 7.8c-5.6 16.8-23.7 25.8-40.5 20.2s-25.8-23.7-20.2-40.5l2.6-7.8c11.4-34.1 36.6-61.9 69.4-76.5l8-3.5c20.8-9.2 43.3-14 66.1-14c44.6 0 84.8 26.8 101.9 67.9L505 232.7l21.4 10.7c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3L471 287.3c-10.3-5.2-18.4-13.8-22.8-24.5l-9.6-23-19.3 65.5 49.5 54c5.4 5.9 9.2 13 11.2 20.8l23 92.1c4.3 17.1-6.1 34.5-23.3 38.8s-34.5-6.1-38.8-23.3l-22-88.1-70.7-77.1c-14.8-16.1-20.3-38.6-14.7-59.7l16.9-63.5zM292.7 398l25-62.4c2.1 3 4.5 5.8 7 8.6l40.7 44.4-14.5 36.2c-2.4 6-6 11.5-10.6 16.1l-61.7 61.7c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L292.7 398z"/></svg>
                  <p class="pl-2">{{ $t('message.package') }}</p>
                  <div class="group-hover:block absolute left-0 w-1 h-full bg-kakaPrimary rounded-r-lg" :class="sidebarL1Menu=='package' ? 'block': 'hidden'"></div>
                  
                  <svg class="w-4 h-4 absolute right-6 duration-300" :class="sidebarL1Menu=='package'? 'rotate-180':''" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>    
                </div>
  
                <transition name="menuAccordion"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @leave="leave">
                    <ul v-show="sidebarL1Menu=='package'" class="pl-6 overflow-hidden">
                       <li>
                        <router-link to="/admin/packages/create" class="mt-3 sidebar-route capitalize group w-full flex items-center px-4 py-3 cursor-pointer relative">
                          <p class="pl-2">{{ $t('message.create-package') }}</p>  
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/admin/packages" class="mt-3 sidebar-route capitalize group w-full flex items-center px-4 py-3 cursor-pointer relative">
                          <p class="pl-2">{{ $t('message.list-package') }}</p>  
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/admin/package/booking" class="mt-3 sidebar-route capitalize group w-full flex items-center px-4 py-3 cursor-pointer relative">
                          <p class="pl-2">List Package Booking</p>  
                        </router-link>
                      </li>
                     
                    </ul>
                </transition>
  
              </li>
              <li>
                <div @click="openSidebarDrop('hijama')" class="mt-2 capitalize group w-full flex items-center px-4 py-3.5 pr-12 cursor-pointer relative">
                 <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path class="fa-secondary" opacity=".4" d="M8.6 10.2C14.6 3.7 23.1 0 32 0H352c8.9 0 17.4 3.7 23.4 10.2s9.1 15.2 8.5 24.1L355.1 437.7c-3 41.9-37.8 74.3-79.8 74.3H108.7c-42 0-76.8-32.4-79.8-74.3L.1 34.3c-.6-8.9 2.4-17.6 8.5-24.1zM66.4 64L92.7 433.1c.6 8.4 7.6 14.9 16 14.9H275.3c8.4 0 15.4-6.5 16-14.9L317.6 64H66.4z"/><path class="fa-primary" d=""/></svg>
                  <p class="pl-2">{{ $t('hijama') }}</p>
                  <div class="group-hover:block absolute left-0 w-1 h-full bg-kakaPrimary rounded-r-lg" :class="sidebarL1Menu=='hijama' ? 'block': 'hidden'"></div>
                  
                  <svg class="w-4 h-4 absolute right-6 duration-300" :class="sidebarL1Menu=='hijama'? 'rotate-180':''" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>    
                </div>
  
                <transition name="menuAccordion"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @leave="leave">
                    <ul v-show="sidebarL1Menu=='hijama'" class="pl-6 overflow-hidden">
                       <li>
                        <router-link to="/admin/hijamas/create" class="mt-3 sidebar-route capitalize group w-full flex items-center px-4 py-3 cursor-pointer relative">
                          <p class="pl-2">{{ $t('create hijama') }}</p>  
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/admin/hijamas" class="mt-3 sidebar-route capitalize group w-full flex items-center px-4 py-3 cursor-pointer relative">
                          <p class="pl-2">{{ $t('list hijama') }}</p>  
                        </router-link>
                      </li>
                      
                     
                    </ul>
                </transition>
  
              </li>
              <li>
                <div @click="openSidebarDrop('cab')" class="mt-2 capitalize group w-full flex items-center px-4 py-3.5 pr-12 cursor-pointer relative">
                  <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path class="fa-secondary" opacity=".4" d="M171.3 128H224v96H111.3l30.4-75.9c4.9-12.1 16.6-20.1 29.7-20.1zM272 224V128h81.2c9.7 0 18.9 4.4 25 12l67.2 84H272zM64 432a80 80 0 1 1 160 0A80 80 0 1 1 64 432zm432-80a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/><path class="fa-primary" d="M171.3 128H224v96H111.3l30.4-75.9c4.9-12.1 16.6-20.1 29.7-20.1zM272 224V128h81.2c9.7 0 18.9 4.4 25 12l67.2 84H272zm256.2 1l-100-125c-18.2-22.8-45.8-36-75-36H171.3c-39.3 0-74.6 23.9-89.1 60.3L40.6 228.4C16.8 237.8 0 260.9 0 288V400c0 17.7 14.3 32 32 32c0-61.9 50.1-112 112-112s112 50.1 112 112H384c0-61.9 50.1-112 112-112s112 50.1 112 112c17.7 0 32-14.3 32-32V352c0-65.2-48.8-119-111.8-127z"/></svg>
                  <p class="pl-2">{{ $t('cab') }}</p>
                  <div class="group-hover:block absolute left-0 w-1 h-full bg-kakaPrimary rounded-r-lg" :class="sidebarL1Menu=='cab' ? 'block': 'hidden'"></div>
                  
                  <svg class="w-4 h-4 absolute right-6 duration-300" :class="sidebarL1Menu=='cab'? 'rotate-180':''" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>    
                </div>
  
                <transition name="menuAccordion"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @leave="leave">
                    <ul v-show="sidebarL1Menu=='cab'" class="pl-6 overflow-hidden">
                      <li>
                        <router-link to="/admin/cab/booking" class="mt-3 sidebar-route capitalize group w-full flex items-center px-4 py-3 cursor-pointer relative">
                          <p class="pl-2">List Cab Booking</p>  
                        </router-link>
                      </li>
                     
                    </ul>
                </transition>
  
              </li>
              <li>
                <div @click="openSidebarDrop('uploadimage')" class="mt-2 capitalize group w-full flex items-center px-4 py-3.5 pr-12 cursor-pointer relative">
                  <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="fa-secondary" opacity=".4" d="M0 128v32H256 512V96c0-35.3-28.7-64-64-64H271.1c-9.9 0-19.7 2.3-28.6 6.8L192 64H64C28.7 64 0 92.7 0 128z"/><path class="fa-primary" d="M64 48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V64H64V48zM0 416V160H512V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64zm256-16a96 96 0 1 0 0-192 96 96 0 1 0 0 192z"/></svg>

                  <p class="pl-2">Images</p>
                  <div class="group-hover:block absolute left-0 w-1 h-full bg-kakaPrimary rounded-r-lg" :class="sidebarL1Menu=='uploadimage' ? 'block': 'hidden'"></div>
                  
                  <svg class="w-4 h-4 absolute right-6 duration-300" :class="sidebarL1Menu=='uploadimage'? 'rotate-180':''" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>    
                </div>
  
                <transition name="menuAccordion"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @leave="leave">
                    <ul v-show="sidebarL1Menu=='uploadimage'" class="pl-6 overflow-hidden">
                      <li>
                        <router-link to="/admin/images/upload" class="mt-3 sidebar-route capitalize group w-full flex items-center px-4 py-3 cursor-pointer relative">
                          <p class="pl-2">Upload Images</p>  
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/admin/images/list" class="mt-3 sidebar-route capitalize group w-full flex items-center px-4 py-3 cursor-pointer relative">
                          <p class="pl-2">List Images</p>  
                        </router-link>
                      </li>
                    </ul>
                </transition>
  
              </li>
  
            </ul>
          </Transition>
          <!-- sidebar end -->
    
          <div id="main-content" class="w-full bg-white dark:bg-black100 dark:text-white custom-height-screen overflow-y-scroll shadow-md">
            <router-view :key="$route.fullPath" class="min-h-[calc(100vh-161px)]"></router-view>
            <footer class="text-center bg-gray-100 dark:bg-black dark:text-white border-t border-transparent dborder-t dark:border-gray-800">
              <p class="p-4">&copy; All rights reserved by KAKA. </p>
            </footer>
          </div>
        </div>
      </div>
      <!-- mobile responsive menu -->
      
      <Transition>
        <div v-if="mobile_menu_show" class="w-72 h-screen flex flex-col flex-wrap bg-white dark:bg-black90 fixed top-0 right-0 shadow-md">
          <div class="p-4 relative w-full">
            <img class="w-32 dark:block hidden" src="@/assets/images/Logo-white.png" alt="">
            <img class="w-32 dark:hidden block" src="@/assets/images/Logo-dark.png" alt="">
            <svg @click="mobile_menu_show = false" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 absolute hover:text-red-500 duration-300 right-4 top-4 dark:text-white dark:hover:text-red-500 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <ul class="block 2xl:hidden overflow-y-auto w-full flex-1">
             
              <li v-if="islogin" class="2xl:hidden">
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
              <li v-if="islogin" class="2xl:hidden">
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
              <li v-if="islogin" class="hover:bg-kakaPrimary duration-300 text-black100 hover:text-white dark:text-secondary">
                  <router-link to="/wallets" class="pr-2 px-4 py-3.5 block">{{ $t('message.wallets') }}</router-link>
              </li>
              <li>
                <router-link to="/blog" class="flex cursor-pointer hover:bg-kakaPrimary text-black100 hover:text-white dark:text-secondary py-3.5 px-4">{{ $t('message.blog') }}</router-link>
              </li>
              <li>
                <router-link to="/announcement" class="flex cursor-pointer hover:bg-kakaPrimary text-black100 hover:text-white dark:text-secondary py-3.5 px-4">{{ $t('message.announcement') }}</router-link>
              </li>
            </ul>
            <ul v-if="!islogin" class="inline-block md:hidden">
              <li class="flex items-center justify-center">
                <router-link to="/signin" class="inline-flex justify-center cursor-pointer text-center mt-4  duration-500 text-black100 hover:text-primary dark:text-secondary">{{ $t('message.login') }}</router-link>
              </li>
              <li class="flex items-center justify-center">
                <router-link to="/signup" class="inline-flex justify-center cursor-pointer text-center my-4 bg-kakaPrimary duration-500 text-white dark:text-secondary py-2.5 px-10">{{ $t('message.signup') }}</router-link>
              </li>
            </ul>
            <ul v-if="islogin" class="inline-block md:hidden">
              <div @click="logout" class="flex justify-center cursor-pointer text-center py-2 bg-kakaPrimary duration-500 text-black100 dark:text-secondary">
                {{ $t('message.logout') }}
              </div>
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
  // import Profile from '../../../components/header/Profile.vue';
  import ProfileForMobile from '../../../components/header/ProfileForMobile.vue';
  import { computed, defineComponent, onUpdated, reactive, onMounted, ref, onBeforeMount} from 'vue'
  import store from "../../../store";
  import { UpdateNotification} from '../../../types/notification';
  import config from "../../../config";
  import { FetchData } from '../../../utils/fetch-utils';
  import NotificationService from "../../../services/notification";

  import { Languages } from "@/utils/lang-utils"
  import { AllowedSettingData,GetSetting } from "@/utils/settings-utils"
  import UnauthorizedModal from '../../../components/error/UnauthorizedModal.vue';
  import UniqueFieldErrorModal from '../../../components/error/UniqueFieldErrorModal.vue';
  
  
  import { useRouter, useRoute } from 'vue-router'
  
    const router = useRouter()
    const route = useRoute()
  
            const sidebarL1Menu = ref('');
            const sidebarL2Menu = ref('');
            const sidebarL3Menu = ref('');
            const KYCStatus = ref('');
            const KYCPath = ref('');

            // const isSidebarButtonShow = ref(false);
            const authorRole = computed(()=>store.state.auth.auth.role);

            const isError = computed(()=>store.state.common.isError);
            // const islogin = computed(()=> store.state.auth.auth.isValidToken);
            const islogin = ref(false);
            const isUniqueError = computed(()=>store.state.common.isUniqueErrorModalShow);
            const code = computed(()=> store.state.common.code);

            const current_year = ref(2020)
            const hover_on_menu = ref(<String>'')
  
            const mobile_menu_show  = ref(false)
            const mobile_sidebar_show  = ref(false)
            const notification_modal = ref(false)
            const tableData  = computed(()=> store.state.common.unreadNotifications);
            const authData = ref(<any>{})
  
            const isSun = ref(false);
            const isMoon = ref(true);
  
            const orderDropdown = ref(false);
            const unreadNotificationCount = computed(()=>store.state.common.unreadNotificationCount);
            const supportDropdown = ref(false);
            const orderclass = ref(false);
            const supportclass = ref(false);
            const profileDropDown = computed(()=>store.state.common.isProfileDropdownShow);
            const notificationDropdown = ref(false);
            const langDropdown = ref(false);
            const isRegistration = ref(true)
            const languages = reactive(Languages)
            const state = reactive({
              isSidebarButtonShow : false,
            })

        function getToken() {
          return localStorage.getItem('token');
        }
        const token = getToken()
        if (token){
          islogin.value = true
        }else{
          islogin.value=false
        }
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
            let authPayload = store.state.auth.auth;
            if(authPayload.accessToken != ""){
              store.dispatch('setUpdatedNotifications');
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
                  setTabile()
                  
                }
              }).catch((error)=>{

              });
              
            }
          }
        
        const logout=()=>{
              localStorage.removeItem('token');
             router.push({ path: "/signin" });
            
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
        onMounted(()=>{(islogin.value);
          
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
            state.isSidebarButtonShow = true
            if(window.matchMedia('screen and (min-width: 1024px)').matches){
            // mobile_sidebar_show.value = true
            state.isSidebarButtonShow = true
            }else{
              // mobile_sidebar_show.value = false
              state.isSidebarButtonShow = false
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
          // if(state.  islogin == true){
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
                state.isSidebarButtonShow = true
            }
            else {
                // mobile_sidebar_show.value = false
                state.isSidebarButtonShow = false
            }
            if(authorRole.value != 'user'){
              if(window.matchMedia('screen and (max-width: 1024px)').matches){
                mobile_sidebar_show.value = false
                state.isSidebarButtonShow = true
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
    @apply bg-kakaPrimary text-black100 dark:text-black100
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