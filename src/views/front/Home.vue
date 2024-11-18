<template>
  <div>
    <div v-if="isLoading" class="h-[507px] pt-2 pr-3" >
       <Loader :isLoading="isLoading" />
     </div>
    <div class="bg-kakaLight min-h-[calc(100vh-161px)] items-center">
           <div class="container mx-auto">
            <div class="flex flex-wrap px-4 py-4 w-full items-center justify-between">
             <div class="w-full md:w-1/2">
                <div class="px-4">
                  <p class="text-3xl">Your One-Stop Solution for Convenience and Quality Services</p>
                    <p class=" text-justify">
                      Discover a world of convenience and quality at our service hub. From side-singing arrangements to reliable cab services, premium products, traditional Hijama therapy, and trusted Qurbani services, we're here to meet all your needs with excellence and care. Welcome to a seamless experience tailored just for you.
                    </p>
                </div>
             </div>
             <div class="w-full md:w-1/2">
                <div class="px-4">
                  <img src="../../assets/images/kaka/kklogo.png" alt="">
                </div>
             </div>
           </div>
            <div class="px-4 py-4 w-full">
               <div class="py-2">
                  <p class=" font-bold md:text-3xl text-lg text-center">Our Service</p>
               </div>
               <div class="py-2">
                  <div class="flex flex-wrap">
                    <div class="w-full md:w-1/4 h-full">
                        <div class="px-4 py-4 h-full">
                           <div class="bg-white shadow-xl px-4 py-8 rounded-sm h-full">
                                <div class="img">
                                <span>
                                    <svg class="w-14 h-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path class="fa-secondary" opacity=".4" d="M138.6 64H277.4c6.9 0 13 4.4 15.2 10.9L310.3 128H105.7l17.7-53.1c2.2-6.5 8.3-10.9 15.2-10.9zM62.7 54.7L36.1 134.4C14.8 144.7 0 166.6 0 192v96H0v32c0 17.7 14.3 32 32 32H48c17.7 0 32-14.3 32-32V288H216.5c5.1-5.7 10.8-10.7 17.1-15.1l22.8-68.3c15.2-45.7 58-76.6 106.3-76.6h15.1L353.3 54.7C342.4 22 311.8 0 277.4 0H138.6c-34.4 0-65 22-75.9 54.7zM80 184a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/><path class="fa-primary" d="M347.4 234.9L329.7 288H534.3l-17.7-53.1c-2.2-6.5-8.3-10.9-15.2-10.9H362.6c-6.9 0-13 4.4-15.2 10.9zm-87.3 59.4l26.6-79.7C297.6 182 328.2 160 362.6 160H501.4c34.4 0 65 22 75.9 54.7l26.6 79.7C625.2 304.7 640 326.6 640 352v96h0v32c0 17.7-14.3 32-32 32H592c-17.7 0-32-14.3-32-32V448H304v32c0 17.7-14.3 32-32 32H256c-17.7 0-32-14.3-32-32V448h0V352c0-25.4 14.8-47.3 36.1-57.6zM328 368a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zm232 24a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg>
                                </span>
                                </div>
                                <p class="font-semibold text-lg capitalize">Cab Service</p>
                                <p>Enjoy peace of mind with our premium car service. From maintenance to repairs, trust us to keep you safe on the road.</p>
                            
                           </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4 h-full">
                        <div class="px-4 py-4 h-full">
                           <div class="bg-white shadow-xl px-4 py-8 rounded-sm h-full">
                                <div class="img">
                                <span>
                                    <svg class="w-14 h-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path class="fa-secondary" opacity=".4" d="M200.6 32C205 19.5 198.5 5.8 186 1.4S159.8 3.5 155.4 16L144.7 46.2l-9.9-29.8C130.6 3.8 117-3 104.4 1.2S85 19 89.2 31.6l9.4 28.3L71.2 37.4C60.9 29 45.8 30.5 37.4 40.8S30.5 66.2 40.8 74.6L67 96H221l26.2-21.4c10.3-8.4 11.8-23.5 3.4-33.8s-23.5-11.8-33.8-3.4L191.3 58.3 200.6 32zM592 224h-4.1c-9.9 28-36.6 48-67.9 48H448v80H640V272c0-26.5-21.5-48-48-48zM448 384V512H592c26.5 0 48-21.5 48-48V384H448zm-32 0H224v80c0 26.5 21.5 48 48 48H416V384zm0-32V272H400 344c-31.3 0-58-20-67.9-48H272c-26.5 0-48 21.5-48 48v80H416z"/><path class="fa-primary" d="M48 96C21.5 96 0 117.5 0 144V464c0 26.5 21.5 48 48 48H200.6c-5.4-9.4-8.6-20.3-8.6-32V256c0-29.9 20.5-55 48.2-62c1.8-31 17.1-58.2 40.1-76.1C271.7 104.7 256.9 96 240 96H48zm315.5 89.5L393.1 224H344c-13.3 0-24-10.7-24-24c0-13.1 10.8-24 24.2-24c7.6 0 14.7 3.5 19.3 9.5zM344 272h56 16v80H224v32H416V512h32V384H640V352H448V272h72c39.8 0 72-32.2 72-72c0-39.9-32.5-72-72.2-72c-22.4 0-43.6 10.4-57.3 28.2L432 195.8l-30.5-39.6c-13.7-17.8-35-28.2-57.3-28.2c-39.7 0-72.2 32.1-72.2 72c0 39.8 32.2 72 72 72zm175.8-96c13.4 0 24.2 10.9 24.2 24c0 13.3-10.7 24-24 24H470.9l29.6-38.5c4.6-5.9 11.7-9.5 19.3-9.5z"/></svg>
                                </span>
                                </div>
                                <p class="font-semibold text-lg capitalize">Product Service</p>
                                <p>Discover a curated selection of top-notch products that enhance your daily life. find quality and convenience in every purchase</p>
                            
                           </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4 h-full">
                        <div class="px-4 py-4 h-full">
                           <div class="bg-white shadow-xl px-4 py-8 rounded-sm h-full">
                                <div class="img">
                                <span>
                                    <svg class="w-14 h-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path class="fa-secondary" opacity=".4" d="M576.8 21.1c-2.5-7.4 .7-15.4 7.5-19.1s15.3-2 20.1 4.1l7.5 9.3c18.2 22.7 28 51.1 28 80.1C640 166.1 582.8 224 512 224H480V176c0-18-6-34.6-16-48h48 23c28.7 0 52.7-21.7 55.6-50.3c.8-7.8-.1-15.8-2.6-23.2L576.8 21.1zM176 128c-10 13.4-16 30-16 48v48H128C57.2 224 0 166.1 0 95.5C0 66.4 9.9 38 28 15.3L35.5 6C40.3 0 48.8-1.8 55.6 1.9s10 11.8 7.5 19.1L52 54.5c-2.5 7.5-3.4 15.4-2.6 23.2C52.3 106.3 76.3 128 105 128h23 48z"/><path class="fa-primary" d="M240 96c-44.2 0-80 35.8-80 80V288c0 37 25.2 68.2 59.3 77.3l27.6 110.3c5.3 21.4 24.5 36.4 46.6 36.4h53c22 0 41.2-15 46.6-36.4l27.6-110.3C454.8 356.2 480 325 480 288V176c0-44.2-35.8-80-80-80H240zM224 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm160-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                                </span>
                                </div>
                                <p class="font-semibold text-lg capitalize">Qurbani</p>
                                <p>Experience hassle-free Qurbani with us. Trust our reliable services for a seamless and respectful sacrifice.</p>
                            
                           </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4 h-full">
                        <div class="px-4 py-4 h-full">
                           <div class="bg-white shadow-xl px-4 py-8 rounded-sm h-full">
                                <div class="img">
                                <span>
                                    <svg class="w-14 h-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path class="fa-secondary" opacity=".4" d="M171.3 128H224v96H111.3l30.4-75.9c4.9-12.1 16.6-20.1 29.7-20.1zM272 224V128h81.2c9.7 0 18.9 4.4 25 12l67.2 84H272zM64 432a80 80 0 1 1 160 0A80 80 0 1 1 64 432zm432-80a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/><path class="fa-primary" d="M171.3 128H224v96H111.3l30.4-75.9c4.9-12.1 16.6-20.1 29.7-20.1zM272 224V128h81.2c9.7 0 18.9 4.4 25 12l67.2 84H272zm256.2 1l-100-125c-18.2-22.8-45.8-36-75-36H171.3c-39.3 0-74.6 23.9-89.1 60.3L40.6 228.4C16.8 237.8 0 260.9 0 288V400c0 17.7 14.3 32 32 32c0-61.9 50.1-112 112-112s112 50.1 112 112H384c0-61.9 50.1-112 112-112s112 50.1 112 112c17.7 0 32-14.3 32-32V352c0-65.2-48.8-119-111.8-127z"/></svg>
                                </span>
                                </div>
                                <p class="font-semibold text-lg capitalize">side-singing</p>
                                <p>Elevate your side singing. Our talented performers add a touch of melody and charm to make your events truly unforgettable</p>
                            
                           </div>
                        </div>
                    </div>
                  </div>
               </div>
              
           </div>
           </div>
           <div class="footer bg-kakaDeep flex justify-center">
              <div class="w-full">
                <div class="flex flex-wrap items-end py-4 text-white">
                <div class="w-full md:w-1/3 py-4">
                  <div class="px-4">
                      <div>
                        <img class=" w-28" src="../../assets/images/kaka/kklogo.png" alt="">
                      </div>
                      <p>Stay connected for convenience and quality. From side-singing to cabs, premium products, Hijama therapy, and Qurbani, we've got it all. Welcome!</p>
                  </div>
                </div>
                <div class="w-full md:w-1/3 py-4">
                <div class="flex justify-center">
                    <div class="px-4">
                      <p class=" text-xl">Address</p>
                      <ul>
                        <li class="flex py-2 items-center">
                          <span>
                            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 512 512"><path d="M375.8 275.2c-16.4-7-35.4-2.4-46.7 11.4l-33.2 40.6c-46-26.7-84.4-65.1-111.1-111.1L225.3 183c13.8-11.3 18.5-30.3 11.4-46.7l-48-112C181.2 6.7 162.3-3.1 143.6 .9l-112 24C13.2 28.8 0 45.1 0 64v0C0 300.7 183.5 494.5 416 510.9c4.5 .3 9.1 .6 13.7 .8c0 0 0 0 0 0c0 0 0 0 .1 0c6.1 .2 12.1 .4 18.3 .4l0 0c18.9 0 35.2-13.2 39.1-31.6l24-112c4-18.7-5.8-37.6-23.4-45.1l-112-48zM447.7 480C218.1 479.8 32 293.7 32 64v0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0c0-3.8 2.6-7 6.3-7.8l112-24c3.7-.8 7.5 1.2 9 4.7l48 112c1.4 3.3 .5 7.1-2.3 9.3l-40.6 33.2c-12.1 9.9-15.3 27.2-7.4 40.8c29.5 50.9 71.9 93.3 122.7 122.7c13.6 7.9 30.9 4.7 40.8-7.4l33.2-40.6c2.3-2.8 6.1-3.7 9.3-2.3l112 48c3.5 1.5 5.5 5.3 4.7 9l-24 112c-.8 3.7-4.1 6.3-7.8 6.3c-.1 0-.2 0-.3 0z"/></svg>
                          </span>
                          <span class="ml-2">
                            +0000000000
                          </span>
                        </li>
                        <li class="flex py-2 items-center">
                           <span>
                            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 512 512"><path d="M64 80c-26.5 0-48 21.5-48 48v28.2L220.8 321.4c20.5 16.5 49.8 16.5 70.3 0L496 156.2V128c0-26.5-21.5-48-48-48H64zM16 176.7V384c0 26.5 21.5 48 48 48H448c26.5 0 48-21.5 48-48V176.7L301.2 333.8c-26.4 21.3-64 21.3-90.4 0L16 176.7zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>
                          </span>
                          <span class="ml-2">
                            contact@kaka.net
                          </span>
                        </li>
                        <li class="flex py-2 items-center">
                            <span>
                            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 384 512"><path d="M368 192c0-97.2-78.8-176-176-176S16 94.8 16 192c0 18.7 6.4 42.5 17.8 69.6c11.3 26.9 27.1 55.8 44.7 84.3c35.2 57 76.8 111.4 102.3 143.2c5.9 7.3 16.6 7.3 22.4 0c25.5-31.8 67.1-86.2 102.3-143.2c17.6-28.5 33.4-57.4 44.7-84.3C361.6 234.5 368 210.7 368 192zm16 0c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192zM192 112a80 80 0 1 1 0 160 80 80 0 1 1 0-160zm64 80a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"/></svg>
                          </span>
                          <span class="ml-2">
                            Saudi Arabia
                          </span>
                        </li>
                      </ul>
                  </div>
                </div>
                  
                </div>
                <div class="w-full md:w-1/3 py-4">
                  <div class="px-4">
                    <div class="flex justify-center">
                      <div class="py-4">
                      <div>
                         <p class=" text-xl">Join With Us</p>
                         <p class="my-2">Join us for top services: side-singing, cabs, products, Hijama, and Qurbani. Welcome!</p>
                      </div>
                      <div class="flex py-2 items-end">
                        <a href="javascript:;">
                         <img class=" w-28" src="../../assets/images/kaka/kaka.svg" alt="">
                      </a>
                      </div>
                      </div>
                    </div>
                      
                  </div>
                </div>
              </div>
              </div>
           </div>
    </div>
  </div>  
</template>

<script lang="ts">
import AddModal from "../../components/list/AddMoreModal.vue";
import PageHeader from "../../components/list/PageHeader.vue";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import Loader from '../../components/comp/Loader.vue';
import { string } from "mathjs";



export default defineComponent({
  components: { PageHeader, AddModal,Loader },
  name: "signin",
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      isLoading:true,
      
    });
   
    

    onMounted(() => {
      setTimeout(() => {
              state.isLoading = false  
            }, 1000);
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>



 