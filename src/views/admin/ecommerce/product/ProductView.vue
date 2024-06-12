<template>
  <div class="overflow-hidden px-6 py-4">
    <div v-if="isLoading" class="h-[507px] pt-2 pr-3">
      <Loader :isLoading="isLoading" />
    </div>
    <PageHeader title="Product View">
      <template v-slot:body>
        <router-link
          to="/admin/ecommerce/products"
          class="flex justify-center items-center bg-kakaPrimary py-2.5 px-8 w-full rounded-sm bor"
        >
          {{ $t("message.back-to-list") }}
        </router-link>
      </template>
    </PageHeader>

   <div class="md:px-8 py-8 px-4 mb-10  dark:bg-secondary10 dark:text-white border border-gray-300 dark:border-gray-500">
      <div v-if="!imageModel">
        <div  class="flex flex-wrap items-center justify-between border-b pb-4 border-gray-300 dark:border-gray-500">
        <p class="py-2">Product Details</p>
            <a href="javascript:;"
          @click="removeProduct"
          class="inline-block px-4 py-2 bg-red-500 text-white"
          >Remove Product</a>
       
      </div>
     
      <div>
        <div class="">
          <p class="text-center uppercase font-semibold bg-gray-300 py-2">Product Details</p>
      </div>
      <div class="my-4 flex flex-wrap bg-gray-50">
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Title</div>
            <div class="w-1/2 text-sm">
             {{ viewData.title}}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Status</div>
            <div class="w-1/2 text-sm">
             <span class="border px-4 py-1 rounded-xs" 
                                :class="viewData.enabled === true ? ' bg-kakaPrimary'
                                :' bg-gray-400 text-white'">
                                 {{viewData.enabled === true?'Active':'Inactive'}}
                            </span>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Base Price</div>
            <div class="w-1/2 text-sm">
              {{ viewData.base_price }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Price</div>
            <div class="w-1/2 text-sm">
              {{ viewData.price }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Stock</div>
            <div class="w-1/2 text-sm">
              {{ viewData.stock }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Offer Message</div>
            <div class="w-1/2 text-sm">
              {{ viewData.offer_message }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Offer applicable</div>
            <div class="w-1/2 text-sm">
              {{ viewData.offer_applicable }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Price</div>
            <div class="w-1/2 text-sm">
              {{ viewData.price }}
            </div>
          </div>
        </div>
        <div v-if="categoryData!==null" class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Category</div>
            <div class="w-1/2 text-sm">
              {{ categoryData.title }}
            </div>
          </div>
        </div>
        <div v-if="viewData.colors!=''" class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Colors</div>
            <div class="w-1/2 text-sm flex flex-wrap">
              <div class="text-sm" v-for="(item, index) in viewData.colors" :key="index">
              <div class="mr-2" >
                  {{item.name}},
                </div>
            </div>
            </div>
          </div>
        </div>
        <div v-if="viewData.sizes!=''" class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Sizes</div>
            <div class="w-1/2 text-sm flex flex-wrap">
               <div class="text-sm" v-for="(item, index) in viewData.sizes" :key="index">
              <div class="mr-2" >
                  {{item.name}},
                </div>
            </div>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Scheduled</div>
            <div class="w-1/2 text-sm">
              {{viewData.scheduled === true?'Active':'Inactive'}}
            </div>
          </div>
        </div>
         <div class="w-full px-4 py-4 border border-gray-200">
          <div class="w-full">
            <div class="font-semibold text-sm">Description</div>
            <div class="text-sm">
              {{ viewData.description }}
            </div>
          </div>
        </div>
         <div class="w-full px-4 py-4 border border-gray-200">
          <div class="w-full">
            <div class="font-semibold text-sm">Images</div>
            <div class="flex flex-wrap items-center justify-center">
              <div class="text-sm w-full md:w-1/6" v-for="(item, index) in viewData.images" :key="index">
              <div class="p-2">
                  <img class="h-28 w-full" :src="item.url" alt="">
                  <p @click="removeProductImage(item.id)" class="w-full text-sm bg-red-500 text-white text-center cursor-pointer">Remove</p>
              </div>
            </div>
            <div class="w-full md:w-1/6">
              <span @click="selectImage" class="ml-2  w-12 h-12 flex justify-center items-center rounded-full cursor-pointer">
                     <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
                  </span>
            </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      <div v-if="imageModel" class="imageModel absolute top-0 left-0 w-full h-full z-90">
                <div class="flex w-full h-full bg-black-op justify-center items-center px-4 py-4">
                    <div class="w-full md:w-1/2 bg-white h-420 overflow-y-auto">
                        <div v-if="!addImage && !addQurbaniImage">
                            <p @click="closeIcon" class="flex justify-end px-4 py-2">
                            <span class=" cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>

                            </span>
                            </p>
                            <div class="flex flex-wrap">
                                <div v-for="(item, index) in tableData" :key="index" class="md:w-1/4 w-full">
                                <div @click="iconID(item.url)" class="px-4 py-4">
                                    <div>
                                        <img class="h-32" :src="item.url" alt="">
                                    </div>
                                    <p class="text-center">{{item.name}}</p>
                                </div>
                                </div>
                            </div>
                            <div class="px-4 py-4">
                                <a @click="addMore" class="inline-block w-full px-4 py-4 text-center bg-kakaPrimary cursor-pointer">Add More</a>
                            </div>
                        </div>
                         <div v-if="addQurbaniImage">
                            <p @click="closeQurbaniImage" class="flex justify-end px-4 py-2">
                            <span class=" cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>

                            </span>
                            </p>
                            <!-- add image form start  -->
                             <div class="px-4 py-4">
                                <div class="file-upload w-full px-4 bg-gray-100 border shadow-xl">
                                <form class="py-10 px-4" @submit.prevent="submitImageForm">
                                
                                <div class="w-full">
                                        <div class="flex items-center py-4 mb-2">
                                            <input v-model="productimageform.url" name="url" class="modal-input-style" placeholder="URL">
                                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                                        </div>
                                        <div class="text-red-500 mr-1">{{ getBackendError3('url') }}</div>
                                        <div v-if="V3$.productimageform.url.$errors[0]" class="text-red-500">{{ V3$.productimageform.url.$errors[0].$message }}</div>
                                </div>
                                <div class="w-full">
                                        <div class="flex items-center py-4 mb-2">
                                            <input v-model="productimageform.title" name="title" class="modal-input-style" placeholder="TITLE">
                                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                                        </div>
                                        <div class="text-red-500 mr-1">{{ getBackendError3('title') }}</div>
                                        <div v-if="V3$.productimageform.title.$errors[0]" class="text-red-500">{{ V3$.productimageform.title.$errors[0].$message }}</div>
                                </div>
                                <div class="w-full">
                                  <div class="flex items-center py-4 mb-2">
                                            <select v-model="productimageform.enabled" name="enabled" class="modal-input-style py-3 mb-2">
                                              <option class=" text-gray-300" value="" selected disabled>SELECT ENABLED</option>
                                              <option value="1">Yes</option>
                                              <option value="0">No</option>
                                          </select>
                                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                                        </div>
                                  <div class="text-red-500 mr-1">{{ getBackendError3('enabled') }}</div>
                                  <div v-if="V3$.productimageform.enabled.$errors[0]" class="text-red-500">{{ V3$.productimageform.enabled.$errors[0].$message }}</div>
                              </div>
                               <div class="w-full">
                                  <textarea v-model="productimageform.description" placeholder="DESCRIPTION" class="modal-input-style" id="description" name="description" rows="4" cols="50">
                                  </textarea> 
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
                            <!-- add image form end  -->

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
import { defineComponent, ref, reactive, computed, Ref, onMounted, toRefs } from "vue";

import PageHeader from "../../../../components/list/PageHeader.vue";
import { useRoute, useRouter } from "vue-router";
import { toastrMsg } from "../../../../utils/toastr";
import { useI18n } from "vue-i18n";
import ProductService from "../../../../services/product";
import ImageService from "../../../../services/imageUpload";
import { SaveImageRequest } from '../../../../types/imageupload';
import { DeleteProductImage, CreateProductImage } from '../../../../types/product';
import { GoogleMap,Marker } from 'vue3-google-map';
import Loader from "../../../../components/comp/Loader.vue";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import config from "@/config";
import axios from "axios";

declare var google: any; // Declare the 'google' namespace

let delProductImage : DeleteProductImage={
        productId:'',
        imageId:'',
}
let createProductImage : CreateProductImage={
        url:'',
        title:'',
        description:'',
        enabled:'',
}

let saveimage : SaveImageRequest={
        name:'',
        url:'',
}

export default defineComponent({
  components: { PageHeader, Loader,GoogleMap, Marker},
  name: "ServiceAppointment",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { t } = useI18n();
    const myDiv = ref<HTMLDivElement | null>(null); 
    const zoom = ref(10);
    const state = reactive({
      isLoading: true,
      isFileUpload: false,
      delProduct:delProductImage,
      productimageform:createProductImage,
      tableData: <any>[],
      roleList: <any>[],
      backendErrors:<any>{},
      iform: {
                     file: null as File | null,
                },
      viewData: {},
      categoryData: {},
      imageModel: false,
      addImage:false,
      addQurbaniImage:false,
      saveimageform: saveimage,
      centerS : <any>{},
      centerD : <any>{},
      productID: computed(() => route.params.id.toString()),
    });
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

    const createRule3 = {
            productimageform:{
                url: {
                      required1: helpers.withMessage(`${t('message.required')}`, required),
                      },
                title: {
                      required1: helpers.withMessage(`${t('message.required')}`, required),
                      },
                description: {
                      required1: helpers.withMessage(`${t('message.required')}`, required),
                      },
                enabled: {
                      required1: helpers.withMessage(`${t('message.required')}`, required),
                      },
            },
        }
         const V3$ = useVuelidate(createRule3, state)
        const getBackendError3=(item:any)=>{
            for (const key in state.backendErrors) {
                if(item==key){
                    return state.backendErrors[key];
                }
            }
        }

    const removeProduct = () => {
      let id = route.params.id;
      let ID = id.toString();
      new ProductService()
        .RemoveProduct(ID)
        .then((response: any) => {
          if (response !== undefined) {
            router.push({ path: "/admin/ecommerce/products" });
          }
        })
        .catch((error) => {});
    };

    const getProductView = () => {
      new ProductService()
        .GetProductView(state.productID)
        .then((response: any) => {
          if (response !== undefined) {
            state.viewData = response.data;
            state.categoryData = response.data.category;
          }
        })
        .catch((error) => {});
    };
    
    const removeProductImage=(imageID:string)=>{
            let id = route.params.id;
            let ID =id.toString()
            state.delProduct.productId = ID
            state.delProduct.imageId = imageID
            new ProductService().RemoveProductImage(state.delProduct).then((response:any)=>{
                if(response !== undefined){
                   getProductView();
                }
            }).catch((error)=>{});
        }
       const ImageList = ()=>{
            new ImageService().listOfImage().then((response:any)=>{
                if(response !== undefined){
                     state.tableData = response.data.data;
                }
            }).catch((error)=>{
               if(error.response != undefined){
                    if(error.response.status === 401){
                       localStorage.removeItem('token');
                       router.push({ path: "/signin" });
                   }
                }
            });
        }

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
                  state.addImage = false;
                })
                .catch((error: any) => {
                  console.error("Error:", error);
            });
        }
    };
         const submitImageForm = () => {
        V3$?.value.$touch();
        if (V3$?.value.$invalid) {
            return;
        }else{
              let id = route.params.id;
               let ID =id.toString()
              const url = config.authUrl+"/product/"+ID+"/image";
                const token = localStorage.getItem('token');
                const params = {
                    url: state.productimageform.url,
                    title: state.productimageform.title,
                    description: state.productimageform.description,
                    enabled: state.productimageform.enabled,
                  };
                axios.post(url, params, {
                  headers: {
                    'Authorization':'Bearer '+token,
                    'Content-Type': 'application/json',
                    "X-API-KEY": config.apiKey
                  }
                })
                .then((response: any) => {
                  getProductView();
                  state.imageModel = false;
                  state.addImage = false;
                  state.addQurbaniImage = false;
                  getProductView();
                })
                .catch((error: any) => {
                  console.error("Error:", error);
            });
        }
    };
      function selectImage(){
          state.imageModel = true;
      }

      function iconID(url:any){
          state.productimageform.url = url
          state.addQurbaniImage = true;
      }
      function closeIcon(){
          state.imageModel = false;
      }
            function addMore(){
          state.addImage = true;
      }
      function closeAddImage(){
          state.addImage = false;
      }
      function closeQurbaniImage(){
          state.addQurbaniImage = false;
      }

    onMounted(() => {
      getProductView();
      ImageList();
      if (
        localStorage.getItem("fromRoute") &&
        localStorage.getItem("fromRoute") == "edit"
      ) {
        toastrMsg("User edit successful.");
      }
      setTimeout(() => {
        state.isLoading = false;
      }, 1000);
    });

    return {
      myDiv,
      zoom,
      removeProduct,
      iconID,
      removeProductImage,
      selectImage,
      closeIcon,
      addMore,
      closeAddImage,
      closeQurbaniImage,
      onFileChange,
      V2$,
      V3$,
      getBackendError2,
      getBackendError3,
      submitImageForm,
      submitForm,
      ...toRefs(state),
    };
  },
});
</script>
