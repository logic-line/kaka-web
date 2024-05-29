<template>
    <div class="overflow-hidden px-6 py-4">
        <div v-if="isLoading" class="h-[507px] pt-2 pr-3" >
          <Loader :isLoading="isLoading" />
        </div>
        <PageHeader  
        :title="$t('message.invite-user')">
            <template v-slot:body>
                <router-link to="/admin/users" class="flex items-center justify-center bg-kakaPrimary text-black100 dark:text-black100 py-2.5 px-8 w-full rounded-sm bor">
                    {{ $t('message.back-to-list') }}
                </router-link>
            </template>
        </PageHeader>
        <div class="p-4 shadow-md bg-gray-50 dark:bg-secondary10 dark:text-white">
            <form @submit.prevent="inviteusersubmit">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="w-full">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="firstName">{{ $t('message.first-name') }}</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <input v-model="form.firstname" name="firstname" class="modal-input-style" :placeholder="$t('message.first-name')">
                        <div class="text-red-500 mr-1">{{ getBackendError('FirstName') }}</div>
                        <div v-if="V1$.form.firstname.$errors[0]" class="text-red-500">{{ V1$.form.firstname.$errors[0].$message }}</div>
                    </div>
                    <div class="w-full">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="lastname">{{ $t('message.last-name') }}</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <input v-model="form.lastname" name="lastname" class="modal-input-style" :placeholder="$t('message.last-name')">
                        <div v-if="V1$.form.lastname.$errors[0]" class="text-red-500">{{ V1$.form.lastname.$errors[0].$message }}</div>
                        <div class="text-red-500 mr-1">{{ getBackendError('LastName') }}</div>
                    </div>
                    <div class="w-full">
                        <div class="flex items-center mb-2">
                            <label class="block">{{ $t('message.role') }}</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <select v-model="form.roleid" name="roleid" class="modal-select-style dark:bg-black90">
                            <option value="" disabled class="dark:bg-black90">{{ $t('message.select') }}</option>
                            <option v-for="item in roleList" :key="item.ID" :value="item.ID" class="dark:bg-black90">
                                {{ item.Name }}
                            </option>
                        </select>
                        <div v-if="V1$.form.roleid.$errors[0]" class="text-red-500">{{ V1$.form.roleid.$errors[0].$message }}</div>
                        <div class="text-red-500 mr-1">{{ getBackendError('RoleID') }}</div>
                    </div>
                    
                    <div class="w-full">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="email">{{ $t('message.email') }}</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <input v-model="form.email" name="email" class="modal-input-style" :placeholder="$t('message.email')">
                        <div v-if="V1$.form.email.$errors[0]" class="text-red-500">{{ V1$.form.email.$errors[0].$message }}</div>
                        <div class="text-red-500 mr-1">{{ getBackendError('Email') }}</div>
                    </div>
                    <div>
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="email">{{ $t('message.address') }}</label>
                        </div>
                        <textarea v-model="form.address" class="modal-input-style" id="address" name="address" rows="4" cols="50">
                        </textarea> 
                    </div>
                    <div class="w-full">
                        <div class="flex items-center mb-2">
                            <label class="block capitalize" for="email">{{ $t('message.phone-number') }}</label>
                            <img src="@/assets/images/star.svg" alt="image" class="w-2.5 ml-1">
                        </div>
                        <input @input="validatePhoneNumber" v-model="form.phonenumber" name="phonenumber" class="modal-input-style" :placeholder="$t('message.phone-number')">
                        <div v-if="V1$.form.phonenumber.$errors[0]" class="text-red-500">{{ V1$.form.phonenumber.$errors[0].$message }}</div>
                        <div class="text-red-500 mr-1">{{ getBackendError('PhoneNumber') }}</div>
                    </div>
                </div>
                <div class="mt-8 w-full flex flex-wrap items-center space-x-10">
                    <div class="">
                        <button @click="reset" class="px-12 rounded-sm py-2.5 text-white bg-warning" type="reset">{{ $t('message.reset') }}</button>
                    </div>
                    <div class="">
                        <button class="px-12 rounded-sm py-2.5 bg-kakaPrimary text-black100 dark:text-black100" type="submit">{{ $t('message.submit') }}</button>     
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts">

import { defineComponent, ref, reactive, computed, Ref, onMounted, toRefs, onUnmounted } from 'vue'

import ActionModalVue from '../../../components/list/ActionModal.vue';
import PageHeader from '../../../components/list/PageHeader.vue';
import { InvitedUser } from '../../../types/user';
import UserService from "../../../services/user";
import { useVuelidate } from '@vuelidate/core'
import { email, helpers, maxLength, minLength, required } from '@vuelidate/validators'
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { alphaSpacePattern,UidValidation, validatePhoneNumber } from '../../../utils/form-validation';
import Loader from '../../../components/comp/Loader.vue';


let inviteuser: InvitedUser= {
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    roleid: "",
    referrerid: "",
    address: "",
}

export default defineComponent({
    components: {ActionModalVue, PageHeader, Loader },
    name: 'InviteUser',
    setup(){
        const { t } = useI18n();
        const router = useRouter();
        const state = reactive(
            {
                isLoading:true,
                roleList:<any>[],
                form:inviteuser,
                backendErrors:<any>{},
                phoneValidate:false,
                authModalOpen:false
            }
        );

        const createRule = {
            form:{
                roleid: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                        required2: helpers.withMessage(`${t('message.valid-id')}`, UidValidation),
                        },
                firstname: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                        required2: helpers.withMessage(`${t('message.this-length')}`, maxLength(20)),
                        required3: helpers.withMessage(`${t('message.only-text')}`, alphaSpacePattern),
                        },
                lastname: {
                        required1: helpers.withMessage(`${t('message.required')}`, required),
                        required2: helpers.withMessage(`${t('message.this-length')}`, maxLength(20)),
                        required3: helpers.withMessage(`${t('message.only-text')}`, alphaSpacePattern),
                        },
                email: {
                    required1: helpers.withMessage(`${t('message.required')}`, required),
                    required2: helpers.withMessage(`${t('message.insert-valid-email')}`, email),
                },
                phonenumber: {
                    required1: helpers.withMessage(`${t('message.required')}`, required),
                    required2: helpers.withMessage(`${t('message.insert-valid-phone-number')}`, maxLength(20)),
                    required3: helpers.withMessage(`${t('message.insert-valid-phone-number')}`, minLength(5)),
                    required4: helpers.withMessage(`${t('message.insert-valid-phone-number')}`, validatePhoneNumber),
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

        const inviteusersubmit = ()=>{
            V1$?.value.$touch();
            if (V1$?.value.$invalid) {
                return;
            } 
            else {
                new UserService().inviteUser(state.form).then((response:any)=>{
                    if(response !== undefined && response.Data!==undefined){
                        state.form.firstname="";
                        state.form.lastname="";
                        state.form.email="";
                        state.form.phonenumber="";
                        state.form.address="";
                        state.form.roleid="";
                        V1$.value.$reset();
                        localStorage.setItem('fromRoute', 'create');
                        router.push({ path:"/admin/users" })
                    }
                }).catch((error)=>{ 
                    state.backendErrors = JSON.parse(error);
                });
                
            }
        }
        const reset=()=>{
            state.form.firstname = "";
            state.form.lastname = "";
            state.form.email = "";
            state.form.phonenumber = "";
            state.form.address = "";
            state.form.roleid = "";
            V1$.value.$reset();
        }
        

       
        onMounted(()=>{
            setTimeout(() => {
              state.isLoading = false  
            }, 1000);
        })
        onUnmounted(() => {
            reset();
        });


        return {
            ...toRefs(state), V1$, inviteusersubmit, getBackendError,reset
        }
    }
  
})
</script>
