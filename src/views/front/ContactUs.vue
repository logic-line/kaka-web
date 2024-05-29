<template>
    <div>
        <div v-if="isLoading" class="h-[507px] pt-2 pr-3" >
           <Loader :isLoading="isLoading" />
         </div>
        <publicBreadcrumb class="" :content="$t('message.contact-us')"></publicBreadcrumb>
        <div class="custom-max-width">
            <div class="row my-20">
                <div class="sm:w-1/2 w-full px-4">
                    <div>
                        <ul>
                            <li class="">
                                <input type="email" class="outline-none bg-white dark:bg-black border border-black90 py-2.5 text-black dark:text-white px-4 w-full rounded-sm" :placeholder="$t('message.email-address')+'*'">
                            </li>
                            <li class="mt-5">
                                <input type="email" class="outline-none bg-white dark:bg-black border border-black90 py-2.5 text-black dark:text-white px-4 w-full rounded-sm" :placeholder="$t('message.subject')+'*'">
                            </li>
                            <li class="mt-5">
                                <textarea name="" id="" cols="30" rows="5" class="outline-none bg-white dark:bg-black border border-black90 py-2.5 text-black dark:text-white px-4 w-full rounded-sm" :placeholder="$t('message.additional-details')+'*'"></textarea>
                            </li>
                            <li class="mt-5">
                                <button class="cursor-pointer font-medium hover:text-white bg-kakaPrimary w-full py-2.5 rounded-sm hover:bg-black90 text-black100 duration-300">{{ $t('message.submit') }}</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="sm:w-1/2 w-full px-4 mt-10 sm:mt-0">
                    <div class="bg-gray-100 dark:bg-black p-6 h-full">
                        <div>
                            <h2 class="text-2xl text-center">{{ about }}</h2>
                            <div class="mt-3">
                                <p class="text-lg font-medium text-black100 dark:text-secondary capitalize">{{ $t('message.email') }}</p>
                                <p class="text-black100 dark:text-secondary">{{ email }}</p>
                            </div>
                            <div class="mt-3">
                                <p class="text-lg font-medium text-black100 dark:text-secondary capitalize">{{ $t('message.phone-number') }}</p>
                                <p class="text-black100 dark:text-secondary">{{ phonenumber }}</p>
                            </div>
                            <div class="mt-3">
                                <p class="text-lg font-medium text-black100 dark:text-secondary capitalize">{{ $t('message.address') }}</p>
                                <p class="text-black100 dark:text-secondary">{{ address }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import publicBreadcrumb from '../front/component/publicPageBreadcrumb.vue';
    import { AllowedSettingData, GetSetting } from "../../utils/settings-utils"
    import { onMounted, ref } from 'vue';
    import Loader from '../../components/comp/Loader.vue';
    const email = ref('')
    const phonenumber = ref('')
    const address = ref('')
    const about = ref('')
    const isLoading = ref(true)

    async function getIsRefferelTrue() {
        let Email = await GetSetting(AllowedSettingData.Email.Slug, AllowedSettingData.Email.SettingsGroup)
            email.value = Email
        let About = await GetSetting(AllowedSettingData.About.Slug, AllowedSettingData.About.SettingsGroup)
            about.value = About
        let phoneNumber = await GetSetting(AllowedSettingData.PhoneNumber.Slug, AllowedSettingData.PhoneNumber.SettingsGroup)
            phonenumber.value = phoneNumber
        let Address = await GetSetting(AllowedSettingData.Address.Slug, AllowedSettingData.Address.SettingsGroup)
            address.value = Address
            
    }
    
    
    onMounted(()=>{
        getIsRefferelTrue()
         setTimeout(() => {
              isLoading.value = false  
            }, 1000);
    })

</script>