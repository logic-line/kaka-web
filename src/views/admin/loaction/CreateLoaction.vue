<template>
    <div class="overflow-hidden px-6 py-4">
        <div v-if="isLoading" class="h-[507px] pt-2 pr-3" >
          <Loader :isLoading="isLoading" />
        </div>
        <PageHeader  
        title="Add Location">
            <template v-slot:body>
                <router-link to="/admin/locations" class="flex items-center justify-center bg-kakaPrimary dark:text-black100 py-2.5 px-8 w-full rounded-sm bor">
                    {{ $t('message.back-to-list') }}
                </router-link>
            </template>
        </PageHeader>
        <div class="p-4 shadow-md bg-gray-50 dark:bg-secondary10 dark:text-white relative">
            <div class="w-full  px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="latitude">Location</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                       <!-- map  -->
                        <div>
                            <GoogleMap ref="googleMap" :center="center" :zoom="zoom" style="width: 100%; height: 400px;" @click="handleMapClick">
                                <Marker :position="center" />
                            </GoogleMap>
                        </div>
                       <!-- map  -->
                    </div>
            <form @submit.prevent="locationSubmit">
                <div class="flex flex-wrap">
                     <div class="w-full md:w-1/2 px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="latitude">Latitude</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <input v-model="form.latitude" name="latitude" class="modal-input-style" placeholder="Latitude">
                        <div class="text-red-500 mr-1">{{ getBackendError('latitude') }}</div>
                        <div v-if="V1$.form.latitude.$errors[0]" class="text-red-500">{{ V1$.form.latitude.$errors[0].$message }}</div>
                    </div>
                    <div class="w-full md:w-1/2 px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="longitude">longitude</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <input v-model="form.longitude" name="longitude" class="modal-input-style" placeholder="longitude">
                        <div class="text-red-500 mr-1">{{ getBackendError('longitude') }}</div>
                        <div v-if="V1$.form.longitude.$errors[0]" class="text-red-500">{{ V1$.form.longitude.$errors[0].$message }}</div>
                    </div>
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
                            <label class="block capitalize" for="reference">Reference</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <input v-model="form.reference" name="reference" class="modal-input-style" placeholder="Reference">
                        <div class="text-red-500 mr-1">{{ getBackendError('reference') }}</div>
                        <div v-if="V1$.form.reference.$errors[0]" class="text-red-500">{{ V1$.form.reference.$errors[0].$message }}</div>
                    </div>
                    <div class="w-full md:w-1/2 px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="enabled">Enabled</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <select v-model="form.enabled" name="enabled" class="modal-input-style">
                            <option value="" selected disabled>Select Enabled</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                        <div class="text-red-500 mr-1">{{ getBackendError('enabled') }}</div>
                        <div v-if="V1$.form.enabled.$errors[0]" class="text-red-500">{{ V1$.form.enabled.$errors[0].$message }}</div>
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
                <div class="flex w-full h-full bg-black-op justify-center items-center px-4 py-4">
                    <div class="w-full md:w-1/2 bg-white h-420 overflow-y-auto">
                        <div v-if="!addImage">
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
                                        <img class="h-full md:h-24 w-full" :src="item.url" alt="">
                                    </div>
                                    <p class="text-center">{{item.name}}</p>
                                </div>
                                </div>
                            </div>
                            <div class="px-4 py-4">
                                <a @click="addMore" class="inline-block w-full px-4 py-4 text-center bg-kakaPrimary cursor-pointer">Add More</a>
                            </div>
                        </div>
                         <div v-if="addImage">
                            <p @click="closeAddImage" class="flex justify-end px-4 py-2">
                            <span class=" cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>

                            </span>
                            </p>
                             <div class="px-4 py-4">
                                <div class="file-upload w-full px-4 bg-gray-100 border shadow-xl">
                                <form class="py-10 px-4" @submit.prevent="submitForm">
                                <div>
                                    <div class="flex w-full items-center justify-center bg-grey-lighter">
                                    <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
                                        <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                        </svg>
                                        <span class="mt-2 text-base leading-normal">Select a file</span>
                                        <input type='file' @change="onFileChange" class="hidden" />
                                    </label>
                                </div>
                                </div>
                                <div class="w-full">
                                        <div class="flex items-center py-4 mb-2">
                                            <input v-model="saveimageform.name" name="CarName" class="modal-input-style" placeholder="Image Name">
                                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                                        </div>
                                        <div class="text-red-500 mr-1">{{ getBackendError2('name') }}</div>
                                        <div v-if="V2$.saveimageform.name.$errors[0]" class="text-red-500">{{ V2$.saveimageform.name.$errors[0].$message }}</div>
                                </div>
                                <div class="mt-4 w-full flex flex-wrap justify-center items-center">
                                        <div class="">
                                            <button class="px-10 rounded-sm py-2.5 bg-kakaPrimary text-white dark:text-black100" type="submit">{{ $t('message.submit') }}</button>     
                                        </div>
                                    </div>
                                </form>
                                <div v-if="file" class="pb-4 w-full flex justify-center items-center">
                                <p class="text-sm">Selected File: {{ file.name }}</p>
                                </div>
                            </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="bannerModel" class="absolute top-0 left-0 w-full h-full z-90">
                <div class="flex w-full h-full bg-black-op justify-center items-center px-4 py-4">
                    <div class="w-full md:w-1/2 bg-white h-420 overflow-y-auto">
                        <div v-if="!addImage">
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
                                        <img class="h-full md:h-24 w-full" :src="item.url" alt="">
                                        
                                    </div>
                                    <p class="text-center">{{item.name}}</p>
                                </div>
                                </div>
                            </div>
                             <div class="px-4 py-4">
                                <a @click="addMore" class="inline-block w-full px-4 py-4 text-center bg-kakaPrimary cursor-pointer">Add More</a>
                            </div>
                        </div>
                        <div v-if="addImage">
                            <p @click="closeAddImage" class="flex justify-end px-4 py-2">
                            <span class=" cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>

                            </span>
                            </p>
                             <div class="px-4 py-4">
                                <div class="file-upload w-full px-4 bg-gray-100 border shadow-xl">
                                <form class="py-10 px-4" @submit.prevent="submitForm">
                                <div>
                                    <div class="flex w-full items-center justify-center bg-grey-lighter">
                                    <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
                                        <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                        </svg>
                                        <span class="mt-2 text-base leading-normal">Select a file</span>
                                        <input type='file' @change="onFileChange" class="hidden" />
                                    </label>
                                </div>
                                </div>
                                <div class="w-full">
                                        <div class="flex items-center py-4 mb-2">
                                            <input v-model="saveimageform.name" name="CarName" class="modal-input-style" placeholder="Image Name">
                                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                                        </div>
                                        <div class="text-red-500 mr-1">{{ getBackendError2('name') }}</div>
                                        <div v-if="V2$.saveimageform.name.$errors[0]" class="text-red-500">{{ V2$.saveimageform.name.$errors[0].$message }}</div>
                                </div>
                                <div class="mt-4 w-full flex flex-wrap justify-center items-center">
                                        <div class="">
                                            <button class="px-10 rounded-sm py-2.5 bg-kakaPrimary text-white dark:text-black100" type="submit">{{ $t('message.submit') }}</button>     
                                        </div>
                                    </div>
                                </form>
                                <div v-if="file" class="pb-4 w-full flex justify-center items-center">
                                <p class="text-sm">Selected File: {{ file.name }}</p>
                                </div>
                            </div>
                             </div>
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
import { CreateLocation } from '../../../types/location';
import LocationService from "../../../services/location";
import ImageService from "../../../services/imageUpload";
import { ListImageRequest } from "../../../types/imageupload";
import { SaveImageRequest } from '../../../types/imageupload';
import { useVuelidate } from '@vuelidate/core'
import { email, helpers, integer, maxLength, minLength, numeric, required, url } from '@vuelidate/validators'
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Loader from '../../../components/comp/Loader.vue';
import config from '../../../../../web/src/config';
import { GoogleMap, Marker } from 'vue3-google-map';
import axios from 'axios';


let createlocation: CreateLocation= {
name:"",
reference:"",
latitude:"",
longitude:"",
enabled:"",
icon:"",
banner:"",
}
let listFilterData: ListImageRequest = {
  perPage: 20,
  page: 1,
};
let saveimage : SaveImageRequest={
        name:'',
        url:'',
}

export default defineComponent({
    components: {ActionModalVue, PageHeader, Loader,GoogleMap,Marker },
    name: 'car-create',
    setup(){
        const { t } = useI18n();
        const router = useRouter();
        const YOUR_GOOGLE_MAPS_API_KEY = config.googleApiKey;
        // 24.72982116494692, 46.68102461267188 
        const center = ref({ lat: 24.72982116494692, lng: 46.68102461267188 });
         const zoom = ref(10);
        const fileInput = ref<HTMLInputElement | null>(null);
        const selectedFile = ref<File | null>(null);
        const state = reactive(
            {
                isLoading:true,
                form:createlocation,
                iform: {
                     file: null as File | null,
                },
                tableData: <any>[],
                backendErrors:<any>{},
                phoneValidate:false,
                authModalOpen:false,
                imageModel: false,
                bannerModel: false,
                addImage:false,
                saveimageform: saveimage,
            }
        );

        const createRule = {
            form:{
                name: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                        },
                reference: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                        },
                latitude: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                        },
                longitude: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                        },
                enabled: {
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

        const createRule2 = {
            saveimageform:{
                name: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                        },
            },
        }
         const V2$ = useVuelidate(createRule2, state)
        const getBackendError2=(item:any)=>{
            for (const key in state.backendErrors) {
                if(item==key){
                    return state.backendErrors[key];
                }
            }
        }
        

        const locationSubmit = () => {
            V1$?.value.$touch();
            if (V1$?.value.$invalid) {
                return;
            }else{
        new LocationService().CreateLocation(state.form).then((response:any)=>{
            console.log("response create",response)
            console.log("response create data",response.data)
                if(response !== undefined && response.data !== undefined){
                    console.log("sohan")
                    router.push({ path:"/admin/locations" })
                }
            }).catch((error)=>{
                console.log("error",error)
            });
    }
};
// file upload start
 const file = ref<File | null>(null);
    const fileSize = ref<number | null>(null);

    const onFileChange = (event: any) => {
      const selectedFile = event.target.files[0];
      file.value = selectedFile;
      fileSize.value = selectedFile.size;
      state.iform.file = selectedFile;
      const parts = selectedFile.name.split('.');
      const parts2 = parts[0];
      state.saveimageform.name = parts2
      submitImage()
    };
     const submitImage = () => {
    const formData = new FormData();
    if (state.iform.file) {
      formData.append("image", state.iform.file); 
      const url = config.authUrl + "/image/upload";
      const token = localStorage.getItem('token');
      axios.post(url, formData, {
        headers: {
          'Authorization':'Bearer '+token,
          "Content-Type": "multipart/form-data",
          "X-API-KEY": config.apiKey
        }
      })
      .then((response: any) => {
        console.log("Upload successful! 1", response.data);
        state.saveimageform.url = response.data.data
        
      })
      .catch((error: any) => {
        console.error("Error:", error);
      });
    }
};
const submitForm = () => {
    V2$?.value.$touch();
     if (V2$?.value.$invalid) {
         return;
     }else{
          const url = config.authUrl + "/image";
            const token = localStorage.getItem('token');
            const params = {
                name: state.saveimageform.name,
                url: state.saveimageform.url,
              };
            axios.post(url, params, {
              headers: {
                'Authorization':'Bearer '+token,
                'Content-Type': 'application/json',
                "X-API-KEY": config.apiKey
              }
            })
            .then((response: any) => {
                ImageList();
              state.addImage = false;
            })
            .catch((error: any) => {
              console.error("Error:", error);
        });
    }
};
// file upload  end



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
function addMore(){
    state.addImage = true;
}
function closeAddImage(){
    state.addImage = false;
}
const ImageList = ()=>{
            new ImageService().listOfImage().then((response:any)=>{
              console.log("response",response)
                if(response !== undefined){
                     state.tableData = response.data.data;
                    
                }
            }).catch((error)=>{});
        }

        const reset=()=>{
                        state.form.name= "";
                        state.form.reference= "";
                        state.form.latitude= "";
                        state.form.longitude= "";
                        state.form.enabled= "";
                        state.form.icon= "";
                        state.form.banner= "";
            V1$.value.$reset();
        }
        
   
    function handleMapClick(event:any) {
      const clickedLatLng = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      state.form.latitude = clickedLatLng.lat.toString();
     state.form.longitude = clickedLatLng.lng.toString();
    }
       
        onMounted(()=>{
            ImageList();
            setTimeout(() => {
              state.isLoading = false  
            }, 1000);
        })
        onUnmounted(() => {
            reset();
        });


        return {
            ...toRefs(state),getBackendError, V1$, locationSubmit, fileInput,reset,
             center,zoom,selectImage,ImageList,iconUrl,selectBanner,bannerUrl,
             closeIcon, closeBanner, handleMapClick,addMore,closeAddImage,submitImage, submitForm, onFileChange, V2$, getBackendError2,
        }
    }
  
})
</script>
