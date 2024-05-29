<template>
    <div>
        <div v-for="data in tableData" :key="data.ID" class="w-full rounded border mb-6 p-6">
            <div class="mb-4">
                <h2 class="text-xl font-bold">{{ data.Title }}</h2>
                <span class="text-xs text-gray-500 dark:text-white">{{ data.CreatedAt.split("T")[0] }} {{ data.CreatedAt.split("T")[1].split(".")[0] }}</span>
            </div>
            <p class="text-gray-700 text-base dark:text-white dark:border-gray02     border-l-8 p-4 mb-4 bg-gray-50 dark:bg-black90">{{ data.Content }}</p>
            <div class="flex items-center">
                <p>{{ $t('message.importance') }}:</p>
                <p v-if="data.Importance=='HIGH'" class="ml-1 bg-red-100 px-2 rounded dark:text-black">{{ $t('message.high') }}</p>
                <p v-if="data.Importance=='MEDIUM'" class="ml-1 bg-yellow-100 px-2 rounded dark:text-black">{{ $t('message.medium') }}</p>
                <p v-if="data.Importance=='LOW'" class="ml-1 bg-green-100 px-2 rounded dark:text-black">{{ $t('message.low') }}</p>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name:'PublicAnnouncementComp',
    props : ['tableData'],
}
)
</script>