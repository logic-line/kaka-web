<template>
    <td class="px-3 sm:px-6 py-3">
        <div class="flex items-center justify-start space-x-3 dark:text-secondary text-black100 font-medium">
            <span :class="cls" v-html="data"></span>
        </div>
    </td>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name:'TableDataComp',
    props : ['data','cls'],
}
)
</script>