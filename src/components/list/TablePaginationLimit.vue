<template>
    <div class="flex flex-wrap items-center mt-6">
        <div class="md:w-1/2 w-full px-4">
            <p class=" text-black-50 font-16 text-center md:text-left">Showing {{ rowPerPage }} Entries Of Total {{ limit }}</p>
        </div>
        <div class="md:w-1/2 w-full px-4 mt-5 md:mt-0 justify-end">
            <ul class="flex items-center md:justify-end justify-center space-x-4">
                <li @click="prev" class="flex items-center pr-2" :class="start_index == 1 ?'pointer-events-none':'cursor-pointer group'" >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="fill-black90 dark:fill-white group-hover:fill-primary" d="M4.36713 4.85714C4.36713 4.78571 4.40284 4.70536 4.45641 4.65179L8.61713 0.491071C8.6707 0.4375 8.75105 0.401785 8.82248 0.401785C8.89391 0.401785 8.97427 0.4375 9.02784 0.491071L9.47427 0.9375C9.52784 0.991071 9.56355 1.07143 9.56355 1.14286C9.56355 1.21428 9.52784 1.29464 9.47427 1.34821L5.96534 4.85714L9.47427 8.36607C9.52784 8.41964 9.56355 8.5 9.56355 8.57143C9.56355 8.64286 9.52784 8.72321 9.47427 8.77679L9.02784 9.22321C8.97427 9.27679 8.89391 9.3125 8.82248 9.3125C8.75105 9.3125 8.6707 9.27679 8.61713 9.22321L4.45641 5.0625C4.40284 5.00893 4.36713 4.92857 4.36713 4.85714ZM0.938554 4.85714C0.938554 4.78571 0.974268 4.70536 1.02784 4.65179L5.18855 0.491071C5.24213 0.4375 5.32248 0.401785 5.39391 0.401785C5.46534 0.401785 5.5457 0.4375 5.59927 0.491071L6.0457 0.9375C6.09927 0.991071 6.13498 1.07143 6.13498 1.14286C6.13498 1.21428 6.09927 1.29464 6.0457 1.34821L2.53677 4.85714L6.0457 8.36607C6.09927 8.41964 6.13498 8.5 6.13498 8.57143C6.13498 8.64286 6.09927 8.72321 6.0457 8.77679L5.59927 9.22321C5.5457 9.27679 5.46534 9.3125 5.39391 9.3125C5.32248 9.3125 5.24213 9.27679 5.18855 9.22321L1.02784 5.0625C0.974268 5.00893 0.938554 4.92857 0.938554 4.85714Z" fill="#1E2329"/>
                    </svg>
                    <span class="pl-2 group-hover:text-primary">Prev</span>
                </li>
               <div v-for="page in totalPage" :key="page">
                    <li>
                        <button @click="pageButton(page)" :class="page == start_index ? 'font-14 w-9 h-9 bg-kakaPrimary text-white rounded-sm duration-300 flex items-center justify-center'
                        :'w-9 h-9 bg-black90 text-white rounded-sm duration-300 flex items-center justify-center text-black-80'" href="javascript:;">
                            <p>{{ page }}</p>
                        </button>
                    </li>
                </div>
                <li @click="next" class="flex items-center pl-2" :class=" start_index == totalPage ? 'pointer-events-none':'cursor-pointer group'" >
                    <span class="pr-2 group-hover:text-primary">Next</span>
                    <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="cursor-pointer fill-black90 dark:fill-white group-hover:fill-primary" d="M5.30475 4.85714C5.30475 4.78571 5.26904 4.70536 5.21546 4.65179L1.05475 0.491071C1.00118 0.4375 0.920821 0.401785 0.849392 0.401785C0.777964 0.401785 0.697607 0.4375 0.644035 0.491071L0.197607 0.9375C0.144035 0.991071 0.108321 1.07143 0.108321 1.14286C0.108321 1.21428 0.144035 1.29464 0.197607 1.34821L3.70654 4.85714L0.197607 8.36607C0.144035 8.41964 0.108321 8.5 0.108321 8.57143C0.108321 8.64286 0.144035 8.72321 0.197607 8.77679L0.644035 9.22321C0.697607 9.27679 0.777964 9.3125 0.849392 9.3125C0.920821 9.3125 1.00118 9.27679 1.05475 9.22321L5.21546 5.0625C5.26904 5.00893 5.30475 4.92857 5.30475 4.85714ZM8.73332 4.85714C8.73332 4.78571 8.69761 4.70536 8.64404 4.65179L4.48332 0.491071C4.42975 0.4375 4.34939 0.401785 4.27796 0.401785C4.20654 0.401785 4.12618 0.4375 4.07261 0.491071L3.62618 0.9375C3.57261 0.991071 3.53689 1.07143 3.53689 1.14286C3.53689 1.21428 3.57261 1.29464 3.62618 1.34821L7.13511 4.85714L3.62618 8.36607C3.57261 8.41964 3.53689 8.5 3.53689 8.57143C3.53689 8.64286 3.57261 8.72321 3.62618 8.77679L4.07261 9.22321C4.12618 9.27679 4.20654 9.3125 4.27796 9.3125C4.34939 9.3125 4.42975 9.27679 4.48332 9.22321L8.64404 5.0625C8.69761 5.00893 8.73332 4.92857 8.73332 4.85714Z" fill="#1E2329"/>
                    </svg>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onUpdated, ref } from 'vue'
export default defineComponent({
    name:"TablePagginationLimit",
    props : ['totalPage','limit',"rowPerPage"],
    components: {},
    setup(props, { emit }){
        const start_index = ref(1);
        const paggination_button_value = ref(1);
        const next=()=>{
                start_index.value = start_index.value+1;

                emit('nextEvent', start_index.value)
            };
        const prev=()=>{
            if(start_index.value > 0) start_index.value = start_index.value -1;

            emit('prevEvent', start_index.value)
        };
        const pageButton = (page:number) =>{
            start_index.value = page;

            emit('pageButtonValue', start_index.value)
        }
        onUpdated(()=>{
        })
        return{
            next,
            prev,
            pageButton,
            paggination_button_value,
            start_index,
        };
    },

})
</script>