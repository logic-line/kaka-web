<template>
    <div>
        <div v-if="isLoading" class="h-[507px] pt-2 pr-3" >
           <Loader :isLoading="isLoading" />
         </div>
        <publicBreadcrumb class="" :content="$t('message.about-us')"></publicBreadcrumb>
        <div class="custom-max-width pt-16">
            <p class="text-center">OUR VISION</p>
            <p class="text-center text-2xl xl:w-9/12 w-full mx-auto mt-5">Cryptocurrency in Every Wallet <br> ™</p>
            <img class="object-cover object-center w-96 mx-auto py-20" src="http://127.0.0.1:3000/img/Logo-dark.d3f40c76.png" alt="">
            <p class="text-center">OUR MISSION</p>
            <p class="text-center text-2xl xl:w-9/12 mx-auto my-5">Accelerate the world’s transition to cryptocurrency</p>
            <p class="text-center">WHY IT MATTERS</p>
            <p class="text-center text-2xl xl:w-9/12 w-full mx-auto mt-5">Powered by cryptocurrency, the future of the internet: Web3 will be more fair and equitable, owned by the builders, creators and users. You.</p>
        </div>
        <footerVue></footerVue>
    </div>
</template>

<script setup lang="ts">
    import footerVue from './component/footer.vue';
    import publicBreadcrumb from '../front/component/publicPageBreadcrumb.vue';
    import Loader from '../../components/comp/Loader.vue';
    import { onMounted, ref } from 'vue';
    const isLoading = ref(true)
    onMounted(()=>{
        setTimeout(() => {
            isLoading.value = false  
        }, 1000);
    })
</script>