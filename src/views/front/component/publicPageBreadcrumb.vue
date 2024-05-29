<template>
    <div>
        <div class="flex justify-center bg-gray-100 dark:bg-gray-600 py-5">
            <p class="text-center uppercase text-3xl font-medium inline-block text-black80 dark:text-white relative">{{content}}</p>
         </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps(['content'])
</script>