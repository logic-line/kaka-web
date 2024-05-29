<template>
   <div class="bg-white dark:bg-black">
    <div v-if="isLoading" class="h-[507px] pt-2 pr-3" >
       <Loader :isLoading="isLoading" />
     </div>
        <!-- body start -->
            <main>
                <div class="flex items-center min-h-screen-content">
                    <div class="2xl:w-1/3 lg:w-2/4 md:w-3/5 mx-auto px-6">
                        <div class="text-center">
                            <h1 class="text-4xl text-black100 dark:text-white font-medium">{{ $t('message.set-password') }}</h1>
                            <p class="text-base text-black90 dark:text-secondary w-full px-4 mx-auto capitalize my-3">{{ $t('message.we-will-provide-a') }}</p>
                            <div class="w-8 h-1 bg-kakaPrimary mx-auto mt-2"></div>
                        </div>
                             <div class="w-full px-4 mt-3">
                                <div>
                                    <label class="block mb-1 text-black100 dark:text-white" for="password">{{ $t('message.password') }}</label>
                                    <div class="relative">
                                        <input v-model="setPasswordForm.password" name="Password" type="password" id="password" :placeholder="$t('message.password')"  class="outline-none bg-white dark:bg-black border border-black90 py-2.5 text-black dark:text-white px-4 w-full rounded-sm ab">
                                        <button v-if="passwordData.newPassNotEye" @click="showPass($event.target)" class="see-pass absolute top-1/2 right-3 transform -translate-y-1/2" type="button">
                                            <svg class="w-5 h-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                            </svg>
                                        </button>
                                        <button v-if="passwordData.newPassEye" @click="hidepass($event.target)" class="hide-pass absolute right-3 top-1/2 transform -translate-y-1/2" type="button">
                                            <svg class="w-5 h-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>                                                                
                                        </button>
                                    </div>
                                    <div v-if="V1$.setPasswordForm.password.$errors[0]" class="text-warning block mt-1">{{ V1$.setPasswordForm.password.$errors[0].$message }}</div>
                                    <div class="text-red-500 mr-1">{{ getBackendError('Password') }}</div>
                                </div>
                             </div>
                            <div class="w-full px-4 mt-3">
                                <div class="relative">
                                    <label class="block mb-1 text-black100 dark:text-white" for="confirmpassword">{{ $t('message.confirm-password') }}</label>
                                    <div class="relative">
                                    <input v-model="setPasswordForm.confirmpassword" name="ConformPassword" id="confirmpassword" type="password" :placeholder="$t('message.confirm-password')"  class="outline-none bg-white dark:bg-black border border-black90 py-2.5 text-black dark:text-white px-4 w-full rounded-sm">
                                            <button v-if="passwordData.confirmPassNotEye" @click="showPass($event.target)" class="see-pass absolute right-3 top-1/2 transform -translate-y-1/2" type="button">
                                                <svg class="w-5 h-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                </svg>
                                            </button>
                                            <button v-if="passwordData.confirmPassEye" @click="hidepass($event.target)" class="hide-pass absolute right-3 top-1/2 transform -translate-y-1/2" type="button">
                                                <svg class="w-5 h-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>                                                                
                                            </button>
                                        </div>
                                    <div v-if="V1$.setPasswordForm.confirmpassword.$errors[0]" class="text-warning block mt-1">{{ V1$.setPasswordForm.confirmpassword.$errors[0].$message }}</div>
                                    <div class="text-red-500 mr-1">{{ getBackendError('ConfirmPassword') }}</div>
                                </div>
                             </div>
                        <div class="px-4 mt-7">
                            <button @click="setPassword" class="font-medium bg-kakaPrimary w-full py-2.5 rounded-sm hover:bg-black90 hover:text-white duration-300">{{ $t('message.set-password') }}</button>
                        </div>
                    </div>
                </div>
            </main>
            <add-modal v-if="isModalOpen" @closemodal="toggleModal" title="Set Password">
            <template v-slot:body>
                <div class="space-y-6 dark:text-black30">
                    <p class=" text-xl text-green-500">{{ $t('message.congratulation') }}!!!!</p>
                    <p>{{ $t('message.password-set-success') }}.</p>
                    <p class="text-black100 dark:text-white">{{ $t('message.click-here-to') }} <a href="/signin" class="text-primary">{{ $t('message.sign-in') }}</a></p>
                </div>
            </template>
        </add-modal>
        <!-- body end -->
   </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, Ref, onMounted, toRefs, onUnmounted } from 'vue'

import UserService from "../../../services/user";
import footerVue from '../../front/component/footer.vue';
import AddModal from '../../../components/list/AddMoreModal.vue';
import { SetPasswordType } from '../../../types/user';
import { useVuelidate } from '@vuelidate/core'
import { email, helpers, maxLength, minLength, required } from '@vuelidate/validators'
import {useRoute, useRouter } from 'vue-router';
import Loader from '../../../components/comp/Loader.vue';
import { useI18n } from 'vue-i18n';
let setPasswordForm: SetPasswordType = {
    token: "",
    password: "",
    confirmpassword: "",

}
export default defineComponent({
    name : 'SetPassword',
    components : {
        footerVue,AddModal,Loader
    },

    setup(){
        const { t } = useI18n();
        const route = useRoute()
        const router = useRouter();
        const state = reactive({
            isLoading:true,
            setPasswordForm:setPasswordForm,
            backendErrors: <any>{},
             isModalOpen: false,
             passwordData: {
                    newPassEye: false,
                    newPassNotEye: true,
                    confirmPassEye: false,
                    confirmPassNotEye: true,
                },

        });
        const isanyDigit = (value:string)=>{
            return value.match(/\d/) !== null
        }
        const isanyUppercase = (value:string)=>{
            return value.match(/[A-Z]/) !== null
        }
        const isanyLowercase = (value:string)=>{
            return value.match(/[a-z]/) !== null
        }
        const isanySpecialCharacter = (value:string)=>{
            return value.match(/[^a-zA-Z\d\s]/) !== null
        }
        const comparePassword = (value:string)=>{
            return value === state.setPasswordForm.password
        }

        const setPasswordRules = {
            setPasswordForm: {
                 password: {
                    required1: helpers.withMessage(`${t('message.password-digit')}`, isanyDigit),
                    required2: helpers.withMessage(`${t('message.password-uppercase')}`, isanyUppercase),
                    required3: helpers.withMessage(`${t('message.password-lowercase')}`, isanyLowercase),
                    required4: helpers.withMessage(`${t('message.password-special-character')}`, isanySpecialCharacter),
                    required5: helpers.withMessage(`${t('message.password-length')}`, minLength(6)),
                },
                confirmpassword: {
                    required1: helpers.withMessage(`${t('message.password-is-required')}`, required),
                    required2: helpers.withMessage(`${t('message.password-compare')}`, comparePassword),
                },
            },
        }
        const V1$ = useVuelidate(setPasswordRules, state);
        const setPassword=()=>{
            
            state.setPasswordForm.token = route.params.token.toString()
            
            V1$?.value.$touch();
            if (V1$?.value.$invalid) {
                return 
            }
            else {
                new UserService().SetPassword(setPasswordForm).then((response:any)=>{
                if(response !== undefined && response.Data!==undefined){
                    V1$.value.$reset();
                    state.isModalOpen = true
                    state.setPasswordForm.token = ""
                    state.setPasswordForm.password = ""
                    state.setPasswordForm.confirmpassword = ""
                }
            }).catch((error) => {
                    state.backendErrors = JSON.parse(error);
                });
            }
        }
         const toggleModal = () => {
            state.isModalOpen = !state.isModalOpen;
            
        };
        const getBackendError = (item: any) => {
                    for (const key in state.backendErrors) {
                        if (item == key) {
                            return state.backendErrors[key];
                        }
                    }
                }
        const  showPass = (e:any) =>{  
            if(e.parentElement.children[0].name =='Password'){
                e.parentElement.children[0].type = 'text'
                state.passwordData.newPassEye = true
                state.passwordData.newPassNotEye = false
            }
            if(e.parentElement.children[0].name =='ConformPassword'){
                e.parentElement.children[0].type = 'text'
                state.passwordData.confirmPassEye = true
                state.passwordData.confirmPassNotEye = false
            }
        }
        const  hidepass = (e:any) =>{          
            if(e.parentElement.children[0].name =='Password'){
                e.parentElement.children[0].type = 'password'
                state.passwordData.newPassEye = false
                state.passwordData.newPassNotEye = true
            }
            if(e.parentElement.children[0].name =='ConformPassword'){
                e.parentElement.children[0].type = 'password'
                state.passwordData.confirmPassEye = false
                state.passwordData.confirmPassNotEye = true
            }
            
        }

        onMounted(() => {
             setTimeout(() => {
              state.isLoading = false  
            }, 1000);
        })
        return {
            ...toRefs(state),getBackendError, V1$,setPassword,toggleModal,showPass,hidepass
        }
    }
})
</script>
