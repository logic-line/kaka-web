<template>
    <div class="overflow-hidden px-6 py-4 relative">
        <div v-if="isLoading" class="h-[507px] pt-2 pr-3" >
          <Loader :isLoading="isLoading" />
        </div>
        <PageHeader  
        title="Update Product">
            <template v-slot:body>
                <router-link to="/admin/ecommerce/products" class="flex items-center justify-center bg-kakaPrimary dark:text-black100 py-2.5 px-8 w-full rounded-sm bor">
                    {{ $t('message.back-to-list') }}
                </router-link>
            </template>
        </PageHeader>
        <div class="shadow-md bg-gray-50 dark:bg-secondary10 dark:text-white h-540 overflow-y-auto">
           
            <form @submit.prevent="productSubmit">
                <div class="flex flex-wrap">
                     <div class="w-full md:w-1/2 px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="product_category_id">Category</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <select v-model="form.product_category_id" name="product_category_id" class="modal-input-style">
                            <option value="" selected disabled>Select Category</option>
                            <option  v-for="data in categoryData" :key="data.id" :value="data.id">{{data.title}}</option>
                        </select>
                        <div class="text-red-500 mr-1">{{ getBackendError('product_category_id') }}</div>
                        <div v-if="V1$.form.product_category_id.$errors[0]" class="text-red-500">{{ V1$.form.product_category_id.$errors[0].$message }}</div>
                    </div>
                    <div class="w-full md:w-1/2 px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="title">Title</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <input v-model="form.title" name="title" class="modal-input-style" placeholder="Title">
                        <div class="text-red-500 mr-1">{{ getBackendError('title') }}</div>
                        <div v-if="V1$.form.title.$errors[0]" class="text-red-500">{{ V1$.form.title.$errors[0].$message }}</div>
                    </div>
                    <div class="w-full md:w-1/2 px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="base_price">Base Price</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <input v-model="form.base_price" name="base_price" class="modal-input-style" placeholder="Base Price">
                        <div class="text-red-500 mr-1">{{ getBackendError('base_price') }}</div>
                        <div v-if="V1$.form.base_price.$errors[0]" class="text-red-500">{{ V1$.form.base_price.$errors[0].$message }}</div>
                    </div>
                    <div class="w-full md:w-1/2 px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="price">Price</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <input v-model="form.price" name="price" class="modal-input-style" placeholder="Price">
                        <div class="text-red-500 mr-1">{{ getBackendError('price') }}</div>
                        <div v-if="V1$.form.price.$errors[0]" class="text-red-500">{{ V1$.form.price.$errors[0].$message }}</div>
                    </div>
                    <div class="w-full md:w-1/2 px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="stock">Stock</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <input v-model="form.stock" name="stock" class="modal-input-style" placeholder="Stock">
                        <div class="text-red-500 mr-1">{{ getBackendError('stock') }}</div>
                        <div v-if="V1$.form.stock.$errors[0]" class="text-red-500">{{ V1$.form.stock.$errors[0].$message }}</div>
                    </div>
                    <div class="w-full md:w-1/2 px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="offer_message">Offer Message</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <input v-model="form.offer_message" name="offer_message" class="modal-input-style" placeholder="Offer Message">
                        <div class="text-red-500 mr-1">{{ getBackendError('offer_message') }}</div>
                        <div v-if="V1$.form.offer_message.$errors[0]" class="text-red-500">{{ V1$.form.offer_message.$errors[0].$message }}</div>
                    </div>
                     <div class="w-full md:w-1/2 px-4 py-4">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="offer_applicable">Offer Applicable</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <select v-model="form.offer_applicable" name="offer_applicable" class="modal-input-style">
                            <option value="" selected disabled>Select Offer Applicable</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                        <div class="text-red-500 mr-1">{{ getBackendError('Offer Applicable') }}</div>
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
                            <label class="block capitalize" for="description">Description</label>
                        </div>
                        <textarea v-model="form.description" class="modal-input-style" id="description" name="description" rows="4" cols="50">
                        </textarea> 
                    </div>
                    
                </div>
                <div class="mt-8 px-4 w-full flex flex-wrap items-center space-x-0 md:space-x-10">
                    <div class="py-2">
                        <button @click="reset" class="px-10 rounded-sm py-2.5 text-white bg-orange-600" type="reset">{{ $t('message.reset') }}</button>
                    </div>
                    <div class="py-2">
                        <button class="px-10 rounded-sm py-2.5 bg-kakaPrimary text-white dark:text-black100" type="submit">{{ $t('message.submit') }}</button>     
                    </div>
                </div>
                <div class="error py-4">
                    <p class="text-xs text-red-500">{{backerr}}</p>
                </div>
            </form>
            <div v-if="imageModel" class="imageModel absolute top-0 left-0 w-full h-full z-90">
                <div class="flex w-full h-full bg-black-op justify-center items-end md:items-center px-4 py-4">
                    <div class="w-full md:w-1/2 bg-white h-full md:h-420 overflow-y-auto">
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
                <div class="flex w-full h-full bg-black-op justify-center items-end md:items-center px-4 py-4">
                    <div class="w-full md:w-1/2 bg-white h-full md:h-420 overflow-y-auto">
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

import ActionModalVue from '../../../../components/list/ActionModal.vue';
import PageHeader from '../../../../components/list/PageHeader.vue';
import ProductService from "../../../../services/product";
import { ProductUpdateRequest } from '../../../../types/product';
import CategoryService from "../../../../services/category";
import { CategoryListRequest } from '../../../../types/category';
import ImageService from "../../../../services/imageUpload";
import { ListImageRequest } from "../../../../types/imageupload";
import { SaveImageRequest } from '../../../../types/imageupload';
import { useVuelidate } from '@vuelidate/core'
import { email, helpers, integer, maxLength, minLength, numeric, required, url } from '@vuelidate/validators'
import { useRouter,useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Loader from '../../../../components/comp/Loader.vue';
import config from '../../../../config';
import axios from 'axios';


let updateproduct: ProductUpdateRequest= {
        id : "",
        product_category_id: "",
        title: "",
        description: "",
        icon: "",
        banner: "",
        base_price: "",
        price: "",
        stock: "",
        offer_message: "",
        offer_applicable: "",
}
let saveimage : SaveImageRequest={
        name:'',
        url:'',
}
let listFilterData : CategoryListRequest={
        perPage:10,
        page:1,
}

export default defineComponent({
    components: {ActionModalVue, PageHeader, Loader },
    name: 'car-create',
    setup(){
        const { t } = useI18n();
        const router = useRouter();
         const route = useRoute();
        const fileInput = ref<HTMLInputElement | null>(null);
        const selectedFile = ref<File | null>(null);
        const state = reactive(
            {
                isLoading:true,
                form:updateproduct,
                filterForm:listFilterData,
                backerr: "",
                categoryData: <any>[],
                tableData: <any>[],
                backendErrors:<any>{},
                phoneValidate:false,
                authModalOpen:false,
                imageModel: false,
                bannerModel: false,
                addImage:false,
                saveimageform: saveimage,
                 iform: {
                     file: null as File | null,
                },

            }
        );

        const createRule = {
            form:{
                title: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                    },
                product_category_id: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                    },
                description: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                    },
                base_price: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                    },
                price: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                    },
                stock: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                    },
                offer_message: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
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
        

        const productSubmit = () => {
            V1$?.value.$touch();
            if (V1$?.value.$invalid) {
                return;
            }else{
            let id = route.params.id;
            let ID =id.toString()
            state.form.id = ID
        new ProductService().UpdateProduct(state.form).then((response:any)=>{
                if(response !== undefined && response.data!== undefined){
                    router.push({ path:"/admin/ecommerce/products" })
                }
                 if(response.error==true){
                    state.backerr = response.message
                }
            }).catch((error: any)=>{});
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
                state.saveimageform.name = '';
              state.addImage = false;

            })
            .catch((error: any) => {
               if(error.response != undefined){
                    if(error.response.status === 401){
                       localStorage.removeItem('token');
                       router.push({ path: "/signin" });
                   }
                }
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
function addMore(){
    state.addImage = true;
}
function closeAddImage(){
    state.addImage = false;
}
const ImageList = ()=>{
    new ImageService().listOfImage().then((response:any)=>{
        if(response !== undefined){
             state.tableData = response.data.data;
            
        }
    }).catch((error)=>{});
}
 const listCategory = ()=>{
            new CategoryService().listOfCategory(state.filterForm).then((response:any)=>{
                if(response !== undefined){
                    state.categoryData = response.data.data
                    
                }
            }).catch((error)=>{});
        }
const getProductView = () => {
        let id = route.params.id;
        let ID =id.toString()
      new ProductService().GetProductView(ID).then((response: any) => {
          if (response !== undefined && response.data!== undefined) {
            state.form.product_category_id =response.data.product_category_id
            state.form.title =response.data.title
            state.form.description = response.data.description
            state.form.icon = response.data.icon
            state.form.banner = response.data.banner
            state.form.base_price = response.data.base_price
            state.form.price = response.data.price
            state.form.stock = response.data.stock
            state.form.offer_message = response.data.offer_message
            state.form.offer_applicable = response.data.offer_applicable
          }
        })
        .catch((error) => {
             if(error.response != undefined){
                    if(error.response.status === 401){
                       localStorage.removeItem('token');
                       router.push({ path: "/signin" });
                   }
                }
        });
    };

        const reset=()=>{
            state.form.title = "",
            state.form.description = "",
            state.form.icon = "",
            state.form.banner = "",
            state.form.base_price
            state.form.price = "",
            state.form.stock = "",
            state.form.offer_message = "",
            state.form.offer_applicable = "",
            V1$.value.$reset();
        }
        
       
        onMounted(()=>{
            getProductView();
            ImageList();
            listCategory();
            setTimeout(() => {
              state.isLoading = false  
            }, 1000);
        })
        onUnmounted(() => {
            reset();
        });


        return {
            ...toRefs(state),getBackendError, V1$, productSubmit, fileInput,reset,selectImage,ImageList,iconUrl,selectBanner,bannerUrl,
             closeIcon, closeBanner,addMore,closeAddImage,submitForm,V2$,getBackendError2,onFileChange
        }
    }
  
})
</script>
