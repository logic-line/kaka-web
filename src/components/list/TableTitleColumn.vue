<template>
    <th @click="$emit('sortIconClick',name)" class="text-sm dark:text-secondary font-medium text-black100 cursor-pointer px-3 sm:px-6 py-4">
        <div class="flex items-center justify-start space-x-1.5">
            <span class="capitalize text-left">{{name}}</span>
            <div v-if="sortoption" class="flex items-center">
                <svg width="10" height="10" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 9.62545V24H8V9.62545H0L10 0L20 9.62545H12Z" fill="" :class="sortValue == 1 && header == name  ? 'dark:fill-green-400 fill-green-400' : 'dark:fill-secondary fill-black100'"/>
                </svg>
                <svg width="10" height="10" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 14.3746V0H8V14.3746H0L10 24L20 14.3746H12Z" fill="" :class="sortValue == 2 && header == name ? 'dark:fill-green-400 fill-green-400' : 'dark:fill-secondary fill-black100'"/>
                </svg>
            </div>
        </div>
    </th>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name:'TableTitleColumn',
    props: {
        name:{
           type: String,
           required: true
        },
        sortValue:{
           type: Number,
           required: false
        },
        header:{
           type: String,
        },
        sortoption:{
           type: Boolean,
           required: false
        },
        cls:{
           required: false
        }
    },
    emits:['sortIconClick'],
})
</script>