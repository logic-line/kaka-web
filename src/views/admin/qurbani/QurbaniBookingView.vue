<template>
  <div class="overflow-hidden px-6 py-4">
    <div v-if="isLoading" class="h-[507px] pt-2 pr-3">
      <Loader :isLoading="isLoading" />
    </div>
    <PageHeader title="Qurbani View Booking">
      <template v-slot:body>
        <router-link
          to="/admin/qurbanis/booking"
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
            <div class="w-1/2 font-semibold text-sm">Contact Number</div>
            <div class="w-1/2 text-sm">
              {{ viewData.contact_number }}
            </div>
          </div>
        </div>
        
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Status</div>
            <div class="w-1/2 text-sm">
              <span class=" inline-block px-2 py-1"
            :class="viewData.status === 1 ? 'bg-yellow-500 text-white' 
            :viewData.status === 2 ? 'bg-blue-500 text-white' 
            :viewData.status === 3 ? 'bg-green-500 text-white' 
            :viewData.status === 4 ? 'bg-red-500 text-white' 
            :viewData.status === 5 ? 'bg-purple-500 text-white' 
            :' bg-gray-400 text-white'">
                {{ viewData.status === 0 ? 'CREATED': viewData.status === 1 ? 'PENDING' : viewData.status === 2 ? 'PROCESSING': viewData.status === 3 ? 'COMPLETED': viewData.status === 4 ? 'CANCELLED': viewData.status === 5 ? 'CONFIRMED':''}}
              </span>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Language</div>
            <div class="w-1/2 text-sm">
              {{ viewData.language}}
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
            <div class="w-1/2 font-semibold text-sm">Discount</div>
            <div class="w-1/2 text-sm">
              {{ viewData.discount }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Vat</div>
            <div class="w-1/2 text-sm">
              {{ viewData.vat }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Other Charge</div>
            <div class="w-1/2 text-sm">
              {{ viewData.other_charge }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Final Price</div>
            <div class="w-1/2 text-sm">
              {{ viewData.final_price }}
            </div>
          </div>
        </div>
        <div v-if="paymentData!==null" class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Total Due</div>
            <div class="w-1/2 text-sm">
              {{ paymentData.total_due }}
            </div>
          </div>
        </div>
        <div v-if="paymentData!==null" class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Total Paid</div>
            <div class="w-1/2 text-sm">
              {{ paymentData.total_paid }}
            </div>
          </div>
        </div>
        <div v-if="paymentData!==null" class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Partial Payment Applicable</div>
            <div class="w-1/2 text-sm">
              {{ paymentData.partial_payment_applicable }}
            </div>
          </div>
        </div>
        <div v-if="paymentData!==null" class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Partial Amount</div>
            <div class="w-1/2 text-sm">
              {{ paymentData.partial_amount }}
            </div>
          </div>
        </div>
        <div v-if="paymentData!==null" class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Product Type</div>
            <div class="w-1/2 text-sm">
              {{ paymentData.product_type }}
            </div>
          </div>
        </div>
        <div v-if="paymentData!==null" class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Unit</div>
            <div class="w-1/2 text-sm">
              {{ paymentData.unit }}
            </div>
          </div>
        </div>
        <div  v-if="qurbaniData!==null" class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Qurbani Animal Name</div>
            <div class="w-1/2 text-sm">
              {{ qurbaniData.name }}
            </div>
          </div>
        </div>
        <div  v-if="animalTypeData!==null" class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Qurbani Animal Type</div>
            <div class="w-1/2 text-sm">
              {{animalTypeData.type}}
            </div>
          </div>
        </div>
        <div  v-if="qurbaniData!==null" class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">images</div>
            <div class="w-1/2 text-sm">
              <img :src="qurbaniData.icon" alt="">
            </div>
          </div>
        </div>
         <div class="w-full px-4 py-4 border border-gray-200">
          <div class="w-full">
            <div class="font-semibold text-sm">Message</div>
            <div class="text-sm">
              {{ viewData.message }}
            </div>
          </div>
        </div>
        <div class="w-full px-4 py-4 border border-gray-200">
          <div class="w-full">
            <div class="font-semibold text-sm">Reason</div>
            <div class="text-sm">
              {{ viewData.reason }}
            </div>
          </div>
        </div>
        <div v-if="qurbaniData!==null" class="w-full px-4 py-4 border border-gray-200">
          <div class="w-full">
            <div class="font-semibold text-sm">Qurbani Animal Description</div>
            <div class="text-sm text-justify">
              {{ qurbaniData.description }}
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
import QurbaniService from "../../../services/qurbani";
import { BookingStatusUpdateRequest } from '../../../types/qurbani';
import { GoogleMap,Marker } from 'vue3-google-map';
import Loader from "../../../components/comp/Loader.vue";

declare var google: any; // Declare the 'google' namespace

let statusFormData : BookingStatusUpdateRequest={
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
      } as BookingStatusUpdateRequest,
      viewData: {},
      paymentData: {},
      qurbaniData: {},
      animalTypeData: {},
      centerS : <any>{},
      centerD : <any>{},
      bookingID: computed(() => route.params.id.toString()),
    });

    const getQurbaniBookingView = () => {
      new QurbaniService()
        .GetQurbaniBookingView(state.bookingID)
        .then((response: any) => {
          if (response !== undefined && response.data !== undefined) {
            state.viewData = response.data;
            state.paymentData = response.data.payment;
            state.qurbaniData = response.data.qurbani;
            state.animalTypeData = response.data.qurbani_animal_type;
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

      new QurbaniService().ChangeStatus(state.statusFormData)
        .then((response) => {
          if (response !== undefined) {
            getQurbaniBookingView()
          }
        })
        .catch((error) => {
          console.error("Error changing status:", error);
        });
    };

    onMounted(() => {
      getQurbaniBookingView();
      
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
