<template>
  <div class="bg-white dark:bg-black">
    <!-- body start -->
    <div v-if="isLoading" class="h-[507px] pt-2 pr-3" >
         <Loader :isLoading="isLoading" />
     </div>
    <main>
      <div class="flex items-center lg:custom-height-screen pt-10 md:pt-28  pb-6 lg:pb-0">
        <form
          @submit.prevent="loginUser"
          class="2xl:w-1/3 lg:w-2/4 md:w-3/5 mx-auto px-6"
        >
          <div class="text-center">
            <h1 class="text-4xl text-black100 dark:text-white font-medium">
              {{ $t("message.login") }}
            </h1>
            <p
              class="text-base text-black90 dark:text-secondary w-full px-4 mx-auto capitalize my-3"
            >
              {{ $t("message.we-will-provide") }}.
            </p>
          </div>
          <div v-if="errMsg" class="bg-gray-200 border py-2 text-center text-red-600 ">
             <p class="capitalize">{{errMsg}}</p>
          </div>
          <div class="mt-7 flex flex-wrap -mx-4">
            <div class="lg:w-1/2 w-full px-4 mt-3">
              <div class="">
                <label
                  class="block mb-1 text-black100 dark:text-white"
                  for="email"
                  >{{ $t("message.email") }}</label
                >
                <input
                  v-model="form.email"
                  type="email"
                  id="email"
                  placeholder="example@gmail.com"
                  class="outline-none bg-white dark:bg-black border border-black90 py-2.5 text-black dark:text-white px-4 w-full rounded-sm"
                />
                <div
                  v-if="V1$.form.email.$errors[0]"
                  class="text-warning block mt-1"
                >
                  {{ V1$.form.email.$errors[0].$message }}
                </div>
                <div class="text-red-500 mr-1">
                  {{ getBackendError("Email") }}
                </div>
              </div>
            </div>
            <div class="lg:w-1/2 w-full px-4 mt-3">
              <div>
                <label
                  class="block mb-1 text-black100 dark:text-white"
                  for="password"
                  >{{ $t("message.password") }}</label
                >
                <div class="relative">
                  <input
                    v-model="form.password"
                    name="Password"
                    type="password"
                    id="password"
                    :placeholder="$t('message.password')"
                    class="outline-none bg-white dark:bg-black border border-black90 py-2.5 text-black dark:text-white px-4 w-full rounded-sm ab"
                  />
                  <button
                    v-if="passwordData.newPassNotEye"
                    @click="showPass($event.target)"
                    class="see-pass absolute top-1/2 right-3 transform -translate-y-1/2"
                    type="button"
                  >
                    <svg
                      class="w-5 h-5 pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  </button>
                  <button
                    v-if="passwordData.newPassEye"
                    @click="hidepass($event.target)"
                    class="hide-pass absolute right-3 top-1/2 transform -translate-y-1/2"
                    type="button"
                  >
                    <svg
                      class="w-5 h-5 pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                </div>
                <div
                  v-if="V1$.form.password.$errors[0]"
                  class="text-warning block mt-1"
                >
                  {{ V1$.form.password.$errors[0].$message }}
                </div>
                <div class="text-red-500 mr-1">
                  {{ getBackendError("Password") }}
                </div>
              </div>
            </div>
          </div>
          <div class="mt-7">
            <button
              type="submit"
              class="font-medium bg-kakaPrimary w-full py-2.5 rounded-sm hover:bg-black90 text-xl text-white duration-300"
            >
              Login
            </button>
          </div>
          
        </form>
      </div>
    </main>
    <add-modal
      v-if="isModalOpen"
      @closemodal="toggleModal"
      title="Registration"
    >
      <template v-slot:body>
        <div class="space-y-6 dark:text-black30">
          <p class="text-xl text-green-500">
            {{ $t("message.congratulation") }}!!!!
          </p>
          <p>{{ $t("message.registration-sucess-1") }}.</p>
          <p>
            <router-link
              to="/resend-email"
              class="font-bold hover:text-primary"
              >{{ $t("message.click-here") }}</router-link
            >
            {{ $t("message.registration-sucess-2") }}.
          </p>
        </div>
      </template>
    </add-modal>
  </div>
</template>
<script lang="ts">
import AddModal from "../../components/list/AddMoreModal.vue";
import PageHeader from "../../components/list/PageHeader.vue";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { LoginUserRequest } from "../../types/user";
import UserService from "../../services/user";
import SettingsService from "../../services/settings";
import { useVuelidate } from "@vuelidate/core";
import { useErrorHandler } from "../../views/composable/handleError";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

import {
  email,
  helpers,
  maxLength,
  minLength,
  required,
sameAs,
} from "@vuelidate/validators";
import {
  alphaSpacePattern,
  validatePhoneNumber,
} from "@/utils/form-validation";
import VueHcaptcha from "@hcaptcha/vue3-hcaptcha";
import { GetSettingsRequest } from "../../types/settings";
import Loader from '../../components/comp/Loader.vue';
let signinForm: LoginUserRequest = {
  email: "",
  password: "",
};

export default defineComponent({
  components: { PageHeader, AddModal, VueHcaptcha,Loader },
  name: "signin",
  setup() {
    const { logOut } = useErrorHandler();
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      isLoading:true,
      form: signinForm,
      errMsg:"",
      backendErrors: <any>{},
      authModalOpen: false,
      passwordData: {
        newPassEye: false,
        newPassNotEye: true,
        confirmPassEye: false,
        confirmPassNotEye: true,
      },
      isModalOpen: false,
    });
    const toggleModal = () => {
      state.isModalOpen = !state.isModalOpen;
    };

    const createRule = {
      form: {
        email: {
          required1: helpers.withMessage(
            `${t("message.email-is-required")}`,
            required
          ),
          required2: helpers.withMessage(
            `${t("message.insert-valid-email")}`,
            email
          ),
        },
        password: {
          required6: helpers.withMessage(`${t("message.required")}`, required),
          
        },
      },
    };

    const V1$ = useVuelidate(createRule, state);
    const getBackendError = (item: any) => {
      for (const key in state.backendErrors) {
        if (item == key) {
          return state.backendErrors[key];
        }
      }
    };
    const showPass = (e: any) => {
      if (e.parentElement.children[0].name == "Password") {
        e.parentElement.children[0].type = "text";
        state.passwordData.newPassEye = true;
        state.passwordData.newPassNotEye = false;
      }
      if (e.parentElement.children[0].name == "ConformPassword") {
        e.parentElement.children[0].type = "text";
        state.passwordData.confirmPassEye = true;
        state.passwordData.confirmPassNotEye = false;
      }
    };
    const hidepass = (e: any) => {
      if (e.parentElement.children[0].name == "Password") {
        e.parentElement.children[0].type = "password";
        state.passwordData.newPassEye = false;
        state.passwordData.newPassNotEye = true;
      }
      if (e.parentElement.children[0].name == "ConformPassword") {
        e.parentElement.children[0].type = "password";
        state.passwordData.confirmPassEye = false;
        state.passwordData.confirmPassNotEye = true;
      }
    };

    const loginUser = () => {
      V1$?.value.$touch();
      if (V1$?.value.$invalid) {
        return;
      } else {
        new UserService()
          .LoginUser(state.form).then((response: any) => {
            if (response.data.error !== false){
              state.errMsg = response.data.message
            }
            if (response.data !== undefined && response.data.error == false) {
              V1$.value.$reset();
              localStorage.setItem("userEmail", state.form.email);
              state.form.email = "";
              state.form.password = "";
              localStorage.setItem('token', response.data.data.token);
              router.push({ path: "/admin/dashboard" });
            }
          })
          .catch((error:any) => {
            if (error.code == 16) {
              state.authModalOpen = true;
              setTimeout(() => {
                state.authModalOpen = false;
                logOut();
              }, 5000);
            } else {
              state.errMsg = "Something wrong error"
            }
          });
      }
    };

    onMounted(() => {
      setTimeout(() => {
              state.isLoading = false  
            }, 1000);
    });
    return {
      ...toRefs(state),
      loginUser,
      V1$,
      getBackendError,
      showPass,
      hidepass,
      toggleModal,
    };
  },
});
</script>
