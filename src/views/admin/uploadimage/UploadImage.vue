<template>
  <div class="flex justify-center items-center px-4">
    <div class="file-upload md:w-1/2 w-full px-4 bg-gray-100 border shadow-xl">
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
            <div class="text-red-500 mr-1">{{ getBackendError('name') }}</div>
            <div v-if="V1$.saveimageform.name.$errors[0]" class="text-red-500">{{ V1$.saveimageform.name.$errors[0].$message }}</div>
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
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import axios from "axios";
import config from "../../../config";
import { SaveImageRequest } from '../../../types/imageupload';
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";


let saveimage : SaveImageRequest={
        name:'',
        url:'',
}

export default defineComponent({
  name: "upload-image",
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const state = reactive({
      isLoading: true,
      form: {
        file: null as File | null,
      },
      saveimageform: saveimage,
      errMsg: "",
      backendErrors: {} as Record<string, any>,
    });
        const createRule = {
            saveimageform:{
                name: {
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

    const file = ref<File | null>(null);
    const fileSize = ref<number | null>(null);

    const onFileChange = (event: any) => {
      const selectedFile = event.target.files[0];
      file.value = selectedFile;
      fileSize.value = selectedFile.size;
      state.form.file = selectedFile;
      const parts = selectedFile.name.split('.');
      const parts2 = parts[0];
      state.saveimageform.name = parts2
      submitImage()
    };

  const submitImage = () => {
    const formData = new FormData();
    if (state.form.file) {
      formData.append("image", state.form.file); 
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
    V1$?.value.$touch();
     if (V1$?.value.$invalid) {
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
              router.push({ path:"/admin/images/list" })
            })
            .catch((error: any) => {
              console.error("Error:", error);
        });
    }
};

    onMounted(() => {
      setTimeout(() => {
        state.isLoading = false;
      }, 1000);
    });

    return {
      ...toRefs(state),
      V1$,
      submitImage,
      submitForm,
      onFileChange,
      getBackendError,
      file,
      fileSize,
    };
  },
});
</script>
