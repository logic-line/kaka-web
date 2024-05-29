<template>
    <div class="overflow-hidden px-6 py-4">
        <div v-if="isLoading" class="h-[507px] pt-2 pr-3" >
          <Loader :isLoading="isLoading" />
        </div>
        <PageHeader  
        title="Update Package">
            <template v-slot:body>
                <router-link to="/admin/packages" class="flex items-center justify-center bg-kakaPrimary dark:text-black100 py-2.5 px-8 w-full rounded-sm bor">
                    {{ $t('message.back-to-list') }}
                </router-link>
            </template>
        </PageHeader>
        <div class="p-4 shadow-md bg-gray-50 dark:bg-secondary10 dark:text-white relative">
           
            <form @submit.prevent="packagesSubmit">
                <div class="flex flex-wrap">
                    <div class="w-full md:w-1/2 px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="name">Name</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <input v-model="form.name" name="name" class="modal-input-style" placeholder="Name">
                        <div class="text-red-500 mr-1">{{ getBackendError('name') }}</div>
                        <div v-if="V1$.form.name.$errors[0]" class="text-red-500">{{ V1$.form.name.$errors[0].$message }}</div>
                    </div>
                     <div class="w-full md:w-1/2 px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="source">Source</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <select v-model="form.source" name="source" class="modal-input-style">
                            <option value="" selected disabled>Select source</option>
                            <option  v-for="data in locationData" :key="data.id" :value="data.id">{{data.name}}</option>
                        </select>
                        <div class="text-red-500 mr-1">{{ getBackendError('source') }}</div>
                        <div v-if="V1$.form.source.$errors[0]" class="text-red-500">{{ V1$.form.source.$errors[0].$message }}</div>
                    </div>
                     <div class="w-full md:w-1/2 px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="destination">Destination</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <select v-model="form.destination" name="destination" class="modal-input-style">
                            <option value="" selected disabled>Select destination</option>
                            <option  v-for="data in locationData" :key="data.id" :value="data.id">{{data.name}}</option>
                        </select>
                        <div class="text-red-500 mr-1">{{ getBackendError('destination') }}</div>
                        <div v-if="V1$.form.destination.$errors[0]" class="text-red-500">{{ V1$.form.destination.$errors[0].$message }}</div>
                    </div>
                    <div class="w-full md:w-1/2 px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="duration">Duration</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <input v-model="form.duration" name="duration" class="modal-input-style" placeholder="duration">
                        <div class="text-red-500 mr-1">{{ getBackendError('duration') }}</div>
                        <div v-if="V1$.form.duration.$errors[0]" class="text-red-500">{{ V1$.form.duration.$errors[0].$message }}</div>
                    </div>
                    <div class="w-full md:w-1/2 px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="days">days</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <input v-model="form.days" name="days" class="modal-input-style" placeholder="days">
                        <div class="text-red-500 mr-1">{{ getBackendError('days') }}</div>
                        <div v-if="V1$.form.days.$errors[0]" class="text-red-500">{{ V1$.form.days.$errors[0].$message }}</div>
                    </div>
                    <div class="w-full md:w-1/2 px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="nights">nights</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <input v-model="form.nights" name="nights" class="modal-input-style" placeholder="nights">
                        <div class="text-red-500 mr-1">{{ getBackendError('nights') }}</div>
                        <div v-if="V1$.form.nights.$errors[0]" class="text-red-500">{{ V1$.form.nights.$errors[0].$message }}</div>
                    </div>
                    <div class="w-full md:w-1/2 px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="persons">persons</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <input v-model="form.persons" name="persons" class="modal-input-style" placeholder="persons">
                        <div class="text-red-500 mr-1">{{ getBackendError('persons') }}</div>
                        <div v-if="V1$.form.persons.$errors[0]" class="text-red-500">{{ V1$.form.persons.$errors[0].$message }}</div>
                    </div>
                    <div class="w-full md:w-1/2 px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="base_price">Base Price</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <input v-model="form.base_price" name="base_price" class="modal-input-style" placeholder="base_price">
                        <div class="text-red-500 mr-1">{{ getBackendError('base_price') }}</div>
                        <div v-if="V1$.form.base_price.$errors[0]" class="text-red-500">{{ V1$.form.base_price.$errors[0].$message }}</div>
                    </div>
                    <div class="w-full md:w-1/2 px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="discount_price">Discount Price</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <input v-model="form.discount_price" name="discount_price" class="modal-input-style" placeholder="discount_price">
                        <div class="text-red-500 mr-1">{{ getBackendError('discount_price') }}</div>
                        <div v-if="V1$.form.discount_price.$errors[0]" class="text-red-500">{{ V1$.form.discount_price.$errors[0].$message }}</div>
                    </div>
                    <div class="w-full md:w-1/2 px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="price">Price</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <input v-model="form.price" name="price" class="modal-input-style" placeholder="price">
                        <div class="text-red-500 mr-1">{{ getBackendError('price') }}</div>
                        <div v-if="V1$.form.price.$errors[0]" class="text-red-500">{{ V1$.form.price.$errors[0].$message }}</div>
                    </div>
                    <div class="w-full md:w-1/2 px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="booking_amount">Booking Amount</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <input v-model="form.booking_amount" name="booking_amount" class="modal-input-style" placeholder="booking_amount">
                        <div class="text-red-500 mr-1">{{ getBackendError('booking_amount') }}</div>
                        <div v-if="V1$.form.booking_amount.$errors[0]" class="text-red-500">{{ V1$.form.booking_amount.$errors[0].$message }}</div>
                    </div>
                   
                    <div class="w-full md:w-1/2 px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="offer_applicable">Offer Applicable</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <select v-model="form.offer_applicable" name="offer_applicable" class="modal-input-style">
                            <option value="" selected disabled>Select offer_applicable</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                        <div class="text-red-500 mr-1">{{ getBackendError('offer_applicable') }}</div>
                        <div v-if="V1$.form.offer_applicable.$errors[0]" class="text-red-500">{{ V1$.form.offer_applicable.$errors[0].$message }}</div>
                    </div>
                    <div class="w-full md:w-1/2 px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="icon">Icon</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        
                        <div class="flex justify-between">
                            <div class="w-full">
                                <input v-model="form.icon" name="icon" class="modal-input-style" placeholder="Icon">
                            </div>
                            <div class="w-2/6 bg-kakaPrimary">
                                <p @click="selectImage" class="flex justify-center items-center w-full px-4 py-2 cursor-pointer"> 
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                        </svg>

                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="text-red-500 mr-1">{{ getBackendError('icon') }}</div>
                        <div v-if="V1$.form.icon.$errors[0]" class="text-red-500">{{ V1$.form.icon.$errors[0].$message }}</div>
                    </div>
                    <div class="w-full md:w-1/2 px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="banner">Banner</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <div class="flex justify-between">
                            <div class="w-full">
                                 <input v-model="form.banner" name="banner" class="modal-input-style" placeholder="Banner">
                            </div>
                            <div class="w-2/6 bg-kakaPrimary">
                                <p @click="selectBanner" class="flex justify-center items-center w-full px-4 py-2 cursor-pointer"> 
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                        </svg>

                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="text-red-500 mr-1">{{ getBackendError('banner') }}</div>
                        <div v-if="V1$.form.banner.$errors[0]" class="text-red-500">{{ V1$.form.banner.$errors[0].$message }}</div>
                    </div>

                    <div class="w-full md:w-1/2 px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="thing_will_love">Thing Will Love</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <input v-model="form.thing_will_love" name="thing_will_love" class="modal-input-style" placeholder="thing_will_love">
                        <div class="text-red-500 mr-1">{{ getBackendError('thing_will_love') }}</div>
                    </div>
                    <div class="w-full md:w-1/2 px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="description">Description</label>
                        </div>
                        <textarea v-model="form.description" class="modal-input-style" id="description" name="description" rows="4" cols="50">
                        </textarea> 
                    </div>
                    
                </div>
                <div class="mt-8 w-full flex flex-wrap items-center space-x-2 md:space-x-10">
                    <div class="">
                        <button @click="reset" class="px-10 rounded-sm py-2.5 text-white bg-orange-600" type="reset">{{ $t('message.reset') }}</button>
                    </div>
                    <div class="">
                        <button class="px-10 rounded-sm py-2.5 bg-kakaPrimary text-white dark:text-black100" type="submit">{{ $t('message.submit') }}</button>     
                    </div>
                </div>
            </form>
            <div v-if="imageModel" class="imageModel absolute top-0 left-0 w-full h-full z-90">
                <div class="flex w-full h-full bg-black-op justify-center items-center">
                    <div class="w-1/2 bg-white h-300px overflow-y-auto">
                        <p @click="closeIcon" class="flex justify-end px-4 py-2">
                            <span class=" cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>

                            </span>
                        </p>
                        <div class="flex flex-wrap">
                            <div v-for="(item, index) in tableData" :key="index" class="md:w-1/4 w-full">
                               <div @click="iconUrl(item.url)" class="px-4 py-4">
                                 <div>
                                    <img :src="item.url" alt="">
                                </div>
                                <p class="text-center">{{item.name}}</p>
                               </div>
                            </div>
                        </div>
                        <div class="px-4 py-4">
                             <a href="/admin/images/upload" class="inline-block w-full px-4 py-4 text-center bg-kakaPrimary">Add More</a>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="bannerModel" class="absolute top-0 left-0 w-full h-full z-90">
                <div class="flex w-full h-full bg-black-op justify-center items-center">
                    <div class="w-1/2 bg-white h-300px overflow-y-auto">
                    <p @click="closeBanner" class="flex justify-end px-4 py-2">
                            <span class=" cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>

                            </span>
                        </p>
                        <div class="flex flex-wrap">
                            <div v-for="(item, index) in tableData" :key="index" class="md:w-1/4 w-full">
                               <div @click="bannerUrl(item.url)" class="px-4 py-4">
                                 <div>
                                    <img :src="item.url" alt="">
                                </div>
                                <p class="text-center">{{item.name}}</p>
                               </div>
                            </div>
                        </div>
                         <div class="px-4 py-4">
                             <a href="/admin/images/upload" class="inline-block w-full px-4 py-4 text-center bg-kakaPrimary">Add More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script lang="ts">

import { defineComponent, ref, reactive, computed, Ref, onMounted, toRefs, onUnmounted } from 'vue'

import ActionModalVue from '../../../components/list/ActionModal.vue';
import PageHeader from '../../../components/list/PageHeader.vue';
import PackageService from "../../../services/package";
import { PackageUpdateRequest } from '../../../types/package';
import LocationService from "../../../services/location";
import { LocationListRequest } from '../../../types/location';
import ImageService from "../../../services/imageUpload";
import { ListImageRequest } from "../../../types/imageupload";
import { useVuelidate } from '@vuelidate/core'
import { email, helpers, integer, maxLength, minLength, numeric, required, url } from '@vuelidate/validators'
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Loader from '../../../components/comp/Loader.vue';
import config from '../../../config';


let createpackage: PackageUpdateRequest= {
id : "",    
name: "",
source: "",
destination: "",
description: "",
duration: "",
days: "",
nights: "",
persons: "",
base_price: "",
discount_price: "",
price: "",
booking_amount: "",
offer_applicable: "",
icon: "",
banner: "",
thing_will_love: "",
}
let listFilterData : LocationListRequest={
        perPage:100000,
        page:1,
}

export default defineComponent({
    components: {ActionModalVue, PageHeader, Loader },
    name: 'car-create',
    setup(){
        const { t } = useI18n();
        const router = useRouter();
        const route = useRoute();
        const YOUR_GOOGLE_MAPS_API_KEY = config.googleApiKey;
        const center = ref({ lat: 37.7749, lng: -122.4194 });
         const zoom = ref(10);
        const fileInput = ref<HTMLInputElement | null>(null);
        const selectedFile = ref<File | null>(null);
        const state = reactive(
            {
                isLoading:true,
                form:createpackage,
                 filterForm:listFilterData,
                tableData: <any>[],
                locationData: <any>[],
                backendErrors:<any>{},
                phoneValidate:false,
                authModalOpen:false,
                imageModel: false,
                bannerModel: false
            }
        );

        const createRule = {
            form:{
                name: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                    },
                source: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                        numeric: helpers.withMessage(t('message.number-is-required'), numeric),
                    },
                destination: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                        numeric: helpers.withMessage(t('message.number-is-required'), numeric),
                    },
                description: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                    },
                duration: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                    },
                days: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                        numeric: helpers.withMessage(t('message.number-is-required'), numeric),
                    },
                nights: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                        numeric: helpers.withMessage(t('message.number-is-required'), numeric),
                    },
                persons: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                        numeric: helpers.withMessage(t('message.number-is-required'), numeric),
                    },
                base_price: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                        numeric: helpers.withMessage(t('message.number-is-required'), numeric),
                    },
                discount_price: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                        numeric: helpers.withMessage(t('message.number-is-required'), numeric),
                    },
                price: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                        numeric: helpers.withMessage(t('message.number-is-required'), numeric),
                    },
                booking_amount: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                        numeric: helpers.withMessage(t('message.number-is-required'), numeric),
                    },
                offer_applicable: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                    },
                icon: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                        url: helpers.withMessage(t('message.Valid-url'), url)
                    },
                banner: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                        url: helpers.withMessage(t('message.Valid-url'), url)

                    },
                
            },
        }
         const V1$ = useVuelidate(createRule, state)
        const getBackendError=(item:any)=>{
            for (const key in state.backendErrors) {
                if(item==key){
                    return state.backendErrors[key];
                }
            }
        }
        

        const packagesSubmit = () => {
            V1$?.value.$touch();
            if (V1$?.value.$invalid) {
                return;
            }else{
            let id = route.params.id;
            let ID =id.toString()
            state.form.id = ID
        new PackageService().UpdatePackage(state.form).then((response:any)=>{
                if(response !== undefined && response.data!== undefined){
                    router.push({ path:"/admin/packages" })
                }
            }).catch((error)=>{
                console.log("error",error)
            });
    }
};



function selectImage(){
    state.imageModel = true;
}
function closeIcon(){
    state.imageModel = false;
}
function selectBanner(){
    state.bannerModel = true;
}
function closeBanner(){
    state.bannerModel = false;
}
function iconUrl(url:any){
    state.form.icon = url
    state.imageModel = false;
}
function bannerUrl(url:any){
    state.form.banner = url
    state.bannerModel = false;
}
const ImageList = ()=>{
    new ImageService().listOfImage().then((response:any)=>{
      console.log("response",response)
        if(response !== undefined){
             state.tableData = response.data.data;
            
        }
    }).catch((error)=>{});
}

 const ListLocations = ()=>{
            new LocationService().listOfLocation(state.filterForm).then((response:any)=>{
                if(response !== undefined){
                    state.locationData = response.data.data
                }
            }).catch((error)=>{});
        }

const getPackageView = () => {
        let id = route.params.id;
        let ID =id.toString()
      new PackageService().GetPackageView(ID).then((response: any) => {
          console.log("response", response);
          if (response !== undefined && response.data!== undefined) {
            state.form.name =response.data.name
            state.form.source = response.data.source
            state.form.destination = response.data.destination
            state.form.description = response.data.description
            state.form.duration = response.data.duration
            state.form.days = response.data.days
            state.form.nights = response.data.nights
            state.form.persons = response.data.persons
            state.form.base_price = response.data.base_price
            state.form.discount_price = response.data.discount_price
            state.form.price = response.data.price
            state.form.booking_amount = response.data.booking_amount
            state.form.offer_applicable = response.data.offer_applicable
            state.form.icon = response.data.icon
            state.form.banner = response.data.banner
            state.form.thing_will_love = response.data.thing_will_love
          }
        })
        .catch((error) => {});
    };

        const reset=()=>{
            state.form.name = "",
            state.form.source = "",
            state.form.destination = "",
            state.form.description = "",
            state.form.duration = "",
            state.form.days = "",
            state.form.nights = "",
            state.form.persons = "",
            state.form.base_price = "",
            state.form.discount_price = "",
            state.form.price = "",
            state.form.booking_amount = "",
            state.form.offer_applicable = "",
            state.form.icon = "",
            state.form.banner = "",
            state.form.thing_will_love = "",
            V1$.value.$reset();
        }
        
       
        onMounted(()=>{
            getPackageView();
            ListLocations();
            ImageList();
            setTimeout(() => {
              state.isLoading = false  
            }, 1000);
        })
        onUnmounted(() => {
            reset();
        });


        return {
            ...toRefs(state),getBackendError, V1$, packagesSubmit, fileInput,reset,
             center,zoom,selectImage,ImageList,iconUrl,selectBanner,bannerUrl,ListLocations,
             closeIcon, closeBanner
        }
    }
  
})
</script>
