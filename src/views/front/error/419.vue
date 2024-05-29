<template>
   <div class="bg-white dark:bg-black">
        <!-- body start -->
            <main>
                <div class="min-h-[calc(100vh-204px)] flex items-center">
                    <div class="w-full text-center">
                        <h1 class="2xl:text-9xl xl:text-8xl lg:text-7xl text-6xl text-black100 dark:text-white">419</h1>
                        <span class="2xl:text-5xl xl:text-4xl lg:text-3xl text-2xl mt-4 text-black90 dark:text-white capitalize">{{ $t('message.page-expaired') }}</span>
                        <p class="text-base text-black20 dark:text-secondary 2xl:w-3/12 md:w-6/12 w-full px-4 mx-auto mt-3 capitalize">{{ $t('message.we-will-provide') }}</p>
                        <a href="javascript:;" class="capitalize hover:text-white duration-300 rounded-sm bg-kakaPrimary px-10 py-2.5 text-black100 inline-block mt-8">{{ $t('message.back-home') }}</a>
                    </div>
                </div>
            </main>
        <!-- body end -->
   </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  export default defineComponent({
      name: '419error',
  
      components: {},
  
      data(){
          return {
           
          };
      },
  
      methods:{
       
      },
  
      computed:{
  
      },
  
      mounted(){
         
      }
    
  })
  </script>
  <style scoped>
    main{
        background-image: url(../../../../src/assets/images/background.png);
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
  </style>
  