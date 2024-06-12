<template>
  <div class="overflow-hidden px-6 py-4">
    <div v-if="isLoading" class="h-[507px] pt-2 pr-3">
      <Loader :isLoading="isLoading" />
    </div>
    <PageHeader title="Qurbani View Booking">
      <template v-slot:body>
        <router-link
          to="/admin/cab/booking"
          class="flex justify-center items-center bg-kakaPrimary py-2.5 px-8 w-full rounded-sm bor"
        >
          {{ $t("message.back-to-list") }}
        </router-link>
      </template>
    </PageHeader>

    <div
      class="md:px-8 py-8 px-4  mb-10 bg-gray-50 dark:bg-secondary10 dark:text-white border border-gray-300 dark:border-gray-500"
    >
      <div  class="flex flex-wrap items-center justify-between border-b pb-4 border-gray-300 dark:border-gray-500">
        <div>
            <p class="py-2">Booking Details</p>
        </div>
         <div>
         <!-- v-model="form.offer_applicable"  -->
            <select @change="changeStatus" name="status-update" class="modal-input-style">
                <option value="" selected disabled>Update Status</option>
                <option  value="0">CREATED</option>
                <option  value="1">PENDING</option>
                <option  value="2">PROCESSING</option>
                <option  value="3">COMPLETED</option>
                <option  value="4">CANCELLED</option>
                <option  value="5">CONFIRMED</option>
          </select>
         </div>
       
      </div>
      <div class="pt-8 flex flex-wrap">
        <div v-if="userData!==null" class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Name</div>
            <div class="w-1/2 text-sm">
              {{ userData.name   }}
            </div>
          </div>
        </div>
        <div v-if="userData!==null" class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex justify-between">
            <div class=" font-semibold text-sm">Email</div>
            <div class="ml-2 text-sm">
              {{ userData.email   }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Pickup</div>
            <div class="w-1/2 text-sm">
              {{ viewData.pickup }}
            </div>
          </div>
        </div>
        
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Status</div>
            <div class="w-1/2 text-sm">
              <span class=" inline-block px-2 py-1"
            :class="viewData.status === 'PENDING' ? 'bg-yellow-500 text-white' 
            :viewData.status === 'PROCESSING' ? 'bg-blue-500 text-white' 
            :viewData.status === 'COMPLETED' ? 'bg-green-500 text-white' 
            :viewData.status === 'CANCELLED' ? 'bg-red-500 text-white' 
            :viewData.status === 'CONFIRMED' ? 'bg-purple-500 text-white' 
            :' bg-gray-400 text-white'">
                <!-- {{ viewData.status === 0 ? 'CREATED': viewData.status === 1 ? 'PENDING' : viewData.status === 2 ? 'PROCESSING': viewData.status === 3 ? 'COMPLETED': viewData.status === 4 ? 'CANCELLED': viewData.status === 5 ? 'CONFIRMED':''}} -->
                {{viewData.status}}
              </span>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Drop</div>
            <div class="w-1/2 text-sm">
              {{ viewData.drop}}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Service Type</div>
            <div class="w-1/2 text-sm">
              {{ viewData.service_type }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Travel Date</div>
            <div class="w-1/2 text-sm">
              {{ viewData.travel_date }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Travel Time</div>
            <div class="w-1/2 text-sm">
              {{ viewData.travel_time }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Car Size</div>
            <div class="w-1/2 text-sm">
              {{ viewData.car_size }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Contact Number</div>
            <div class="w-1/2 text-sm">
              {{ viewData.contact_number }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Total Paid</div>
            <div class="w-1/2 text-sm">
              {{ viewData.total_paid }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Total Due</div>
            <div class="w-1/2 text-sm">
              {{ viewData.total_due }}
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
import CabService from "../../../services/cab";
import { CabUpdateRequest } from '../../../types/cab';
import { GoogleMap,Marker } from 'vue3-google-map';
import Loader from "../../../components/comp/Loader.vue";

declare var google: any; // Declare the 'google' namespace

let statusFormData : CabUpdateRequest={
        status:'',
        bookingId:'',
}

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
      statusFormData: {
        status: '',
        bookingId: '',
      } as CabUpdateRequest,
      viewData: {},
      userData: {},
      centerS : <any>{},
      centerD : <any>{},
      bookingID: computed(() => route.params.id.toString()),
    });

    const getCabBookingView = () => {
      new CabService()
        .GetCabBookingView(state.bookingID)
        .then((response: any) => {
          if (response !== undefined) {
            state.viewData = response.data;
            state.userData = response.data.user;
          }
        })
        .catch((error) => {
           if(error.response != undefined){
                    if(error.response.status === 401){
                       localStorage.removeItem('token');
                       router.push({ path: "/signin" });
                   }
                }
        });
    };
    const changeStatus = (event: Event) => {
      const selectedValue = (event.target as HTMLSelectElement).value;
      state.statusFormData.status = selectedValue;
      state.statusFormData.bookingId = state.bookingID;

      new CabService().ChangeStatus(state.statusFormData)
        .then((response) => {
          if (response !== undefined) {
            getCabBookingView()
          }
        })
        .catch((error) => {
           if(error.response != undefined){
                    if(error.response.status === 401){
                       localStorage.removeItem('token');
                       router.push({ path: "/signin" });
                   }
                }
        });
    };

    onMounted(() => {
      getCabBookingView();
      
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
      changeStatus,
      ...toRefs(state),
    };
  },
});
</script>
