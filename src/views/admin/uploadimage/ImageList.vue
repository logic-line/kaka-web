<template>
  <div>
    <ul class="flex flex-wrap">
      <li
        class="w-full md:w-1/5 px-4 py-4"
        v-for="(item, index) in tableData"
        :key="index"
      >
        <div>
          <img class="w-full h-48" :src="item.url" alt="" />
        </div>
        <p class="text-center bg bg-gray-400">{{ item.name }}</p>
        <a @click="RemoveImage(item.id)" href="javascript:;" class="text-center inline-block w-full py-1 text-xs bg-red-600 text-white">remove</a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  Ref,
  onMounted,
  toRefs,
  onUnmounted,
  onBeforeUnmount,
} from "vue";

import AddModal from "../../../components/list/AddMoreModal.vue";
import PageHeader from "../../../components/list/PageHeader.vue";
import TableCompo from "../../../components/list/TableCompo.vue";
import TablePaggination from "../../../components/list/TablePaggination.vue";
import TableTitleColumn from "../../../components/list/TableTitleColumn.vue";
import TableDataComp from "../../../components/list/TableDataComp.vue";
import { useStore } from "vuex";
import ImageService from "../../../services/imageUpload";
import { ListImageRequest } from "../../../types/imageupload";
import "vue3-toastify/dist/index.css";
import { toastrMsg } from "../../../utils/toastr";
import { routeGroupCheck } from "../../../utils/route-utils";
import Loader from "../../../components/comp/Loader.vue";
import router from "@/router";

let listFilterData: ListImageRequest = {
  perPage: 20,
  page: 1,
};

export default defineComponent({
  components: {
    PageHeader,
    AddModal,
    TableCompo,
    TableTitleColumn,
    TablePaggination,
    TableDataComp,
    Loader,
  },
  name: "list-image",
  setup() {
    const store = useStore();
    const showModal = ref(false);
    const state = reactive({
      isLoading: true,
      isFilterOpen: false,
      tableData: <any>[],
      filterForm: listFilterData,
      sortIconData: 0,
      activeHeader: "",
      prevElm: "",
      userStatus: false,
      ListLength: 0,
      roleList: {},
    });


        const setTableData = ()=>{
            new ImageService().listOfImage().then((response:any)=>{
                if(response !== undefined){
                     state.tableData = response.data.data;
                    
                }
            }).catch((error)=>{
               if(error.response != undefined){
                    if(error.response.status === 401){
                       localStorage.removeItem('token');
                       router.push({ path: "/signin" });
                   }
                }
            });
        }

        const RemoveImage=(id :any)=>{
            new ImageService().removeImage(id).then((response:any)=>{
                if(response !== undefined){
                    setTableData();
                    }
                }).catch((error)=>{
                   if(error.response != undefined){
                    if(error.response.status === 401){
                       localStorage.removeItem('token');
                       router.push({ path: "/signin" });
                   }
                }
                });
        }

    onBeforeUnmount(() => {
      let routeData = routeGroupCheck();
      if (routeData.reset == "TRUE") {
      }
    });
    onMounted(() => {
      setTableData();

      if (
        localStorage.getItem("fromRoute") &&
        localStorage.getItem("fromRoute") == "create"
      ) {
        toastrMsg("User created successfully.");
      }
      setTimeout(() => {
        state.isLoading = false;
      }, 1000);
    });

    return {
      ...toRefs(state),
      setTableData,
      showModal,
      RemoveImage,
    };
  },
});
</script>
