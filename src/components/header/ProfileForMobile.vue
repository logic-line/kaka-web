<template>
    <div class="text-black90 dark:text-white relative">
        <div>
            <div class="p-4  bg-secondary dark:bg-black80">
                <div class="flex items-center justify-between mt-6 mb-2">
                    <div class="flex text-sm">
                        <img src="@/assets/images/dimondiconlight.svg" alt="">
                        <p class="pl-2 text-primary">{{ $t('message.regular-user') }}</p>
                    </div>
                    <div class="flex bg-kakaPrimary rounded-l-full text-xs px-2 py-1 -mr-4">
                        <img src="@/assets/images/dimondicon.svg" alt="">
                        <p class="pl-1.5 text-black">{{ $t('message.unverified') }}</p>
                    </div>
                </div>
            </div>
            <profile-options></profile-options>
        </div>
    </div> 
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, } from 'vue'
import ProfileOptions from './ProfileOptions.vue';


export default defineComponent({
  components: { ProfileOptions },
    name:'Profile',

    setup(){
    }
})
</script>