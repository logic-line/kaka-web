<template>
    <div class="overflow-hidden px-6 py-4">
        <div v-if="isLoading" class="h-[507px] pt-2 pr-3" >
           <Loader :isLoading="isLoading" />
         </div>
         <PageHeader 
            :search='true' 
            :searchInput="filterForm.SearchTerm"
            :filter='true'
            @update:searchInput="updateSearchValue"
            @enter:searchInput="setNewTableData"
            @search="getListBySearch" 
            @filter="openFilter"
             @resetSearch="resetSearchTerm" 
        :title="$t('message.notification-list')">
        </PageHeader>

        <!-- filter field start -->
        <FilterModal v-if="isFilterOpen" 
        @closeFilter="closeFilter" 
        @submitFilter="getListByFiltering"
        @resetFilter="resetFilterForm"
        :filterTitle="$t('message.filter-notification')">
            <template v-slot:body>
                <div>
                    <label class="checkbox-button cursor-pointer">
                        <input v-model="isReadCheck" type="checkbox" class="checkbox-button__input" id="choice1-1" name="choice1">
                        <span class="checkbox-button__control"></span>
                        <span class="checkbox-button__label text-black100 dark:text-white">Is Read</span>
                    </label>
                </div>
            </template>
        </FilterModal>
        <!-- filter field end -->
        
        <!-- table portal start -->

        <div v-for="data in tableData" v-show="data.ID==actionModalID" :key="data.ID">
            <portal-target :name="data.ID"></portal-target>
        </div>
        <!-- table portal end -->

        <TableCompo class="whitespace-nowrap" id="tableContainer"> 
            <template v-slot:header>
                <th class="sm:hidden"></th>
                <table-title-column :name="$t('message.title')" ></table-title-column>
                <table-title-column :name="$t('message.details')" ></table-title-column>
                <table-title-column :name="$t('message.is-read')" ></table-title-column>
                <table-title-column :name="$t('message.reference')" ></table-title-column>
                <table-title-column :name="$t('message.created-date')" ></table-title-column>
            </template>
            <template v-slot:body>
                <tr v-for="data in tableData" :key="data.ID" class="border-b border-secondary10 dark:bg-black100 bg-secondary10">
              
                    <td class="px-3 sm:px-6 py-3">
                        <Router-link :to="data.Link" @click="readNotification(data)" class="flex items-center justify-start space-x-3 dark:text-blue-500 text-blue-500 hover:underline font-medium">
                            <span>{{ data.Title }}</span>
                        </Router-link>
                    </td>
                    <!-- <table-data-comp :data="data.Title"></table-data-comp> -->
                    <table-data-comp :data="data.Details"></table-data-comp>
                    <table-data-comp :data="data.IsRead"></table-data-comp>
                    <td v-if="data.Reference">
                         <table-data-comp :data="data.Reference"></table-data-comp>
                    </td>
                    <td v-else>
                         <table-data-comp :data="'N/A'"></table-data-comp>
                    </td>
                     <td class="px-3 sm:px-6 py-3">
                        <div class="flex items-center justify-start space-x-3 dark:text-secondary text-black100 font-medium">
                            <span>{{ data.CreatedAt.split("T")[0] }}</span>
                        </div>
                    </td>
                </tr>
            </template>
        </TableCompo>
        <!-- <table-paggination 
            @updateLimit="updateLimit"
            @prev="getPrevData"
            @next="getNextData"
            :total="ListLength"
            :nextCursor="NextCursor"
            :prevCursor="PreviousCursor"/> -->
    </div>
    
</template>
<script lang="ts">
import actionDropdown from '../composable/actionDropdown';
import AddModal from '../../components/list/AddMoreModal.vue';
import PageHeader from '../../components/list/PageHeader.vue';
import Loader from '../../components/comp/Loader.vue';
import TableCompo from '../../components/list/TableCompo.vue';
import TablePaggination from '../../components/list/TablePaggination.vue';
import TableTitleColumn from '../../components/list/TableTitleColumn.vue';
import FilterModal from '../../components/list/FilterModal.vue'
import { useStore } from 'vuex';

import { defineComponent, ref, reactive, onMounted, toRefs} from 'vue';
import TableDataComp from '../../components/list/TableDataComp.vue';

import { ListFilterRequest ,UpdateNotification} from '../../types/notification';
import NotificationServices from "../../services/notification";
import { useI18n } from 'vue-i18n';
import 'vue3-toastify/dist/index.css';

let listFilterData:ListFilterRequest={
    SortBy: '',
    SortByColumn: '',
    SearchTerm: '',
    Status: '',
    StartDate: '',
    EndDate: '',
    IsRead : '',
}

export default defineComponent({
  components: { PageHeader, AddModal,Loader, TableCompo, TableTitleColumn, TablePaggination, TableDataComp, FilterModal },
    name: 'NotificationList',
 
    setup(){

        const { t } = useI18n();
        
        const { actionModalID, actionButton, positionEditDrop, toggleActionDropdown } = actionDropdown();

        const tableData = <any>ref([]);
        const userTableData = ref([]);

        const store = useStore();


        const state = reactive(
            {  
                isLoading:true,
                isModalOpen : false,
                isFilterOpen:false,
                filterForm:listFilterData,
                isReadCheck : false,
            }
        );
        function newRowCreate(e:any,data:any){
            e.target.closest('.expandButton').classList.toggle('isExpand')
            e.target.closest('.expandButton').children[0].classList.toggle('hidden')
            e.target.closest('.expandButton').children[1].classList.toggle('hidden')

            let newRow = document.createElement('tr')
            newRow.className = 'child-row bg-secondary dark:bg-secondary10 sm:hidden'

            let tableClosest = e.target.closest('td')

            if(e.target.closest('.expandButton').classList.contains('isExpand')){

                let status:any;
                let statusBg:any
                
                if(data.status == 1){
                    status = t('message.pending')
                    statusBg = 'bg-kakaPrimary'
                }else if(data.status == 2){
                    status = t('message.approved')
                    statusBg = 'bg-success'
                }
                else if(data.status == 3){
                    status = t('message.rejected')
                    statusBg = 'bg-warning'
                }

                newRow.innerHTML = `<td colspan='10' class="py-3 px-6 pl-12">
                                        <ul class="flex flex-wrap">
                                            <li class="pr-4 py-1 table-cell sm:hidden">
                                                <div class="flex items-center justify-start space-x-3 dark:text-secondary text-black100 font-medium"><span class="">{{data}}</span></div>
                                            </li>
                                        </ul>
                                    </td>`

                tableClosest.parentElement.insertAdjacentElement("afterEnd", newRow)

            }else{
                e.target.closest('tr').nextElementSibling.remove()
            }
        }

        const resetSearchTerm=()=>{
            state.filterForm.SearchTerm='';
            store.dispatch('setUserSrcTerm', '');
            setTableData();
        }
        const openFilter=()=>{
            state.isFilterOpen = true;
        }

        const closeFilter=()=>{
            state.isFilterOpen = false;
        }
        const isReadFilter=(e:any)=>{
            if (e.checked == true) {
                state.filterForm.IsRead = 'TRUE'
            }else{
                state.filterForm.IsRead = 'FALSE'
            }
        }

        
        const setTableData = ()=>{
            let payload = store.state.auth.auth;
            if(payload.accessToken != ""){
                new NotificationServices().listOfNotifications(state.filterForm).then((response:any)=>{
                     if(response !== undefined && response.Data!==undefined){
                        tableData.value  = response.Data.Notification
                        removeNewRow()
                    }
                })
            }
        }

        const getListByFiltering=()=>{
            if(state.isReadCheck == true){
                state.filterForm.IsRead = 'TRUE'
            }
            if(state.isReadCheck == false){
                state.filterForm.IsRead = 'FALSE'
            }
            setTableData();
            closeFilter();
        }

        const resetFilterForm=()=>{
            state.filterForm.SearchTerm = ''
            state.filterForm.SortBy = ''
            state.filterForm.SortByColumn = ''
            state.filterForm.IsRead = ''
            state.filterForm.Status = ''
            state.filterForm.StartDate = ''
            state.filterForm.EndDate = ''
            setTableData();
            state.isReadCheck = false
        }

        function removeNewRow(){
            let allChildRow = document.querySelectorAll('.child-row')
            let allExpandButton = document.querySelectorAll('.expandButton')
            allChildRow.forEach(el=>{
                el.remove()
            })
            allExpandButton.forEach(el=>{
                el.classList.remove('isExpand')
                el.children[0].classList.remove('hidden')
                el.children[1].classList.add('hidden')
            })
        }

        const updateSearchValue=(newValue:any)=>{
            state.filterForm.SearchTerm=newValue;
        }

        const setNewTableData=(newValue:any)=>{

            state.filterForm.SearchTerm=newValue;
            setTableData()
        }

        const getListBySearch=(ev:any)=>{
            state.filterForm.SearchTerm = ev.previousElementSibling.value
            setTableData();
        }

        const resetSearchInput = ()=>{
            state.filterForm.SearchTerm='';
            setTableData() 
        }
        function readNotification(e:any){ 
            if(e.IsRead == 'FALSE'){
                let payload: UpdateNotification = {
                  ID : e.ID,
                  IsRead : 'TRUE',
              };

              new NotificationServices().UpdateNotificationRequest(payload).then((response:any)=>{
                if(response !== undefined && response.Data!==undefined){
                    let authPayload = store.state.auth.auth;
                    if(authPayload.accessToken != ""){
                    store.dispatch('setUpdatedNotifications');
                    }
                  
                }
              }).catch((error)=>{

              });
              
            }
          }

        onMounted(()=>{
            setTableData()
            positionEditDrop()
            setTimeout(() => {
              state.isLoading = false  
            }, 1000);
        })

        return {
            ...toRefs(state),actionButton,tableData,actionModalID,
            setTableData, toggleActionDropdown,resetSearchInput,openFilter,closeFilter,getListBySearch,
            userTableData,resetFilterForm,newRowCreate,updateSearchValue,getListByFiltering,
            setNewTableData,resetSearchTerm,isReadFilter,readNotification
        }
    
    }
  
})
</script>
