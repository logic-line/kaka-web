<template>
    <div class="min-h-[calc(100vh-135px)] flex items-center error-page">
        <!-- <div class="w-full text-center">
            <img class="mx-auto w-36 h-36" src="../../../src/assets/images/correct.png" alt="">
            <h1 class="text-5xl text-black100 dark:text-white my-5">Your Account Is Verified</h1>
            <p class="capitalize xl:w-3/12 sm:w-5/12 mx-auto px-4">Your Email is Now a confirmed account. Thanks for helping us to keep your vivid seats account secure</p>
        </div> -->
        <div class="w-full text-center">
            <img class="mx-auto w-36 h-36" src="../../../src/assets/images/delete-button.png" alt="">
            <h1 class="text-5xl text-black100 dark:text-white my-5">Verification Faild</h1>
            <p class="capitalize xl:w-3/12 sm:w-5/12 mx-auto px-4">Please View Your Ticket To Genarate New Verification email</p>
            <!-- <router-link to="/home" class="capitalize hover:text-white duration-300 rounded-sm bg-kakaPrimary px-10 py-2.5 text-black100 inline-block mt-8">{{ $t('message.back-home') }}</router-link> -->
        </div>
        <div v-if="isLoading" class="h-[507px] pt-2 pr-3" >
           <Loader :isLoading="isLoading" />
         </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, reactive,onMounted } from 'vue'
import Loader from '../../components/comp/Loader.vue';
export default defineComponent({
    components : {Loader},
    name: 'verfication',
   
    setup(){
        const state = reactive({
            isLoading:true,
        })

        onMounted(()=>{
            setTimeout(() => {
              state.isLoading = false  
            }, 1000);
        })
    }
})
</script>