<template>
    <div class="overflow-hidden px-6 py-4">
        <div v-if="isLoading" class="h-[507px] pt-2 pr-3" >
          <Loader :isLoading="isLoading" />
        </div>
        <PageHeader  
            :search='false' 
            :searchInput="filterForm.searchterm"

            @enter:searchInput="setNewTableData"
            @search="getListBySearch" 
            @resetSearch="resetSearchTerm"
            title="Package Booking List">
            
        </PageHeader>

        <FilterModal v-if="isFilterOpen"
        @closeFilter="closeFilter" 
        @submitFilter="getListByFiltering"
        @resetFilter="resetFilterForm"
        :filterTitle="$t('message.filter-user')">
            <template v-slot:body>
                <div class="space-y-4">
                    <div class="w-full">
                        <label class="block mb-2 capitalize">{{ $t('message.status') }}</label>
                        <select v-model="filterForm.status" class="modal-select-style">
                            <option value="" disabled>{{ $t('message.select') }}</option>
                            <option value="ACTIVE">{{ $t('message.active') }}</option>
                            <option value="INACTIVE">{{ $t('message.inactive') }}</option>
                        </select>
                    </div>
                    <div class="w-full">
                        <label class="block mb-2 capitalize">{{ $t('message.role') }}</label>
                      
                        <select v-model="filterForm.roleid" name="roleid" class="modal-select-style">
                            <option value="" disabled>{{ $t('message.select') }}</option>
                            <option v-for="item in roleList" :key="item.id" :value="item.id">
                                {{ item.Name }}
                            </option>
                        </select>
                    </div>
                </div>
            </template>
        </FilterModal>
        <!------------------ filter modal END --------------------->
        <div v-for="data in tableData" v-show="data.id==actionModalID" :key="data.id">
            <portal-target :name="data.id"></portal-target>
        </div>
        <TableCompo id="tableContainer"> 
            <template v-slot:header>
                <table-title-column class="table-cell" name="Pickup Point"  ></table-title-column>
                <table-title-column class="table-cell" name="Contact Number" ></table-title-column>
                <table-title-column class="table-cell" name="Travel Date"  ></table-title-column>
                <table-title-column class="table-cell" name="Status"  ></table-title-column>
                <th class="text-sm dark:text-secondary font-medium text-black100 cursor-pointer px-6 py-4">
                    <div class="flex items-center justify-end space-x-1.5">
                        <span>{{ $t('message.action') }}</span>
                    </div>
                </th>
            </template>
            
            <template v-slot:body>
                <tr v-for="data in tableData" :key="data.id" class="border dark:bg-black100 bg-secondary10">
                    <table-data-comp :data="data.pickup_point"></table-data-comp>
                    <table-data-comp :data="data.contact_number"></table-data-comp>
                    <table-data-comp :data="data.travel_date"></table-data-comp>
                     <td class="px-3 sm:px-6 py-3">
                        <div class="flex items-center justify-start space-x-3 dark:text-secondary text-black100 font-medium">
                            <span class="border px-4 py-onehalf rounded-xs" 
                                :class="data.status === 1 ? 'bg-yellow-500 text-white' 
                                :data.status === 2 ? 'bg-blue-500 text-white' 
                                :data.status === 3 ? 'bg-green-500 text-white' 
                                :data.status === 4 ? 'bg-red-500 text-white' 
                                :data.status === 5 ? 'bg-purple-500 text-white' 
                                :' bg-gray-400 text-white'">
                                 {{data.status === 1?'PENDING':data.status === 2?'PROCESSING':data.status === 3?'COMPLETED':data.status === 4?'CANCELLED':data.status === 5?'CONFIRMED':'CREATED'}}
                            </span>
                        </div>
                    </td>
                    
                    <td class="px-6 py-3">
                        <div class="flex justify-end">
                            <div class="relative">
                                <button @click="toggleActionDropdown(data.id,$event)" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                                <portal :to="data.id">
                                    <div :id="data.id" class="edit-drop z-30 fixed space-y-3 rounded shadow-lg p-4 w-max bg-white dark:bg-black100 text-base py-2">
                                        <router-link :to="{name:'package-view', params:{id:data.id} }" :data="data" class="flex items-center space-x-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <p>{{ $t('message.view') }}</p>
                                        </router-link>
                                    </div>
                                </portal>
                                <portal :to="data.id">
                                    <div :id="data.id" class="edit-drop z-30 fixed space-y-3 rounded shadow-lg p-4 w-max bg-white dark:bg-black100 text-base py-2">
                                        <router-link :to="{name:'package-booking-view', params:{id:data.id} }" :data="data" class="flex items-center space-x-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <p>View</p>
                                        </router-link>
                                    </div>
                                </portal>
                            </div>
                        </div>
                    </td>
                    </tr>
            </template>  
        </TableCompo>
         <TablePaginationLimit  :totalPage="totalPage" :rowPerPage="totalRowsPerPage" :limit="limit" @pageButtonValue="pagginationButtonClick" @nextEvent="pagginationButtonClick" @prevEvent="pagginationButtonClick"></TablePaginationLimit>
    
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, computed, Ref, onMounted, toRefs, onUnmounted, onBeforeUnmount } from 'vue'
import actionDropdown from '../../composable/actionDropdown';
import ActionModalVue from '../../../components/list/ActionModal.vue';
import AddModal from '../../../components/list/AddMoreModal.vue';
import PageHeader from '../../../components/list/PageHeader.vue';
import TableCompo from '../../../components/list/TableCompo.vue';
import TablePaggination from '../../../components/list/TablePaggination.vue';
import TableTitleColumn from '../../../components/list/TableTitleColumn.vue';
import TableDataComp from '../../../components/list/TableDataComp.vue';
import FilterModal from '../../../components/list/FilterModal.vue';
import { useStore } from 'vuex';
import PackageService from "../../../services/package";
import { PackageBookingListRequest } from '../../../types/package';
import 'vue3-toastify/dist/index.css';
import { toastrMsg } from "../../../utils/toastr";
import { routeGroupCheck } from "../../../utils/route-utils"
import Loader from '../../../components/comp/Loader.vue';
import TablePaginationLimit from '../../../components/list/TablePaginationLimit.vue';
import router from '@/router';

let listFilterData : PackageBookingListRequest={
        perPage:10,
        page:1,
}

export default defineComponent({
    components: { FilterModal, ActionModalVue, PageHeader, AddModal, TableCompo, TableTitleColumn, TablePaggination, TableDataComp, Loader,TablePaginationLimit},
   
    name: 'appraise-my-trade',
    setup(){
       const { actionModalID, actionButton, positionEditDrop, toggleActionDropdown } = actionDropdown();
        const store = useStore();
         const showModal = ref(false);
        const state = reactive(
            {
                isLoading:true,
                isFilterOpen:false,
                tableData:<any>[],
                filterForm:listFilterData,
                sortIconData : 0,
                activeHeader : '',
                carimage:<any>[],
                prevElm : '',
                userStatus: false,
                ListLength:0,
                roleList:{},
                totalPage:0,
                totalRowsPerPage:0,
                limit:0,
            }
        );


        const setTableData = ()=>{
            new PackageService().listOfBookingPackage(state.filterForm).then((response:any)=>{
                if(response !== undefined){
                    state.tableData = response.data.data
                    state.totalPage = response.data.totalPage
                    state.totalRowsPerPage = response.data.data.length
                    state.limit = response.data.perPage
                    
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
         function pagginationButtonClick(p:number){
            state.filterForm.page = p
            setTableData()
        }

        onBeforeUnmount(()=>{
            let routeData = routeGroupCheck();
            if (routeData.reset == "TRUE") {
            }
            setTableData
        })
          

        onMounted(()=>{
            setTableData();
            positionEditDrop();

            if(localStorage.getItem('fromRoute') && localStorage.getItem('fromRoute')=='create'){
                toastrMsg('User created successfully.');
            }
            setTimeout(() => {
              state.isLoading = false  
            }, 1000);
        })

        return {
            ...toRefs(state),setTableData,positionEditDrop,
            actionModalID, toggleActionDropdown, actionButton,showModal,pagginationButtonClick
            
        }

    }
  
})
</script>
