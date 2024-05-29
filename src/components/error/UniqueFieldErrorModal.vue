<template>
    <div class="w-full px-6 bg-secondary dark:bg-black100 absolute top-0 left-0 min-h-screen z-50 bg-opacity-90 dark:bg-opacity-90 flex items-center justify-center">
        <div class="py-10 flex items-center justify-center text-black90 dark:text-white w-full">
            <div class="w-full sm:w-8/12 md:w-1/2 xl:w-5/12 bg-white dark:bg-black80 border border-black10 dark:border-black80 rounded-md mx-auto relative">
                <div class="bg-black30 dark:bg-black90 py-4 2xl:py-5 px-5 2xl:px-7 border-b dark:border-black30 rounded-t-md">
                    <p class=" font-medium text-xl capitalize">{{errorTitle?errorTitle:'Error'}}</p>
                    <button @click="ModalClose" type="button" class="absolute -top-5 -right-5 bg-kakaPrimary p-1.5 h-10 w-10 rounded-full flex items-center justify-center">
                        <img src="@/assets/images/crossicon.svg" alt="">
                    </button>
                </div>
                <div class="p-5 2xl:p-7 max-height customScrollY">
                    <div class="text-lg text-warning capitalize">
                        {{errorMessage?errorMessage:'An error has occurred while processing your request'}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">

import { computed, defineComponent, reactive, toRefs} from 'vue'
import store from '../../store';
import { useErrorHandler } from '../../views/composable/handleError';

export default defineComponent({
    name:'UnauthorizedModal',
    setup(){
        
        const { logOut} = useErrorHandler();
        const state:any = reactive({
            storestate : computed(()=>store.state),
            errorMessage : computed(()=>state.storestate.common.error.message),
            errorTitle : computed(()=>state.storestate.common.error.title),
        })
            // const uniqueError = computed(()=>state.storestate.common.error);
        const ModalClose=()=>{
                store.dispatch('setUniqueErrorStatus', false);
            }
        return {
            ...toRefs(state) ,ModalClose,
        }
    }
}
)
</script>



<style scoped>
.max-height{
    max-height: 550px;
    overflow-y: auto;
}
</style>