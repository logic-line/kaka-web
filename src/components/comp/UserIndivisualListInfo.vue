<template>
    <div class="flex items-center flex-wrap -mx-4 mb-10 md:mb-0">
        <div class="2xl:w-1/3 md:w-2/4 w-full px-4">
            <div class="py-8 md:flex items-center md:space-x-5">
                <img v-if="image != ''" class="w-32 h-32 rounded-full object-cover md:mx-0 mx-auto" :src="image" alt="">
                <div v-else class="flex items-center justify-center">
                    <img class="w-32 h-32 rounded-full object-cover inline-block dark:hidden" src="@/assets/images/profile-icon-light.svg" alt="img">
                    <img class="w-32 h-32 rounded-full object-cover hidden dark:inline-block" src="@/assets/images/profile-icon-dark.svg" alt="img">
                </div>
                <div class="">
                    <p class="mb-0.5 text-2xl text-black90 dark:text-white font-semibold text-center md:text-left">{{name}}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-300 text-center md:text-left">{{address}}</p>
                </div>
            </div>
        </div>
        <div class="2xl:w-1/3 md:w-1/4 w-1/2 px-4">
            <div class="text-center md:text-left">
                <p class="text-lg font-medium mb-0.5 text-black90 dark:text-white capitalize">{{t('message.email') }}</p>
                <p class="text-gray-600 text-sm dark:text-gray-300">{{email}}</p>
            </div>
        </div>
        <div class="2xl:w-1/3 md:w-1/4 w-1/2 px-4">
            <div class="text-center md:text-left">
                <p class="text-lg font-medium mb-0.5 text-black90 dark:text-white capitalize">{{t('message.phone-number') }}</p>
                <p class="text-gray-600 text-sm dark:text-gray-300">{{phonenumber}}</p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
   const prop = defineProps(['name','address','image','email','phonenumber'])
   const { t } = useI18n();
</script>