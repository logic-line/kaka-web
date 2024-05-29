<template>
    <div class="min-h-[calc(100vh-204px)] flex items-center error-page">
        <div class="w-full text-center">
            <h1 class="2xl:text-9xl xl:text-8xl lg:text-7xl text-6xl text-black100 dark:text-white">501</h1>
            <p class="2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl mt-4 text-black90 dark:text-white">{{ $t('message.user-unauthorized') }}</p>
            <router-link to="/login" class="capitalize hover:text-white duration-300 rounded-sm bg-kakaPrimary px-10 py-2.5 text-black100 inline-block mt-8">{{ $t('message.login') }}</router-link>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'

export default defineComponent({
    name: '501',
   
    setup(){}
})
</script>