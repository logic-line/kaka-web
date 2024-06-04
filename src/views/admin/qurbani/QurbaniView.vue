<template>
  <div class="overflow-hidden px-6 py-4">
    <div v-if="isLoading" class="h-[507px] pt-2 pr-3">
      <Loader :isLoading="isLoading" />
    </div>
    <PageHeader title="Qurbani View">
      <template v-slot:body>
        <router-link
          to="/admin/qurbanis"
          class="flex justify-center items-center bg-kakaPrimary py-2.5 px-8 w-full rounded-sm bor"
        >
          {{ $t("message.back-to-list") }}
        </router-link>
      </template>
    </PageHeader>

    <div class="p-8 mb-10 bg-gray-50 dark:bg-secondary10 dark:text-white border border-gray-300 dark:border-gray-500">
     
      <div v-if="!imageModel" class="w-full md:w-1/2 mx-auto shadow-2xl bg-white">
        <div class="flex justify-between">
            <p class="border px-4 py-2" :class="viewData.enabled === false ? 'bg-red-500 text-white' : 'bg-kakaPrimary'">
                {{viewData.enabled === false?'Inactive':'Active'}}
            </p>
            <a href="javascript:;" @click="removeQurbani" class="flex items-center px-4 bg-red-500 text-white">Remove Qurbani</a>
        </div>
          <div class="px-4 py-4">
            <div class="py-2">
            <p class="text-center text-xl py-2 bg-gray-300" >{{ viewData.name }}</p>
            </div>
            <div class="flex justify-center items-center">
                <img class="w-full md:w-1/2 mx-auto text-center" :src="viewData.icon" alt="icon" />
            </div>
            <div class="text-sm text-center py-2">
                <p>{{ viewData.description }}</p>
            </div>
            <div class="py-2">
              <div class="pb-4"><p class="text-center bg-gray-300 py-2">Animal Types</p></div>
                <div class="flex flex-wrap justify-center">
                  <div class="text-sm w-full md:w-1/2" v-for="(item, index) in viewData.types" :key="index">
                    <div class="px-2 py-2">
                      <div class="flex flex-wrap justify-between border shadow-md">
                        <div class="w-1/2 pb-2 px-4 text-left border-b py-2 bg-gray-200">Type</div>
                        <div class="w-1/2 pb-2 px-4 text-right border-b py-2 bg-gray-200">{{item.type}}</div>
                        
                        <div class="w-1/2 pb-2 px-4 text-left border-b py-2">Base Price</div>
                        <div class="w-1/2 pb-2 px-4 text-right border-b py-2">{{item.base_price}}</div>

                        <div class="w-1/2 pb-2 px-4 text-left  py-2">Price</div>
                        <div class="w-1/2 pb-2 px-4 text-right  py-2">{{item.price}}</div>
                    </div>
                    <div class="flex">
                    <p @click="updateQurbaniTypes(item.id)" class="w-full bg-kakaPrimary text-center text-sm cursor-pointer py-1">UPDATE</p>
                    <p @click="removeQurbaniType(item.id)" class="w-full bg-red-500 text-white text-center text-sm cursor-pointer py-1">REMOVE</p>
                    </div>
                    </div>
                </div>
                </div>
                <p @click="addQurbaniType" class="w-full bg-kakaPrimary text-sm cursor-pointer py-1 my-2 uppercase flex justify-center items-center">
                    Add More Animal Types
                    <span class="ml-1">
                      <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </span>
                 </p>
            </div>
            <div class="py-2">
                <ul class="flex flex-wrap justify-center items-center">
                  <li class="w-full md:w-1/4 p-1"  v-for="(item, index) in viewData.images" :key="index">
                    <div>
                      <img class="w-full h-28" :src="item.url" alt="">
                      <p @click="removeQurbaniImage(item.id)" class="w-full text-sm bg-red-500 text-white text-center cursor-pointer">Remove</p>
                    </div>
                    
                  </li>
                  <span @click="selectImage" class="ml-2  w-12 h-12 flex justify-center items-center rounded-full cursor-pointer">
                     <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
                  </span>
                </ul>
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
                                        <img :src="item.url" alt="">
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
                                            <input v-model="qurbaniimageform.url" name="url" class="modal-input-style" placeholder="URL">
                                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                                        </div>
                                        <div class="text-red-500 mr-1">{{ getBackendError3('url') }}</div>
                                        <div v-if="V3$.qurbaniimageform.url.$errors[0]" class="text-red-500">{{ V3$.qurbaniimageform.url.$errors[0].$message }}</div>
                                </div>
                                <div class="w-full">
                                        <div class="flex items-center py-4 mb-2">
                                            <input v-model="qurbaniimageform.title" name="title" class="modal-input-style" placeholder="TITLE">
                                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                                        </div>
                                        <div class="text-red-500 mr-1">{{ getBackendError3('title') }}</div>
                                        <div v-if="V3$.qurbaniimageform.title.$errors[0]" class="text-red-500">{{ V3$.qurbaniimageform.title.$errors[0].$message }}</div>
                                </div>
                                <div class="w-full">
                                  <div class="flex items-center py-4 mb-2">
                                            <select v-model="qurbaniimageform.enabled" name="enabled" class="modal-input-style py-3 mb-2">
                                              <option class=" text-gray-300" value="" selected disabled>SELECT ENABLED</option>
                                              <option value="1">Yes</option>
                                              <option value="0">No</option>
                                          </select>
                                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                                        </div>
                                  <div class="text-red-500 mr-1">{{ getBackendError3('enabled') }}</div>
                                  <div v-if="V3$.qurbaniimageform.enabled.$errors[0]" class="text-red-500">{{ V3$.qurbaniimageform.enabled.$errors[0].$message }}</div>
                              </div>
                               <div class="w-full">
                                  <textarea v-model="qurbaniimageform.description" placeholder="DESCRIPTION" class="modal-input-style" id="description" name="description" rows="4" cols="50">
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
       <div v-if="animalType" class="imageModel absolute top-0 left-0 w-full h-full z-90">
                <div class="flex w-full h-full bg-black-op justify-center items-center px-4 py-4">
                  <div class="w-full md:w-1/2 bg-white h-420 overflow-y-auto">
                      <p @click="closeQurbaniType" class="flex justify-end px-4 py-2">
                            <span class=" cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>

                            </span>
                            </p>
                            <p class="text-center uppercase text-lg">add new animal type</p>
                      <div class="px-4 py-4">
                           <form @submit.prevent="animalTypeSubmit">
                                <div class="flex flex-wrap">
                                    <div class="w-full md:w-1/2 px-4 py-4">
                                        <div class="flex items-center mb-2">
                                            <label class="block capitalize" for="type">Animal Type</label>
                                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                                        </div>
                                          <input v-model="animalTypeForm.type" name="type" class="modal-input-style" placeholder="type">
                                          <div class="text-red-500 mr-1">{{ getBackendError('type') }}</div>
                                          <div v-if="V1$.animalTypeForm.type.$errors[0]" class="text-red-500">{{ V1$.animalTypeForm.type.$errors[0].$message }}</div>
                                     </div>
                                    <div class="w-full md:w-1/2 px-4 py-4">
                                        <div class="flex items-center mb-2">
                                            <label class="block capitalize" for="base_price">Base Price</label>
                                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                                        </div>
                                          <input v-model="animalTypeForm.base_price" name="base_price" class="modal-input-style" placeholder="base_price">
                                          <div class="text-red-500 mr-1">{{ getBackendError('base_price') }}</div>
                                          <div v-if="V1$.animalTypeForm.base_price.$errors[0]" class="text-red-500">{{ V1$.animalTypeForm.base_price.$errors[0].$message }}</div>
                                     </div>
                                    <div class="w-full md:w-1/2 px-4 py-4">
                                        <div class="flex items-center mb-2">
                                            <label class="block capitalize" for="price">Price</label>
                                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                                        </div>
                                          <input v-model="animalTypeForm.price" name="price" class="modal-input-style" placeholder="price">
                                          <div class="text-red-500 mr-1">{{ getBackendError('price') }}</div>
                                          <div v-if="V1$.animalTypeForm.price.$errors[0]" class="text-red-500">{{ V1$.animalTypeForm.price.$errors[0].$message }}</div>
                                     </div>
                                    
                                </div>
                                <div class="mt-8 px-4 w-full flex flex-wrap items-center space-x-2 md:space-x-10">
                                    <div class="">
                                        <button @click="reset" class="px-10 rounded-sm py-2.5 text-white bg-orange-600" type="reset">{{ $t('message.reset') }}</button>
                                    </div>
                                    <div class="">
                                        <button class="px-10 rounded-sm py-2.5 bg-kakaPrimary text-white dark:text-black100" type="submit">{{ $t('message.submit') }}</button>     
                                    </div>
                                </div>
                            </form>
                      </div>
                   </div>
                </div>
        </div>
       <div v-if="updateAnimalType" class="imageModel absolute top-0 left-0 w-full h-full z-90">
                <div class="flex w-full h-full bg-black-op justify-center items-center px-4 py-4">
                  <div class="w-full md:w-1/2 bg-white h-420 overflow-y-auto">
                      <p @click="closeupdateQurbaniTypes" class="flex justify-end px-4 py-2">
                            <span class=" cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>

                            </span>
                            </p>
                            <p class="text-center uppercase text-lg">add new animal type</p>
                      <div class="px-4 py-4">
                           <form @submit.prevent="updateQurbaniTypeSubmit">
                                <div class="flex flex-wrap">
                                    <div class="w-full md:w-1/2 px-4 py-4">
                                        <div class="flex items-center mb-2">
                                            <label class="block capitalize" for="type">Animal Type</label>
                                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                                        </div>
                                          <input v-model="updateTypeForm.type" name="type" class="modal-input-style" placeholder="type">
                                          <div class="text-red-500 mr-1">{{ getBackendError4('type') }}</div>
                                          <div v-if="V4$.updateTypeForm.type.$errors[0]" class="text-red-500">{{ V4$.updateTypeForm.type.$errors[0].$message }}</div>
                                     </div>
                                    <div class="w-full md:w-1/2 px-4 py-4">
                                        <div class="flex items-center mb-2">
                                            <label class="block capitalize" for="base_price">Base Price</label>
                                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                                        </div>
                                          <input v-model="updateTypeForm.base_price" name="base_price" class="modal-input-style" placeholder="base_price">
                                          <div class="text-red-500 mr-1">{{ getBackendError4('base_price') }}</div>
                                          <div v-if="V4$.updateTypeForm.base_price.$errors[0]" class="text-red-500">{{ V4$.updateTypeForm.base_price.$errors[0].$message }}</div>
                                     </div>
                                    <div class="w-full md:w-1/2 px-4 py-4">
                                        <div class="flex items-center mb-2">
                                            <label class="block capitalize" for="price">Price</label>
                                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                                        </div>
                                          <input v-model="updateTypeForm.price" name="price" class="modal-input-style" placeholder="price">
                                          <div class="text-red-500 mr-1">{{ getBackendError4('price') }}</div>
                                          <div v-if="V4$.updateTypeForm.price.$errors[0]" class="text-red-500">{{ V4$.updateTypeForm.price.$errors[0].$message }}</div>
                                     </div>
                                    
                                </div>
                                <div class="mt-8 px-4 w-full flex flex-wrap items-center space-x-2 md:space-x-10">
                                    <div class="">
                                        <button @click="reset" class="px-10 rounded-sm py-2.5 text-white bg-orange-600" type="reset">{{ $t('message.reset') }}</button>
                                    </div>
                                    <div class="">
                                        <button class="px-10 rounded-sm py-2.5 bg-kakaPrimary text-white dark:text-black100" type="submit">{{ $t('message.submit') }}</button>     
                                    </div>
                                </div>
                            </form>
                      </div>
                   </div>
                </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive, ref,onMounted,toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { GoogleMap,Marker } from 'vue3-google-map';
import PageHeader from '../../../components/list/PageHeader.vue';
import Loader from '../../../components/comp/Loader.vue';
import QurbaniService from "../../../services/qurbani";
import { CreateQurbaniImage,DeleteQurbaniImage,DeleteQurbaniAnimalType,CreateQurbaniAnimalType,UpdateQurbaniAnimalType } from '../../../types/qurbani';
import { SaveImageRequest } from '../../../types/imageupload';
import ImageService from "../../../services/imageUpload";
import config from '../../../../src/config';
import router from '../../../../../web/src/router';
import axios from 'axios';
import useVuelidate from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';


let createqurbaniimage : CreateQurbaniImage={
        qurbaniid:'',
        url:'',
        title:'',
        description:'',
        enabled:'',
}

let saveimage : SaveImageRequest={
        name:'',
        url:'',
}

let delQurbaniImage : DeleteQurbaniImage={
        qurbaniid:'',
        imageId:'',
}
let createQurbaniAnimalType : CreateQurbaniAnimalType={
        qurbaniId:'',
        type:'',
        base_price:'',
        price:'',
}
let updateQurbaniAnimalType : UpdateQurbaniAnimalType={
        qurbaniId:'',
        typeID:'',
        type:'',
        base_price:'',
        price:'',
}
let delQurbaniType : DeleteQurbaniAnimalType={
        qurbaniid:'',
        typeId:'',
}


export default defineComponent({
  components: {PageHeader,Loader, Marker },
  setup() {
    const { t } = useI18n();
    const route = useRoute()
    const fileInput = ref<HTMLInputElement | null>(null);
    const selectedFile = ref<File | null>(null);
    const state = reactive(
            {
                isLoading:true,
                tableData: <any>[],
                viewData:{},
                imageid:"",
                qurbaniimageform:createqurbaniimage,
                animalTypeForm:createQurbaniAnimalType,
                updateTypeForm:updateQurbaniAnimalType,
                delqurreq:delQurbaniImage,
                deltypreq:delQurbaniType,
                backendErrors:<any>{},
                  iform: {
                     file: null as File | null,
                },
                imageModel: false,
                addImage:false,
                addQurbaniImage:false,
                animalType:false,
                updateAnimalType:false,
                saveimageform: saveimage,
            }
        );
         const createRule = {
            animalTypeForm:{
                type: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                        },
                base_price: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                        },
                price: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
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
     const createRule3 = {
            qurbaniimageform:{
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
     const createRule4 = {
            updateTypeForm:{
                type: {
                      required1: helpers.withMessage(`${t('message.required')}`, required),
                      },
                base_price: {
                      required1: helpers.withMessage(`${t('message.required')}`, required),
                      },
                price: {
                      required1: helpers.withMessage(`${t('message.required')}`, required),
                      },
            },
        }
        const V4$ = useVuelidate(createRule4, state)
        const getBackendError4=(item:any)=>{
            for (const key in state.backendErrors) {
                if(item==key){
                    return state.backendErrors[key];
                }
            }
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
              const url = config.authUrl+"/qurbani/"+ID+"/image";
              console.log("url",url)
                const token = localStorage.getItem('token');
                const params = {
                    url: state.qurbaniimageform.url,
                    title: state.qurbaniimageform.title,
                    description: state.qurbaniimageform.description,
                    enabled: state.qurbaniimageform.enabled,
                  };
                axios.post(url, params, {
                  headers: {
                    'Authorization':'Bearer '+token,
                    'Content-Type': 'application/json',
                    "X-API-KEY": config.apiKey
                  }
                })
                .then((response: any) => {
                  getQurbaniView();
                  state.imageModel = false;
                  state.addImage = false;
                  state.addQurbaniImage = false;

                  getQurbaniView();
                })
                .catch((error: any) => {
                  console.error("Error:", error);
            });
        }
    };
    const removeQurbaniImage=(imageID:string)=>{
            let id = route.params.id;
            let ID =id.toString()
            state.delqurreq.qurbaniid = ID
            state.delqurreq.imageId = imageID
            new QurbaniService().RemoveQurbaniImage(state.delqurreq).then((response:any)=>{
                if(response !== undefined){
                    console.log("delete succesfully")
                   getQurbaniView();
                }
            }).catch((error)=>{});
        }
    
        const ImageList = ()=>{
            new ImageService().listOfImage().then((response:any)=>{
                if(response !== undefined){
                     state.tableData = response.data.data;
                }
            }).catch((error)=>{});
        }
        const getQurbaniView=()=>{
             let id = route.params.id;
            let ID =id.toString()
            new QurbaniService().GetQurbaniView(ID).then((response:any)=>{
                if(response !== undefined){
                    state.viewData = response.data
                }
            }).catch((error)=>{});

        }
        const getQurbaniTypeView=(id:string)=>{
          console.log("xyz up",id)
            new QurbaniService().GetQurbaniTypeView(id).then((response:any)=>{
                if(response !== undefined){
                    console.log("response xyz",response.data)
                    state.animalTypeForm.type= response.data.type;
                    state.animalTypeForm.base_price= response.data.base_price;
                    state.animalTypeForm.price= response.data.price;
                }
            }).catch((error)=>{});

        }
        const removeQurbani=()=>{
            let id = route.params.id;
            let ID =id.toString()
            new QurbaniService().RemoveQurbani(ID).then((response:any)=>{
                if(response !== undefined){
                    console.log("delete succesfully")
                    router.push({ path:"/admin/qurbanis" })
                }
            }).catch((error)=>{});
        }
        const removeQurbaniType=(typeID:string)=>{
            let id = route.params.id;
            let ID =id.toString()
            state.deltypreq.qurbaniid = ID
            state.deltypreq.typeId = typeID
            new QurbaniService().RemoveQurbaniType(state.deltypreq).then((response:any)=>{
                if(response !== undefined){
                    console.log("delete succesfully")
                   getQurbaniView();
                }
            }).catch((error)=>{});
        }
        const animalTypeSubmit = () => {
            V1$?.value.$touch();
            if (V1$?.value.$invalid) {
                return;
            }else{
            let id = route.params.id;
            let ID =id.toString();
            state.animalTypeForm.qurbaniId = ID;
        new QurbaniService().CreateAnimalType(state.animalTypeForm).then((response:any)=>{
                if(response !== undefined && response.data !== undefined){
                   getQurbaniView()
                    state.animalType = false;
                    state.animalTypeForm.type= "";
                    state.animalTypeForm.base_price= "";
                    state.animalTypeForm.price= "";
                }
            }).catch((error)=>{
                console.log("error",error)
            });
    }
};
const updateQurbaniTypeSubmit = () => {
            V4$?.value.$touch();
            if (V4$?.value.$invalid) {
                return;
            }else{
            let id = route.params.id;
            let ID =id.toString()
            state.updateTypeForm.qurbaniId = ID
        new QurbaniService().updateQurbaniType(state.updateTypeForm).then((response:any)=>{
                if(response !== undefined && response.data !== undefined){
                    getQurbaniView();
                    state.updateAnimalType = false;
                     state.updateTypeForm.type= "";
                    state.updateTypeForm.base_price= "";
                    state.updateTypeForm.price= "";
                }
            }).catch((error)=>{
                console.log("error",error)
            });
    }
};
        const reset=()=>{
                        state.animalTypeForm.type= "";
                        state.animalTypeForm.base_price= "";
                        state.animalTypeForm.price= "";
            V1$.value.$reset();
        }
        function iconID(url:any){
          state.qurbaniimageform.url = url
          state.addQurbaniImage = true;
      }
        function selectImage(){
          state.imageModel = true;
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
      function addQurbaniType(){
          state.animalType = true;
      }
      function closeQurbaniType(){
          state.animalType = false;
      }
      function updateQurbaniTypes(id:string){
          state.updateAnimalType = true;
          console.log("up id",id)
          getQurbaniTypeView(id)
          state.updateTypeForm.typeID = id
      }
      function closeupdateQurbaniTypes(){
          state.updateAnimalType = false;
      }
    onMounted(()=>{
        getQurbaniView();
        ImageList();
            setTimeout(() => {
              state.isLoading = false
            }, 1000);
        })

    return {
          getQurbaniView,
          removeQurbani,
          onFileChange,
          submitImage,
          addMore,
          closeAddImage,
          V1$,
          getBackendError,
          V2$,
          getBackendError2,
          submitForm,
          ImageList,
          selectImage,
          closeIcon,
          iconID,
          closeQurbaniImage,
          V3$,
          V4$,
          getBackendError3,
          getBackendError4,
          submitImageForm,
          removeQurbaniImage,
          removeQurbaniType,
          addQurbaniType,
          closeQurbaniType,
          animalTypeSubmit,
          reset,
          updateQurbaniTypeSubmit,
          updateQurbaniTypes,
          closeupdateQurbaniTypes,
          getQurbaniTypeView,
          ...toRefs(state),
           };
  }
});
</script>