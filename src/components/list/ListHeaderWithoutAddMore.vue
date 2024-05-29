<template>
    <div class="flex flex-wrap justify-between py-2">
        <p class=" text-2xl font-semibold text-black90 dark:text-white sm:mb-0 mb-2">{{title}}</p>
        <div class="flex flex-wrap sm:flex-nowrap sm:space-x-2 sm:w-auto w-full">
            <div class="relative w-full border border-gray02 py-2 px-3">
                <input class=" bg-transparent rounded-sm w-72 placeholder:text-black90 focus:outline-none" type="text" :placeholder="$t('message.searching')">
                <svg class=" absolute top-3 right-2 cu" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.75 15.25L12.3855 11.8795L15.75 15.25ZM14.25 7.375C14.25 9.06575 13.5783 10.6873 12.3828 11.8828C11.1873 13.0783 9.56575 13.75 7.875 13.75C6.18424 13.75 4.56274 13.0783 3.36719 11.8828C2.17165 10.6873 1.5 9.06575 1.5 7.375C1.5 5.68424 2.17165 4.06274 3.36719 2.86719C4.56274 1.67165 6.18424 1 7.875 1C9.56575 1 11.1873 1.67165 12.3828 2.86719C13.5783 4.06274 14.25 5.68424 14.25 7.375V7.375Z" stroke="#656575" stroke-width="1.80206" stroke-linecap="round"/>
                </svg>
            </div>

            <div @click="$emit('filter')" class="bg-kakaPrimary pt-2 px-2 rounded cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name:'ListHeader',
    props:['title'],
    emits:['filter']
})
</script>