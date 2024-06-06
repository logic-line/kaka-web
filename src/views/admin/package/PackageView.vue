<template>
  <div class="overflow-hidden px-6 py-4">
    <div v-if="isLoading" class="h-[507px] pt-2 pr-3">
      <Loader :isLoading="isLoading" />
    </div>
    <PageHeader title="Package View">
      <template v-slot:body>
        <router-link
          to="/admin/packages"
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
        <p class="py-2">Package Details</p>
        <a
          href="javascript:;"
          @click="removePackage"
          class="inline-block px-4 py-2 bg-red-500 text-white"
          >Remove Package</a
        >
      </div>
      <div class="pt-8 flex flex-wrap">
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Name</div>
            <div class="w-1/2 text-sm">
              {{ viewData.name }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Duration</div>
            <div class="w-1/2 text-sm">
              {{ viewData.duration }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Days</div>
            <div class="w-1/2 text-sm">
              {{ viewData.days }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Nights</div>
            <div class="w-1/2 text-sm">
              {{ viewData.nights }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Persons</div>
            <div class="w-1/2 text-sm">
              {{ viewData.persons }}
            </div>
          </div>
        </div>

        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Base Price</div>
            <div class="w-1/2 text-sm">
              {{ viewData.base_price }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Discount Price</div>
            <div class="w-1/2 text-sm">
              {{ viewData.discount_price }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Price</div>
            <div class="w-1/2 text-sm">
              {{ viewData.price }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Booking Amount</div>
            <div class="w-1/2 text-sm">
              {{ viewData.booking_amount }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Offer Applicable</div>
            <div class="w-1/2 text-sm">
              {{ viewData.offer_applicable }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Enabled</div>
            <div class="w-1/2 text-sm">
              <span class=" inline-block px-2 py-1"
                :class="viewData.enabled === 0 ? 'bg-red-500 text-white' 
                :' bg-kakaPrimary'">
                {{ viewData.enabled === 0 ? 'Inactive':'Active'}}
              </span>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Scheduled</div>
            <div class="w-1/2 text-sm">
              {{ viewData.scheduled }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Thing Will Love</div>
            <div class="w-1/2 text-sm">
              <div
                v-for="(item, index) in viewData.thing_will_love"
                :key="index"
                class="w-full"
              >
                <span class="inline-block ">{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Icon</div>
            <div class="w-1/2 text-sm">
              <img class="w-full h-28" :src="viewData.icon" alt="icon" />
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Banner</div>
            <div class="w-1/2 text-sm">
              <img class="w-full h-28" :src="viewData.banner" alt="icon" />
            </div>
          </div>
        </div>
        
        <div class="w-full px-4 py-4 border border-gray-200">
          <div class="w-full">
            <div class="font-semibold text-sm">Description</div>
            <div class="text-sm">
              {{ viewData.description }}
            </div>
          </div>
        </div>
        <div class="w-full px-4 py-4 border border-gray-200">
          <div class="w-full">
            <div class="font-semibold text-sm">Locations</div>
            <div class="text-sm flex flex-wrap">
              <div
                v-for="(item, index) in viewData.locations"
                :key="index"
                class=""
              >
                <span class="inline-block px-2 py-1 m-1 bg-gray-200">{{
                  item.title
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full px-4 py-4 border border-gray-200">
          <div class="w-full">
            <div class="font-semibold text-sm">images</div>
            <!-- <div class="w-1/2 text-sm">
              {{ viewData.images }}
            </div> -->
            <div class="w-full text-sm">
              <ul class="flex flex-wrap justify-between items-center">
                  <li class="md:w-1/6 w-full p-1"  v-for="(item, index) in viewData.images" :key="index">
                    <div>
                      <img class="w-full h-28" :src="item.url" alt="">
                      <!-- <p @click="removeQurbaniImage(item.id)" class="w-full text-sm bg-red-500 text-white text-center cursor-pointer">Remove</p> -->
                    </div>
                    
                  </li>
                  <!-- <span @click="selectImage" class="ml-2  w-12 h-12 flex justify-center items-center rounded-full cursor-pointer">
                     <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
                  </span> -->
                </ul>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 px-4 py-4 border border-gray-200">
          <div class="w-full">
            <div class="font-semibold text-sm">Source</div>
            <div class="text-sm">
              <div class="w-full">
                <div class="text-sm">
                    <GoogleMap ref="googleMap" :center="centerS" :zoom="zoom" style="width: 100%; height: 300px">
                      <Marker :position="center" />
                    </GoogleMap>
                </div>
          </div>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 px-4 py-4 border border-gray-200">
          <div class="w-full">
            <div class="font-semibold text-sm">Destination</div>
            <div class="text-sm">
              <div class="w-full">
                <div class="text-sm">
                    <GoogleMap ref="googleMap" :center="centerD" :zoom="zoom" style="width: 100%; height: 300px">
                      <Marker :position="center" />
                    </GoogleMap>
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
import { defineComponent, ref, reactive, computed, Ref, onMounted, toRefs } from "vue";

import PageHeader from "../../../components/list/PageHeader.vue";
import { useRoute, useRouter } from "vue-router";
import { toastrMsg } from "../../../utils/toastr";
import { useI18n } from "vue-i18n";
import PackageService from "../../../services/package";
import { GoogleMap,Marker } from 'vue3-google-map';
import Loader from "../../../components/comp/Loader.vue";

declare var google: any; // Declare the 'google' namespace

export default defineComponent({
  components: { PageHeader, Loader,GoogleMap, Marker},
  name: "ServiceAppointment",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { t } = useI18n();
    const myDiv = ref<HTMLDivElement | null>(null); 
    const zoom = ref(10);
    const state = reactive({
      isLoading: true,
      isFileUpload: false,
      roleList: <any>[],
      viewData: {},
      centerS : <any>{},
      centerD : <any>{},
      packageID: computed(() => route.params.id.toString()),
    });

    const removePackage = () => {
      let id = route.params.id;
      let ID = id.toString();
      new PackageService()
        .RemovePackage(ID)
        .then((response: any) => {
          if (response !== undefined) {
            console.log("delete succesfully");
            router.push({ path: "/admin/packages" });
          }
        })
        .catch((error) => {});
    };

    const getPackageView = () => {
      new PackageService()
        .GetPackageView(state.packageID)
        .then((response: any) => {
          if (response !== undefined) {
            state.viewData = response.data;
            const lat = parseFloat(response.data.source.latitude);
            const lng = parseFloat(response.data.source.longitude);
            state.centerS = ref({lat:lat, lng:lng});
            const latd = parseFloat(response.data.destination.latitude);
            const lngd = parseFloat(response.data.destination.longitude);
            state.centerD = ref({lat:latd, lng:lngd});
          }
        })
        .catch((error) => {});
    };

    const formattedText = computed(() => {
      if (myDiv.value) {
        const divElement = myDiv.value as HTMLElement;
        return divElement.innerText.replace(/- /g, "<br>- ");
      }
      return "";
    });
    onMounted(() => {
      getPackageView();
      if (myDiv.value) {
        myDiv.value.innerHTML = formattedText.value;
      }
      if (
        localStorage.getItem("fromRoute") &&
        localStorage.getItem("fromRoute") == "edit"
      ) {
        toastrMsg("User edit successful.");
      }
      setTimeout(() => {
        state.isLoading = false;
      }, 1000);
    });

    return {
      myDiv,
      zoom,
      removePackage,
      ...toRefs(state),
    };
  },
});
</script>
