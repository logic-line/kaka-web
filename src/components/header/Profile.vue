<template>
    <div class="max-h-[calc(100vh-80px)] customScrollY overflow-y-auto text-black90 dark:text-white">
        <div class="h-3 w-3 -z-10 bg-white dark:bg-black80 absolute rotate-45 right-4 -top-1.5 profile-modal-shadow"></div>
        <div class="profile-modal profile-modal-shadow ">
            <div class="sticky top-0 px-4 py-2 bg-white dark:bg-black80">
                <div class="flex space-x-3 my-2">
                    <img v-if="userInfo.Image" class="w-11 h-11 rounded-full" :src="userInfo.Image"    alt="">
                    <svg v-else class="text-gray-600 object-cover object-center rounded-full w-11 h-11" fill="currentColor" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M228,128A100,100,0,1,0,60.71,201.90967a3.97048,3.97048,0,0,0,.842.751,99.79378,99.79378,0,0,0,132.8982-.00195,3.96558,3.96558,0,0,0,.83813-.74756A99.76267,99.76267,0,0,0,228,128ZM36,128a92,92,0,1,1,157.17139,64.87207,75.616,75.616,0,0,0-44.50782-34.04053,44,44,0,1,0-41.32714,0,75.61784,75.61784,0,0,0-44.50782,34.04A91.70755,91.70755,0,0,1,36,128Zm92,28a36,36,0,1,1,36-36A36.04061,36.04061,0,0,1,128,156ZM68.86475,198.417a68.01092,68.01092,0,0,1,118.27.00049,91.80393,91.80393,0,0,1-118.27-.00049Z"></path> </g></svg>
                    <div class="capitalize">
                        <p class="font-medium">{{userInfo.FirstName}} {{userInfo. LastName}}</p>
                        <p class="text-sm text-gray-500">{{userRole}}</p>
                    </div>
                </div>
            </div>
            <profile-options></profile-options>
        </div>
    </div> 
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, } from 'vue'
import store from "../../store";
import { useRouter } from 'vue-router';
import ProfileOptions from './ProfileOptions.vue';
import ProfileService from "../../services/profile";
export default defineComponent({
  components: { ProfileOptions },
    name:'Profile',

    setup(){
       const state = reactive({
        userInfo : <any> {},
        userRole : '',
       })
        const getUserData = ()=>{
            new ProfileService().GetProfile().then((response:any)=>{
                if(response !== undefined && response.Data!==undefined){
                    state.userInfo = response.Data.GetProfileByID
                }
            }).catch((error)=>{
            });
        } 
        const getUserRole = ()=>{
            new ProfileService().GetProfileRole().then((response:any)=>{
                if(response !== undefined){
                   state.userRole = response.Name 
                }
            }).catch((error)=>{
               
            });
        }

        onMounted(()=>{
            getUserData()
            getUserRole()
        })
       return{
        ...toRefs(state),getUserData,getUserRole
       }
    }
})
</script>