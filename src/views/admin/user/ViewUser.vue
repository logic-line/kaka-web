<template>
    <div class="overflow-hidden px-6 py-4">
        <div v-if="isLoading" class="h-[507px] pt-2 pr-3" >
          <Loader :isLoading="isLoading" />
        </div>
        <PageHeader  
        :title="$t('message.view-user')">
            <template v-slot:body>
                <router-link to="/admin/users" class="flex items-center justify-center bg-kakaPrimary text-black100 dark:text-black100 py-2.5 px-8 w-full rounded-sm bor">
                    {{ $t('message.back-to-list') }}
                </router-link>
            </template>
        </PageHeader>
        <div class="row mt-6 2xl:mt-10">
                <div class="w-full lg:w-5/12 xl:w-4/12 2xl:w-1/4 px-4 order-1  mb-8">
                    <div class="bg-white border dark:border-none dark:bg-black90 dark:bg-opacity-10 rounded h-full">
                        <div class="py-5">
                            <div class="rounded-full w-40 h-40 2xl:w-56 2xl:h-56 p-4 bg-secondary mx-auto">
                                <img v-if="viewData.Image != ''" class="object-cover object-center rounded-full w-full h-full" :src="viewData.Image" alt="">
                                <img v-else class="object-cover object-center rounded-full w-full h-full" src="../../../assets/images/user.png" alt="">
                            </div>
                            <div class="w-full sm:w-10/12 mx-auto px-3">
                                <div class="mt-6 text-center">
                                    <h2 class="text-black100 dark:text-white font-semibold font-24">{{viewData.FirstName}} {{viewData.LastName}}</h2> 
                                </div>
                            </div>
                        </div>
                        <div class="w-full pt-2">
                            <ul>
                                <li class="">
                                    <router-link :to="{name:'admin-user-wallets', params: { id: userId } }" class="flex items-center justify-between px-4 py-3 border dark:border-secondary10">
                                        <p>{{ $t('message.wallet') }}</p>
                                        <div class="w-6 h-6 rounded-md dark:text-black bg-kakaPrimary text-[10px] flex items-center justify-center">
                                            {{ walletCount }}
                                        </div>
                                    </router-link>
                                </li>
                                <li class="">
                                    <router-link :to="{name:'admin-user-order-list', params: { id: userId } }" class="flex items-center justify-between px-4 py-3 border dark:border-secondary10">
                                        <p>{{ $t('message.open-orders') }}</p>
                                        <div class="w-6 h-6 rounded-md dark:text-black bg-kakaPrimary text-[10px] flex items-center justify-center">
                                            {{ orderCount }}
                                        </div>
                                    </router-link>
                                </li>
                                <li class="">
                                    <router-link :to="{name:'admin-user-trade-history', params: { id: userId } }" class="flex items-center justify-between px-4 py-3 border dark:border-secondary10">
                                        <p>{{ $t('message.trade-history') }}</p>
                                        <div class="w-6 h-6 rounded-md dark:text-black bg-kakaPrimary text-[10px] flex items-center justify-center">
                                            {{ tradeCount }}
                                        </div>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="w-full lg:w-7/12 xl:w-8/12 2xl:w-3/4 px-4 order-2 mb-8">
                    <div class="h-full bg-black90 bg-opacity-10 px-6 rounded-b">
                        <div class="row">
                            <div class="sm:w-1/3 w-full px-4">
                                <div class="space-y-2 py-5">
                                    <div class="ces-label">{{ $t('message.email') }}</div>
                                    <div class="font-16 text-black100 dark:text-secondary">{{ viewData.Email }}</div>
                                </div>
                            </div>
                            <div class="sm:w-1/3 w-full px-4">
                                <div class="space-y-2 py-5">
                                    <div class="ces-label">{{ $t('message.phone-number') }}</div>
                                    <div class="font-16 text-black100 dark:text-secondary">{{ viewData.PhoneNumber }}</div>
                                </div>
                            </div>
                            <div class="sm:w-1/3 w-full px-4">
                                <div class="space-y-2 py-5">
                                    <div class="ces-label">{{ $t('message.status') }}</div>
                                    <div v-if="viewData.Status=='ACTIVE'" class="font-16  uppercase text-success">{{ $t('message.active') }}</div>
                                    <div v-else class="font-16 uppercase text-warning">{{ $t('message.inactive') }}  </div>
                                </div>
                            </div>
                            <div class="sm:w-1/3 w-full px-4">
                                <div class="space-y-2 py-5">
                                    <div class="ces-label">{{ $t('message.role') }}</div>
                                    <div class="font-16 text-black100 dark:text-secondary">{{ viewData.RoleName }}</div>
                                </div>
                            </div>
                             <div class="sm:w-1/3 w-full px-4">
                                <div class="space-y-2 py-5">
                                    <div class="ces-label">{{ $t('message.is-email-verified') }}</div>
                                    <div v-if="viewData.IsEmailVerified=='EMAIL_TRUE'" class="font-16 text-black100 dark:text-secondary">{{ $t('message.yes') }}</div>
                                    <div v-else class="font-16 text-black100 dark:text-secondary">{{ $t('message.no') }}</div>
                                </div>
                            </div>
                            <div class="sm:w-1/3 w-full px-4">
                                <div class="space-y-2 py-5">
                                    <div class="ces-label">{{ $t('message.is-phone-verified') }}</div>
                                    <div v-if="viewData.IsPhoneVerified=='VERIFIED_TRUE'" class="font-16 text-black100 dark:text-secondary">{{ $t('message.yes') }}</div>
                                    <div v-else class="font-16 text-black100 dark:text-secondary">{{ $t('message.no') }}</div>
                                </div>
                            </div>
                            <div class="sm:w-1/3 w-full px-4">
                                <div class="space-y-2 py-5">
                                    <div class="ces-label">{{ $t('message.kyc-level') }}</div>
                                    <div v-if="kycStatus == StatusMap.PENDING.stringStatus" class="font-16 text-black100 dark:text-secondary">{{ StatusMap.PENDING.stringStatus}}</div>
                                    <div v-else-if="kycStatus == StatusMap.APPROVED.stringStatus" class="font-16 text-black100 dark:text-secondary">{{StatusMap.APPROVED.stringStatus}}</div>
                                    <div v-else-if="kycStatus == StatusMap.REJECTED.stringStatus" class="font-16 text-black100 dark:text-secondary">{{StatusMap.REJECTED.stringStatus}}</div>
                                    <div v-else class="font-16 text-black100 dark:text-secondary ces-label">{{ $t('message.unknown') }}</div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, computed, Ref, onMounted, toRefs } from 'vue'

import PageHeader from '../../../components/list/PageHeader.vue';
import { UpdateUser } from '../../../types/user';
import UserService from "../../../services/user";
import { useRoute, useRouter } from 'vue-router';
import { toastrMsg } from "../../../utils/toastr"
import AdminDashboardService from "../../../services/admindashboard/admindashboardService";
import { useI18n } from 'vue-i18n';
import Loader from '../../../components/comp/Loader.vue';

let updateForm:UpdateUser= {
    id: "",
    status:0,
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    address: "",
    roleid: "",
}

export default defineComponent({
    components: { PageHeader, Loader },
    name: 'InviteUser',
    setup(){
        const route = useRoute()
        const router = useRouter();
        const { t } = useI18n();
        const state = reactive(
            {
                isLoading:true,
                roleList:<any>[],
                viewData:{},
                kycStatus:'',
                walletCount:0,
                orderCount:0,
                tradeCount:0,
                userId:computed(()=>route.params.id.toString()),
                StatusMap: {
                STATUS_UNKNOWN: {
                    status: 0,
                    name: t('message.open'),
                    stringStatus: 'STATUS_UNKNOWN'
                },
                PENDING: {
                    status: 1,
                    name: t('message.open'),
                    stringStatus: 'PENDING'
                },
                APPROVED: {
                    status: 2,
                    name: t('message.open'),
                    stringStatus: 'APPROVED'
                },
                REJECTED: {
                    status: 3,
                    name: t('message.open'),
                    stringStatus: 'REJECTED'
                },
            },
            }
        );

        const GetUser=()=>{
            new UserService().getUserbyId(state.userId).then((response:any)=>{
                if(response !== undefined && response.Data!==undefined){
                   state.viewData = response.Data.User
                }
            }).catch((error)=>{});
            
        }

        const GetUserCommon=()=>{
            
            new AdminDashboardService().GetUserCommon(state.userId).then((response:any)=>{
                if(response !== undefined && response.Data!==undefined){
                   state.kycStatus = response.Data.UserCommon.KycStatus
                   state.walletCount = response.Data.UserCommon.WalletCount
                   state.orderCount = response.Data.UserCommon.OrderCount
                   state.tradeCount = response.Data.UserCommon.TradeCount
                }
            }).catch((error)=>{});
            
        }  
        
        onMounted(()=>{
            GetUser();
            GetUserCommon()

            if(localStorage.getItem('fromRoute') && localStorage.getItem('fromRoute')=='edit'){
                toastrMsg('User edit successful.');
            }
            setTimeout(() => {
              state.isLoading = false  
            }, 1000);
        })

        return {
            ...toRefs(state),

        }

    }
  
})
</script>
