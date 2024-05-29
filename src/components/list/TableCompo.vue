<template>
   <div class="overflow-x-auto customScrollX border-b dark:border-b-0">
        <table class="w-full">
                <thead>
                    <tr class="dark:bg-black90 bg-blue10 bg-opacity-10 dark:opacity-100">
                        <slot name="header">{{ $t('message.this-is-the-default') }}  </slot>
                    </tr>
                </thead>
                <tbody>
                    <slot name="body">
                        <tr class="">
                             <td colspan="21" class="text-center py-4">{{ $t('message.no-data-found') }}</td>
                        </tr>
                    </slot>
                </tbody>
            </table>
        </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name:'TableComp',
}
)
</script>