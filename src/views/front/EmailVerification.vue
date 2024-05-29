<template>
    <div v-if="isLoading" class="h-[507px] pt-2 pr-3" >
           <Loader :isLoading="isLoading" />
     </div>
</template>
<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import UserService from "@/services/user";
import { UserVerifiedRequest, IsEmailVerifiedMap } from "@/types/user";
import Loader from '../../components/comp/Loader.vue';
let userVerifiedReq: UserVerifiedRequest = {
    emailtoken: ""
}
export default defineComponent({
    components : {Loader},
    name: 'EmailVerification',
    setup() {
        const route = useRoute()
        const router = useRouter();
        const state = reactive(
            {
                userVerifiedReq: userVerifiedReq,
                isLoading:true,
            }
        );

        const verifyUserEmail = () => {
            let token = route.params.token.toString();
            state.userVerifiedReq.emailtoken = token
            new UserService().userVerified(state.userVerifiedReq).then((response: any) => {
                if (response.Data !== undefined) {
                    if (response.Data.UserVerified.IsEmailVerified == 'EMAIL_TRUE'){
                        localStorage.removeItem('vuex');
                        router.push({ path: "/signin" });
                    }else{
                        // TODO:have to imlemend resend email functionality
                    }   
                }
            }).catch((error) => {
            });

        }

        onMounted(() => {
            verifyUserEmail();
            setTimeout(() => {
              state.isLoading = false  
            }, 1000);
        })

        return {
            ...toRefs(state),

        }

    }
})
</script>