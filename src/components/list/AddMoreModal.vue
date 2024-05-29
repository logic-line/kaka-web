<template>
    <div class="w-full px-6 bg-secondary dark:bg-black100 absolute top-0 left-0 min-h-screen z-50 bg-opacity-90 dark:bg-opacity-90 flex items-center justify-center">
        <div class="py-10 flex items-center justify-center text-black90 dark:text-white w-full">
            <div class="w-full sm:w-8/12 md:w-1/2 xl:w-5/12 bg-white dark:bg-black80 border border-black10 dark:border-black80 rounded-md mx-auto relative">
                <div class="bg-black30 dark:bg-black90 py-4 2xl:py-5 px-5 2xl:px-7 border-b dark:border-black30 rounded-t-md">
                    <p class=" font-medium text-xl">{{title}}</p>
                    <button @click="$emit('closemodal')" type="button" class="absolute -top-5 -right-5 bg-kakaPrimary text-black100 dark:text-black100 p-1.5 h-10 w-10 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="p-5 2xl:p-7 max-height customScrollY">
                    <slot name="body"> {{ $t('message.this-is-the-default') }} </slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">

import { defineComponent } from 'vue'
export default defineComponent({
    name:'AddMoreModal',
    props : ['title'],
    emits:['closemodal']
}
)
</script>
<style scoped>
.max-height{
    max-height: 550px;
    overflow-y: auto;
}
</style>