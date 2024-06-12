<template>
  <div class="overflow-hidden px-6 py-4">
    <div v-if="isLoading" class="h-[507px] pt-2 pr-3">
      <Loader :isLoading="isLoading" />
    </div>
    <PageHeader title="Category View">
      <template v-slot:body>
        <router-link
          to="/admin/ecommerce/categorys"
          class="flex justify-center items-center bg-kakaPrimary py-2.5 px-8 w-full rounded-sm bor"
        >
          {{ $t("message.back-to-list") }}
        </router-link>
      </template>
    </PageHeader>

   <div
      class="md:px-8 py-8 px-4 mb-10  dark:bg-secondary10 dark:text-white border border-gray-300 dark:border-gray-500"
    >
      <div  class="flex flex-wrap items-center justify-between border-b pb-4 border-gray-300 dark:border-gray-500">
        <p class="py-2">Category Details</p>
            <a href="javascript:;"
          @click="removeCategory"
          class="inline-block px-4 py-2 bg-red-500 text-white"
          >Remove Category</a>
       
      </div>
     
      <div>
        <div class="">
          <p class="text-center uppercase font-semibold bg-gray-300 py-2">Category Details</p>
      </div>
      <div class="my-4 flex flex-wrap bg-gray-50">
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Title</div>
            <div class="w-1/2 text-sm">
             {{ viewData.title}}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Status</div>
            <div class="w-1/2 text-sm">
             <span class="border px-4 py-1 rounded-xs" 
                                :class="viewData.enabled === true ? ' bg-kakaPrimary'
                                :' bg-gray-400 text-white'">
                                 {{viewData.enabled === true?'Active':'Inactive'}}
                            </span>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">description</div>
            <div class="w-1/2 text-sm">
              {{ viewData.description }}
            </div>
          </div>
        </div>
      </div>
      </div>
      <div v-if="productsData!==null">
        <div class="">
          <p class="text-center uppercase font-semibold bg-gray-300 py-2">Products Info.</p>
      </div>
      <div class="my-4 flex flex-wrap bg-gray-50" v-for="(item, index) in productsData" :key="index">
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Title</div>
            <div class="w-1/2 text-sm">
             {{ item.title}}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Description</div>
            <div class="w-1/2 text-sm">
              {{ item.description }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Base Price</div>
            <div class="w-1/2 text-sm">
              {{ item.base_price }}
            </div>
          </div>
        </div>

        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Price</div>
            <div class="w-1/2 text-sm">
              {{ item.price }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Stock</div>
            <div class="w-1/2 text-sm">
              {{ item.stock }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Offer Message</div>
            <div class="w-1/2 text-sm">
              {{ item.offer_message }}
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Icon</div>
            <div class="w-1/2 text-sm">
             <img :src="item.icon" alt="">
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-4 py-4 border border-gray-200">
          <div class="w-full flex">
            <div class="w-1/2 font-semibold text-sm">Banner</div>
            <div class="w-1/2 text-sm">
              <img :src="item.banner" alt="">
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

import PageHeader from "../../../../components/list/PageHeader.vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import CategoryService from "../../../../services/category";
import Loader from "../../../../components/comp/Loader.vue";

export default defineComponent({
  components: { PageHeader, Loader},
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
      productsData: {},
      categoryID: computed(() => route.params.id.toString()),
    });

    const removeCategory = () => {
      let id = route.params.id;
      let ID = id.toString();
      new CategoryService()
        .RemoveCategory(ID)
        .then((response: any) => {
          if (response !== undefined) {
            router.push({ path: "/admin/ecommerce/categorys" });
          }
        })
        .catch((error) => {});
    };

    const getCategoryView = () => {
      new CategoryService()
        .GetCategoryView(state.categoryID)
        .then((response: any) => {
          if (response !== undefined) {
            state.viewData = response.data;
            state.productsData = response.data.products;
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
      getCategoryView();
      setTimeout(() => {
        state.isLoading = false;
      }, 1000);
    });

    return {
      myDiv,
      zoom,
      removeCategory,
      ...toRefs(state),
    };
  },
});
</script>
