<template>
    <div class="w-full px-6 bg-secondary dark:bg-black100 absolute top-0 left-0 min-h-screen z-50 bg-opacity-90 dark:bg-opacity-90">
            <div class="filter-modal bg-white dark:bg-black80 border border-black10 dark:border-black80 rounded-md mx-auto relative">
                <div class="flex justify-between items-center bg-black30 dark:bg-black90 py-4 2xl:py-5 px-5 2xl:px-7 border-b dark:border-black30 rounded-t-md">
                    <p class=" font-medium text-xl">{{filterTitle}}</p>
                    <button @click="$emit('closeFilter')" type="button" class="p-1.5 h-10 w-10 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="p-5 2xl:p-7">
                    <slot name="body"> {{ $t('message.this-is-the-default') }} </slot>
                    <div class="w-full flex flex-wrap mt-5">
                        <div class="w-full pl-0 md:w-1/2 md:pr-2 mt-2">
                            <button @click="$emit('resetFilter')" class="w-full rounded py-2 text-white bg-warning hover:bg-red-600" type="button">{{ $t('message.reset') }}</button>
                        </div>
                        <div class="w-full pr-0 md:w-1/2 md:pl-2 mt-2">
                            <button @click="$emit('submitFilter')" class="w-full rounded text-black100 py-2 bg-kakaPrimary hover:bg-yelloMolestiae labore conMolestiae labore conw-600" type="submit">{{ $t('message.filter') }}</button>     
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>
<script lang="ts">

import { defineComponent } from 'vue'
export default defineComponent({
    name:'FilterModal',
    props : ['filterTitle'],
    emits:['closeFilter','resetFilter','submitFilter']
}
)
</script>
<style scoped>
.filter-modal{
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  overflow-y: auto;
  width: 320px !important;
}
</style>