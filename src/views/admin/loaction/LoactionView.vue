<template>
  <div class="overflow-hidden px-6 py-4">
    <div v-if="isLoading" class="h-[507px] pt-2 pr-3">
      <Loader :isLoading="isLoading" />
    </div>
    <PageHeader title="Location View">
      <template v-slot:body>
        <router-link
          to="/admin/locations"
          class="flex justify-center items-center bg-kakaPrimary py-2.5 px-8 w-full rounded-sm bor"
        >
          {{ $t("message.back-to-list") }}
        </router-link>
      </template>
    </PageHeader>

    <div
      class="p-8 mb-10 bg-gray-50 dark:bg-secondary10 dark:text-white border border-gray-300 dark:border-gray-500"
    >
      <div
        class="flex flex-wrap items-center justify-between border-b pb-4 border-gray-300 dark:border-gray-500"
      >
        <p class="py-2">Location Details</p>
        <div class="flex">
          <a href="javascript:;" @click="removeLocation" class="inline-block px-4 py-2 bg-red-500 text-white">Remove Location</a>
        </div>
      </div>
      <div class="pt-8 flex flex-wrap">
        <div class="w-full md:w-1/2 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Name</div>
            <div class="w-1/2 text-sm">
              {{ viewData.name }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Reference</div>
            <div class="w-1/2 text-sm">
              {{ viewData.reference }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Icon</div>
            <div class="w-1/2 text-sm">
              <img :src="viewData.icon" alt="icon" />
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Banner</div>
            <div class="w-1/2 text-sm">
              <img :src="viewData.banner" alt="icon" />
            </div>
          </div>
        </div>
        <div class="w-full px-4 py-4 border border-gray-200">
          <div class="w-full">
            
            <div class="text-sm">
              
              <GoogleMap
                ref="googleMap"
                :center="center"
                :zoom="zoom"
                style="width: 100%; height: 300px"
              >
                <Marker :position="center" />
              </GoogleMap>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive, ref,onMounted,toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { GoogleMap,Marker } from 'vue3-google-map';
import PageHeader from '../../../components/list/PageHeader.vue';
import Loader from '../../../components/comp/Loader.vue';
import ImageService from "../../../services/imageUpload";
import LocationService from '../../../services/location';
import config from '../../../../../kaka-web/src/config';
import router from '../../../../../kaka-web/src/router';





export default defineComponent({
  components: {PageHeader,Loader, GoogleMap, Marker },
  setup() {
    const route = useRoute()
    const YOUR_GOOGLE_MAPS_API_KEY = config.googleApiKey;
    const zoom = ref(10);
    const state = reactive(
            {
                isLoading:true,
                 viewData:{},
                 center : <any>{},
            }
        );

        const getLocationView=()=>{
             let id = route.params.id;
            let ID =id.toString()
            new LocationService().GetLocationView(ID).then((response:any)=>{
                if(response !== undefined){
                    state.viewData = response.data
                    const lat = parseFloat(response.data.latitude);
                    const lng = parseFloat(response.data.longitude);
                    state.center = ref({lat:lat, lng:lng});
                }
            }).catch((error)=>{
               if(error.response.status === 401){
                    console.log("logout")
                    localStorage.removeItem('token');
                    router.push({ path: "/signin" });
                }
            });

        }
        const removeLocation=()=>{
            let id = route.params.id;
            let ID =id.toString()
            new LocationService().RemoveLocation(ID).then((response:any)=>{
                if(response !== undefined){
                    router.push({ path:"/admin/locations" })
                }
            }).catch((error)=>{});
        }

    onMounted(()=>{
        getLocationView();

            setTimeout(() => {
              state.isLoading = false
            }, 1000);
        })

    return {
         YOUR_GOOGLE_MAPS_API_KEY,
          getLocationView,
          removeLocation,
          zoom,
          ...toRefs(state),
           };
  }
});
</script>
