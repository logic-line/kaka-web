<template>
    <div class="text-black90 dark:text-white relative">
        <div class="h-3 w-3 bg-secondary dark:bg-black80 absolute rotate-45 z-10 -right-36 -top-1.5 shadow-l-md"></div>
        
        <ul class="bg-secondary dark:bg-black80 absolute z-30 rounded-sm shadow-md w-40">
             <slot name="body">{{ $t('message.this-is-the-body') }}  </slot>
        </ul>
    </div>
</template>
<script lang="ts">

export default {
    name:'Profile',
    
}
</script>