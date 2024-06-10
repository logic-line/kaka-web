<template>
  <div>
    <div v-if="isLoading" class="h-[507px] pt-2 pr-3" >
       <Loader :isLoading="isLoading" />
     </div>
    <div class="bg-opacity-0 min-h-[calc(100vh-161px)] flex items-center">
           
    <div class=" dark:bg-black100 w-full">
        <div class="custom-max-width">
            <div class="px-4 py-3">
              <p>Hello, <span>Kaka</span></p>
              <p>Today is <span>{{dayName}}</span> <span>{{currentDate}}</span> </p>
            </div>
            <div class="flex flex-wrap">
              <div class="w-full md:w-1/4">
                <div class="px-4 py-3">
                  <div class=" bg-kakaPrimary p-4 rounded-md shadow-md">
                    <div class="flex justify-center items-center">
                      <div class="">
                      <span>
                          <svg class="w-14 h-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M80 80a64 64 0 1 1 128 0A64 64 0 1 1 80 80zm144 0A80 80 0 1 0 64 80a80 80 0 1 0 160 0zm96 64a80 80 0 1 1 0 160 80 80 0 1 1 0-160zm0 176a96 96 0 1 0 0-192 96 96 0 1 0 0 192zm-58.7 48H378.7C443.5 368 496 420.5 496 485.3c0 5.9-4.8 10.7-10.7 10.7H154.7c-5.9 0-10.7-4.8-10.7-10.7C144 420.5 196.5 368 261.3 368zm0-16C187.7 352 128 411.7 128 485.3c0 14.7 11.9 26.7 26.7 26.7H485.3c14.7 0 26.7-11.9 26.7-26.7C512 411.7 452.3 352 378.7 352H261.3zM512 16a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm0 144A80 80 0 1 0 512 0a80 80 0 1 0 0 160zm24 48c48.6 0 88 39.4 88 88c0 4.4 3.6 8 8 8s8-3.6 8-8c0-57.4-46.6-104-104-104H444c1.3 5.2 2.4 10.6 3 16h89zm-343 0c.7-5.4 1.7-10.8 3-16H104C46.6 192 0 238.6 0 296c0 4.4 3.6 8 8 8s8-3.6 8-8c0-48.6 39.4-88 88-88h89z"/></svg>
                      </span>
                      <p class="text-sm text-center uppercase">User</p>
                    </div>
                    </div>
                    <div class="py-2 text-xs text-center">
                        <p class="py-1"><span>Total User:</span> <span>100</span></p>
                        <p class="py-1"><span>Active User:</span> <span>5</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full md:w-1/4">
                <div class="px-4 py-3">
                  <div class=" bg-kakaCard1   p-4 rounded-md shadow-md">
                    <div class="flex justify-center items-center">
                      <div class="">
                      <span>
                         <svg class="w-14 h-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M400 2.7l6.4 8.5c19.4 25.8 44.3 46.4 72.9 65.9c18 12.3 37.1 23.8 57.1 35.9l0 0c12 7.3 24.3 14.7 37 22.6c27.2 17.1 42.6 47.3 42.6 79c0 14.8-3.3 28.9-9.2 41.4H588.7c7.2-12.1 11.3-26.3 11.3-41.4c0-26.6-12.9-51.5-35.1-65.4c-12.1-7.6-24.2-14.9-36.1-22.1c-20.3-12.3-40.1-24.3-58.5-36.7C443.9 72.4 419.8 52.9 400 28.9c-19.8 24-43.9 43.4-70.3 61.4c-18.3 12.4-38.1 24.4-58.5 36.7l0 0c-11.9 7.2-24 14.5-36.1 22.1c-22.2 13.9-35.1 38.8-35.1 65.4c0 15.1 4.1 29.3 11.3 41.4H193.2c-5.9-12.6-9.2-26.6-9.2-41.4c0-31.7 15.4-61.9 42.6-79c12.6-7.9 24.9-15.4 37-22.6l0 0 0 0c20-12.1 39.1-23.6 57.1-35.9c28.6-19.4 53.5-40.1 72.9-65.9L400 2.7zM84.6 9.4L105 23.6c34.4 23.9 55 63.2 55 105.1V248v8H144v-8V160H16v16V496H120h8v16h-8H8 0v-8V176 128.8C0 86.8 20.5 47.6 55 23.6L75.4 9.4 80 6.3l4.6 3.2zM144 128.8c0-36.7-18-71.1-48.1-92L80 25.7l-15.9 11C34 57.7 16 92.1 16 128.8V144H144V128.8zM640 288v8V504v8h-8H576 560 528 512 464 448 352 336 288 272 240 224 168h-8v-8V296v-8h8H632h8zM448 416c0-15.1-7.1-29.3-19.2-38.4L400 356l-28.8 21.6C359.1 386.7 352 400.9 352 416v80h96V416zm64 80V400 384h16 32 16v16 96h48V304H176V496h48V400 384h16 32 16v16 96h48V416c0-20.1 9.5-39.1 25.6-51.2L400 336l38.4 28.8C454.5 376.9 464 395.9 464 416v80h48zm16 0h32V400H528v96zm-256 0V400H240v96h32z"/></svg>
                      </span>
                      <p class="text-sm text-center uppercase">Package</p>
                    </div>
                    </div>
                    <div class="py-2 text-xs text-center">
                        <p class="py-1"><span>Total Package:</span> <span>100</span></p>
                        <p class="py-1"><span>Total booking Package:</span> <span>5</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full md:w-1/4">
                <div class="px-4 py-3">
                  <div class=" bg-kakaCard2 p-4 rounded-md shadow-md">
                    <div class="flex justify-center items-center">
                      <div class="">
                      <span>
                          <svg class="w-14 h-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M43.8 17c3.4 1.9 5 5.9 3.8 9.6L36.4 59.9c-2.8 8.5-3.9 17.6-3 26.5C36.8 119.1 64.2 144 97 144h75.8c16.6-28.7 47.6-48 83.2-48H384c35.5 0 66.6 19.3 83.2 48H543c32.8 0 60.3-24.9 63.5-57.5c.9-9-.1-18-3-26.5L592.4 26.5c-1.2-3.7 .4-7.7 3.8-9.6s7.6-1 10.1 2l7.5 9.3c17 21.3 26.3 47.7 26.3 75V120c0 66.3-53.7 120-120 120H480v48c0 41.8-26.7 77.3-64 90.5l-26.4 87.9c-8.1 27.1-33 45.6-61.3 45.6H311.6c-28.3 0-53.2-18.5-61.3-45.6L224 378.5c-37.3-13.2-64-48.7-64-90.5V240H120C53.7 240 0 186.3 0 120V103.3C0 76 9.3 49.6 26.3 28.3L33.8 19c2.4-3 6.7-3.9 10.1-2zM480 224h40c57.4 0 104-46.6 104-104V103.3c0-5.7-.5-11.4-1.4-17c0 .6-.1 1.2-.2 1.8C618.3 128.9 584 160 543 160H474.5c3.5 10 5.5 20.8 5.5 32v32zM97 160c-41 0-75.4-31.1-79.5-71.9c-.1-.6-.1-1.2-.2-1.8c-.9 5.6-1.4 11.3-1.4 17V120c0 57.4 46.6 104 104 104h40V192c0-11.2 1.9-22 5.5-32H97zM229.3 363.4c4.8 1.7 8.5 5.6 10 10.5l26.4 87.9c6.1 20.3 24.8 34.2 46 34.2h16.8c21.2 0 39.9-13.9 46-34.2l26.4-87.9c1.5-4.9 5.2-8.8 10-10.5c31.1-11 53.3-40.6 53.3-75.4V192c0-44.2-35.8-80-80-80H256c-44.2 0-80 35.8-80 80v96c0 34.8 22.2 64.4 53.3 75.4zM256 232a24 24 0 1 0 0 48 24 24 0 1 0 0-48zm40 24a40 40 0 1 1 -80 0 40 40 0 1 1 80 0zm64 0a24 24 0 1 0 48 0 24 24 0 1 0 -48 0zm24 40a40 40 0 1 1 0-80 40 40 0 1 1 0 80z"/></svg>
                      </span>
                      <p class="text-sm text-center uppercase">Qurbani</p>
                    </div>
                    </div>
                    <div class="py-2 text-xs text-center">
                        <p class="py-1"><span>Total Qurbani:</span> <span>100</span></p>
                        <p class="py-1"><span>Total Qurbani booking:</span> <span>5</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full md:w-1/4">
                <div class="px-4 py-3">
                  <div class=" bg-kakaCard3 p-4 rounded-md shadow-md">
                    <div class="flex justify-center items-center">
                      <div class="text-center">
                      <span class="mx-auto text-center">
                          <svg class="w-14 h-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M111.4 4.9c-1.7-4.1-6.4-6-10.5-4.3s-6 6.4-4.3 10.5l30.5 73.1-82.9-51c-3.8-2.3-8.7-1.1-11 2.6s-1.1 8.7 2.6 11L115.7 96H72C32.2 96 0 128.2 0 168V440c0 39.8 32.2 72 72 72H184c4.4 0 8-3.6 8-8s-3.6-8-8-8H72c-30.9 0-56-25.1-56-56V168c0-30.9 25.1-56 56-56h72 0H248c4.4 0 8-3.6 8-8s-3.6-8-8-8H172.3l79.9-49.2c3.8-2.3 4.9-7.2 2.6-11s-7.2-4.9-11-2.6L161.6 83.8l31.8-72.6c1.8-4-.1-8.8-4.1-10.5s-8.8 .1-10.5 4.1L144.2 83.6 111.4 4.9zM368.1 159.7L417.6 224H392 336c-22.1 0-40-17.9-40-40c0-22.1 18-40 40.2-40c12.5 0 24.4 5.8 32 15.7zM280 184c0 15.7 6.4 29.8 16.8 40H272c-26.5 0-48 21.5-48 48V464c0 26.5 21.5 48 48 48H592c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48H567.2c10.4-10.2 16.8-24.3 16.8-40c0-31-25.3-56-56.2-56c-17.4 0-34 8.1-44.7 22L432 216.5 380.8 150c-10.7-13.9-27.2-22-44.7-22c-30.9 0-56.2 25-56.2 56zm-8 56h64 56 32V352H240V272c0-17.7 14.3-32 32-32zM240 368H424V496H272c-17.7 0-32-14.3-32-32V368zm384 0v96c0 17.7-14.3 32-32 32H440V368H624zM440 352V240h32 56 64c17.7 0 32 14.3 32 32v80H440zm32-128H446.4l49.5-64.3c7.6-9.9 19.5-15.7 32-15.7c22.1 0 40.2 17.9 40.2 40c0 22.1-17.9 40-40 40H472z"/></svg>
                      </span>
                      <p class="text-sm text-center uppercase">Product</p>
                    </div>
                    </div>
                    <div class="py-2 text-xs text-center">
                        <p class="py-1"><span>Total Product:</span> <span>100</span></p>
                        <p class="py-1"><span>Total Order Product:</span> <span>5</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap">
              <div class="w-full md:w-1/2">
                <div class="px-4 py-3">
                  <div class=" bg-kakaCard4 p-4 rounded-md shadow-md">
                    <p class=" uppercase">Today Booking</p>
                    <div class="py-2 text-sm">
                        <p class="py-2 uppercase text-xs">Qurbani</p>
                        <div class="h-2 bg-gray-200 w-full rounded-md">
                            <div class="h-2 bg-kakaCard1 rounded-md" style="width:33%"></div>
                        </div>
                    </div>
                    <div class="py-2 text-sm">
                        <p class="py-2 uppercase text-xs">Product</p>
                        <div class="h-2 bg-gray-200 w-full rounded-md">
                            <div class="h-2 bg-kakaCard2 rounded-md" style="width:53%"></div>
                        </div>
                    </div>
                    <div class="py-2 text-sm">
                        <p class="py-2 uppercase text-xs">Package</p>
                        <div class="h-2 bg-gray-200 w-full rounded-md">
                            <div class="h-2 bg-kakaCard3 rounded-md" style="width:83%"></div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full md:w-1/2">
                <div class="px-4 py-3">
                  <div class=" bg-kakaCard  p-4 rounded-md shadow-md">
                    <p class="text-center uppercase">Today Totoal Register User</p>
                    <div class="py-2 flex justify-center items-center"> 
                        <div class="h-40 w-40 bg-kakaPrimary rounded-full flex justify-center items-center">
                              <div class=" h-32 w-32 bg-white rounded-full flex justify-center items-center">
                                  <div>
                                     <p class=" text-xl text-center"><span>50</span></p>
                                      <p class=" text-xl text-center border-t-2 border-kakaPrimary">2000</p>
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
      currentDate: formatDate( new Date().toLocaleString()),
      
    });
    function formatDate(dateString:any) {
      const [month, day, year] = dateString.split('/');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthName = monthNames[parseInt(month) - 1];
      return `${day} ${monthName} ${year}`;
    }
    

    onMounted(() => {
      setTimeout(() => {
        state.currentDate,
              state.isLoading = false  
            }, 1000);
    });
    return {
      formatDate,
      ...toRefs(state),
    };
  },
});
</script>



 