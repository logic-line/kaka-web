<template>
    <div class="overflow-hidden px-6 py-4">
        <div v-if="isLoading" class="h-[507px] pt-2 pr-3" >
          <Loader :isLoading="isLoading" />
        </div>
        <PageHeader  
            :search='true' 
            :searchInput="filterForm.searchterm"
            :filter='true'

            @enter:searchInput="setNewTableData"
            @search="getListBySearch" 
            @resetSearch="resetSearchTerm"
            @filter="openFilter"  
            :title="$t('message.user-list')">
            <template v-slot:body>
                <router-link to="/admin/users/invite" class="flex items-center justify-center bg-kakaPrimary text-black100 dark:text-black100 py-2.5 px-8 w-full rounded-sm">
                    {{ $t('message.add-more') }}
                </router-link>
            </template>
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
                            <option v-for="item in roleList" :key="item.ID" :value="item.ID">
                                {{ item.Name }}
                            </option>
                        </select>
                    </div>
                </div>
            </template>
        </FilterModal>
        <!------------------ filter modal END --------------------->
        <div v-for="data in tableData" v-show="data.ID==actionModalID" :key="data.ID">
            <portal-target :name="data.ID"></portal-target>
        </div>

        <TableCompo id="tableContainer"> 
            <template v-slot:header>
                <th class="lg:hidden"></th>
                <table-title-column @sortIconClick="sortIconClickFun($event, 'first_name')" :header="activeHeader" :sortoption="true" :sortValue="sortIconData" :name="$t('message.first-name')"  ></table-title-column>
                <table-title-column  :name="$t('message.last-name')"  ></table-title-column>
                <table-title-column class="hidden lg:table-cell" :name="$t('message.email')" ></table-title-column>
                <table-title-column class="hidden lg:table-cell"  :name="$t('message.phone-number')"  ></table-title-column>
                <table-title-column class="hidden lg:table-cell" :name="$t('message.role')"  ></table-title-column>
                <table-title-column class="hidden lg:table-cell" :name="$t('message.active-status')"  ></table-title-column>
                <th class="text-sm dark:text-secondary font-medium text-black100 cursor-pointer px-6 py-4">
                    <div class="flex items-center justify-end space-x-1.5">
                        <span>{{ $t('message.action') }}</span>
                    </div>
                </th>
            </template>
            <template v-slot:body>
                <tr v-for="data in tableData" :key="data.ID" class="border-b border-secondary10 dark:bg-black100 bg-secondary10">
                    <td class="lg:hidden">
                       <div @click="newRowCreate($event,data)" class="expandButton inline-block">
                            <div class="flex justify-center items-center bg-success w-6 h-6 text-white cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>                              
                            </div>
                            <div class="hidden flex justify-center items-center bg-warning w-6 h-6 text-white cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                                </svg>
                            </div>
                       </div>
                    </td>
                    <table-data-comp :data="data.FirstName"></table-data-comp>
                    <table-data-comp :data="data.LastName"></table-data-comp>
                    <table-data-comp class="hidden lg:table-cell" :data="data.Email"></table-data-comp>
                    <table-data-comp class="hidden lg:table-cell" :data="data.PhoneNumber"></table-data-comp>
                    <table-data-comp class="hidden lg:table-cell" :data="data.RoleName"></table-data-comp>
                    <td class="px-3 sm:px-6 py-3">
                        <div class="flex items-center">
                            <label :for="'toggleA'+data.ID" class="flex items-center w-6 h-6">
                                <div class="relative">
                                    <input :checked="data.Status=='ACTIVE'? true:false" @change="changeStatus(data.Status, data.ID)" type="checkbox" :id="'toggleA'+data.ID" class="sr-only">
                                    <div class="block bg-gray-400 w-14 h-8 rounded-full toggle-switch-bg"></div>
                                    <div class="toggle-dot cursor-pointer absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                                </div>
                            </label>
                        </div>
                    </td>
                    <td class="px-6 py-3">
                        <div class="flex justify-end">
                            <div class="relative">
                                <button @click="toggleActionDropdown(data.ID,$event)" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                                <portal :to="data.ID">
                                    <div :id="data.ID" class="edit-drop z-30 fixed space-y-3 rounded shadow-lg p-4 w-max bg-white dark:bg-black100 text-base py-2">
                                        <router-link :to="{ name:'edit-user', params: { id: data.ID } }" class="flex items-center space-x-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                            <p>{{ $t('message.edit') }}</p>
                                        </router-link>
                                        <router-link :to="{ name:'view-user', params: { id: data.ID } }" class="flex items-center space-x-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            <p>{{ $t('message.view') }}</p>
                                        </router-link>
                                        <router-link :to="{name:'individual-activities-list', params: { id: data.ID } }" class="flex items-center space-x-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" version="1.0" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                                                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                                                <path d="M3015 4814 c-33 -8 -94 -31 -135 -52 -101 -49 -231 -177 -282 -277 -64 -126 -73 -165 -73 -315 1 -126 3 -140 32 -216 73 -193 212 -333 398 -400 81 -30 212 -45 293 -35 l62 7 0 -476 c0 -449 1 -478 18 -493 16 -15 49 -17 249 -17 287 0 283 -3 243 136 -21 73 20 163 91 199 40 21 122 19 169 -5 77 -39 112 -146 75 -233 -19 -47 -19 -53 5 -77 19 -19 33 -20 248 -20 181 0 232 3 248 14 18 13 19 30 22 235 l3 221 27 0 c15 0 50 11 77 24 188 87 226 334 73 471 -45 40 -121 75 -165 75 -10 0 -13 31 -13 140 0 136 -1 142 -25 165 l-24 25 -425 0 -424 0 18 48 c43 112 48 253 14 387 -57 220 -253 413 -479 470 -74 19 -240 18 -320 -1z m300 -119 c271 -71 447 -349 392 -620 -23 -113 -68 -196 -152 -280 -243 -243 -638 -202 -829 87 -51 77 -77 159 -83 263 -10 164 37 286 157 406 77 78 144 118 237 144 66 18 207 18 278 0z m1245 -1060 c3 -82 9 -156 13 -162 5 -8 31 -13 67 -13 67 0 105 -12 138 -43 55 -51 69 -133 37 -201 -27 -57 -68 -80 -150 -84 -109 -6 -105 3 -105 -254 l0 -218 -135 0 -135 0 0 55 c0 206 -203 347 -403 279 -107 -36 -189 -152 -191 -270 l-1 -64 -132 0 -133 0 0 453 0 452 68 35 c45 23 91 59 142 111 l75 77 420 -1 420 -2 5 -150z"/>
                                                <path d="M3263 4248 l-153 -152 -89 87 c-48 48 -96 87 -105 87 -22 0 -66 -44 -66 -66 0 -9 53 -70 117 -136 89 -90 123 -118 143 -118 19 0 66 41 208 183 192 192 205 213 164 250 -39 36 -59 23 -219 -135z"/>
                                                <path d="M1637 3719 l-27 -20 0 -148 c0 -164 8 -191 59 -191 54 0 61 21 61 186 0 157 -5 176 -46 188 -13 4 -30 -1 -47 -15z"/>
                                                <path d="M907 3522 c-26 -29 -21 -48 39 -156 84 -149 99 -168 137 -164 22 2 36 11 47 30 17 31 16 32 -89 210 -49 82 -60 93 -87 96 -20 2 -36 -3 -47 -16z"/>
                                                <path d="M2357 3525 c-29 -29 -147 -245 -147 -269 0 -47 55 -73 92 -43 30 24 148 243 148 275 0 47 -60 71 -93 37z"/>
                                                <path d="M1499 3204 c-343 -62 -641 -322 -747 -654 -35 -111 -45 -180 -45 -320 1 -271 69 -448 261 -683 179 -218 210 -260 239 -320 48 -99 53 -141 53 -482 0 -197 4 -324 11 -342 5 -15 22 -41 37 -56 53 -56 57 -57 369 -57 323 0 321 0 379 76 l29 37 5 371 c5 355 6 373 27 418 35 76 84 145 202 286 134 161 182 230 232 337 102 217 116 504 37 742 -150 454 -619 733 -1089 647z m323 -118 c324 -64 568 -285 664 -601 25 -81 27 -106 28 -245 1 -174 -12 -242 -69 -366 -47 -103 -87 -162 -227 -330 -135 -164 -189 -245 -218 -327 l-18 -52 -51 -3 -51 -3 0 445 0 446 63 0 c172 0 279 92 278 239 -1 203 -243 308 -390 168 -73 -70 -71 -43 -71 -704 l0 -593 -85 0 -85 0 0 593 c0 555 -2 594 -19 632 -67 144 -256 181 -369 72 -52 -49 -72 -97 -72 -168 0 -149 105 -239 277 -239 l63 0 0 -445 0 -445 -55 0 c-40 0 -55 4 -55 14 0 30 -92 195 -147 262 -32 39 -98 120 -146 180 -185 228 -240 371 -239 624 1 155 20 248 76 367 50 105 104 179 189 259 158 151 352 230 574 233 45 0 114 -5 155 -13z m-386 -720 c33 -33 34 -36 34 -115 l0 -81 -60 0 c-109 0 -160 38 -160 118 0 37 6 50 34 78 28 28 42 34 76 34 34 0 48 -6 76 -34z m630 0 c28 -28 34 -41 34 -78 0 -80 -51 -118 -160 -118 l-60 0 0 81 c0 79 1 82 34 115 28 28 42 34 76 34 34 0 48 -6 76 -34z m-96 -1456 l0 -130 -295 0 -295 0 0 130 0 130 295 0 295 0 0 -130z m0 -357 c0 -85 -3 -110 -17 -125 -15 -17 -37 -18 -276 -18 -228 0 -263 2 -279 17 -15 14 -18 32 -18 125 l0 108 295 0 295 0 0 -107z"/>
                                                <path d="M377 2992 c-20 -22 -22 -52 -4 -74 14 -18 255 -158 272 -158 6 0 21 7 33 16 22 15 29 57 14 80 -13 21 -251 154 -275 154 -13 0 -31 -8 -40 -18z"/>
                                                <path d="M2790 2944 c-63 -37 -123 -73 -132 -82 -37 -32 -12 -96 38 -95 27 0 224 105 267 141 24 21 23 78 -2 92 -34 18 -54 11 -171 -56z"/>
                                                <path d="M3927 2330 c-122 -31 -211 -130 -232 -257 l-7 -43 -167 0 c-135 0 -171 -3 -189 -16 l-22 -15 0 -650 c0 -636 0 -649 20 -669 19 -19 33 -20 243 -20 288 0 286 -1 247 138 -33 113 78 235 196 217 119 -18 184 -139 138 -256 -16 -39 -16 -42 3 -67 l20 -27 231 -3 230 -2 21 26 c20 25 21 39 21 255 0 125 -4 239 -10 253 -12 31 -50 42 -90 26 -41 -17 -121 -15 -156 3 -62 32 -95 86 -96 156 0 62 25 114 70 149 31 23 44 27 101 26 36 0 85 -4 107 -8 69 -14 74 2 74 232 0 188 -5 225 -34 244 -6 4 -88 8 -182 8 l-171 0 -6 49 c-20 168 -197 291 -360 251z m126 -124 c82 -30 119 -92 115 -198 -3 -99 -5 -98 214 -98 l178 0 0 -115 0 -115 -63 0 c-157 0 -288 -131 -288 -290 -1 -174 126 -303 298 -303 l53 0 0 -153 0 -154 -134 0 -133 0 -5 73 c-11 166 -130 281 -292 281 -167 0 -298 -126 -300 -291 l-1 -63 -132 0 -133 0 0 565 0 565 178 0 c166 0 180 1 197 20 14 16 16 29 11 66 -12 90 30 169 109 205 47 22 77 23 128 5z"/>
                                                <path d="M187 2272 c-21 -23 -22 -66 -1 -86 13 -13 43 -16 168 -16 135 0 155 2 169 18 22 24 21 65 -1 85 -16 14 -43 17 -169 17 -133 0 -152 -2 -166 -18z"/>
                                                <path d="M2820 2270 c-25 -25 -26 -62 -2 -83 16 -14 43 -17 170 -17 139 0 154 2 172 20 11 11 20 29 20 40 0 11 -9 29 -20 40 -18 18 -33 20 -170 20 -137 0 -152 -2 -170 -20z"/>
                                                <path d="M630 1692 c-29 -9 -245 -135 -257 -151 -30 -36 -1 -91 47 -91 25 0 247 123 268 149 35 43 -6 110 -58 93z"/>
                                                <path d="M2666 1679 c-32 -25 -33 -59 -3 -86 41 -37 239 -143 266 -143 15 0 32 5 39 12 16 16 15 73 -2 87 -18 15 -259 151 -267 151 -3 0 -18 -9 -33 -21z"/>
                                                </g>
                                            </svg>
                                            <p>{{ $t('message.activities') }}</p>
                                        </router-link>
                                        <router-link :to="{name:'admin-user-wallets', params: { id: data.ID } }" class="flex items-center space-x-3">
                                           <svg class="w-5 h-5" version="1.1" id="_x32_" stroke-width="2" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="1"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path class="st0" d="M360,343.266c-6.5,0-11.75,5.25-11.75,11.734s5.25,11.75,11.75,11.75c6.469,0,11.734-5.266,11.734-11.75 S366.469,343.266,360,343.266z"></path> <path class="st0" d="M475.531,306.203h-3.781v-55.297c0-14.063-4.75-27-12.672-37.375L512,179.438l-4.172-6.813L402.656,1.172 L180.938,137.141H94c-50.531,0-91.594,39.875-93.797,89.828l-0.016,0.109L0,243.516v35.719v137.594c0,51.922,42.078,93.984,94,94 h318.25c34.109-0.016,61.75-27.656,61.75-61.766v-45.266h1.531c9.672-0.016,17.5-7.828,17.516-17.5v-62.594 C493.031,314.031,485.219,306.203,475.531,306.203z M397.344,23.156l92.688,151l-43.781,26.828 c-4.5-3.281-9.484-5.953-14.797-7.938l12.516-7.672c-4.656-14.594-0.484-30.797,10.906-41.156l-46.688-76.141 c-14.438,5.375-30.719,1.781-41.641-8.984L154.469,189.141h-27.688L397.344,23.156z M393.5,146.625 c-6.906,4.188-15.875,2.016-20.125-4.891c-4.188-6.813-2.016-15.875,4.813-20.047c6.891-4.266,15.969-2.094,20.125,4.813 C402.563,133.391,400.406,142.391,393.5,146.625z M301.563,153.938l-1.609-0.641c0,0-5.531-0.656-9.625,0.563 c-2.484,0.719-4.984,1.672-7.453,2.875l-4.422-7.141l-10.109,6.188l4.5,7.375c-1.047,0.875-2.094,1.766-2.969,2.734 c-2.094,2.328-3.688,4.813-4.734,7.531c-1.047,2.734-1.438,5.469-1.203,8.344c0.203,2.469,1.078,4.922,2.391,7.375h-31.984 c0.063-20.641,10.359-40.781,29.266-52.375c29.047-17.813,67.078-8.75,84.797,20.297c6.172,10.031,9.047,21.125,9.078,32.078 h-30.188c-0.484-1.203-1-2.391-1.734-3.594c-3.063-5.063-6.906-7.953-11.563-8.672c-4.656-0.797-10.031,0.406-16.297,3.453 l-8.422,4.25c-3.047,1.438-5.453,2.016-7.297,1.688s-3.359-1.453-4.484-3.375c-1.375-2.156-1.609-4.484-0.719-6.813 c0.797-2.406,3.031-4.656,6.484-6.828c2.734-1.672,5.453-2.891,8.344-3.766c2.813-0.875,6.828-0.563,6.828-0.563 c0.875-0.078,1.594-0.719,1.766-1.531l1.844-7.703L301.563,153.938z M457.969,449.063c-0.016,12.641-5.109,24.031-13.391,32.328 c-8.297,8.281-19.672,13.375-32.328,13.391H94c-21.547-0.016-40.984-8.719-55.125-22.828 c-14.125-14.141-22.813-33.578-22.828-55.125V279.234v-35.563l0.203-16.047c1.828-41.406,35.906-74.453,77.75-74.438h60.781 l-58.563,35.953l-23.422,0.016v16.047l337.359-0.016c12.578,0.063,23.891,5.141,32.156,13.391 c8.281,8.297,13.391,19.688,13.391,32.328v55.297H354.359c-13.484-0.016-25.703,5.469-34.516,14.297l-0.016,0.016 c-8.813,8.813-14.281,21.016-14.281,34.484s5.469,25.672,14.266,34.5l0.063,0.031l-0.031-0.016 c8.813,8.813,21.031,14.297,34.516,14.281h103.609V449.063z M477,386.297c0,0.781-0.656,1.453-1.469,1.453H354.359 c-9.141-0.016-17.125-3.609-23.156-9.578h-0.016c-5.969-6.031-9.578-14.047-9.594-23.172c0.016-9.109,3.625-17.141,9.594-23.156 c6.031-5.969,14.031-9.578,23.172-9.594h121.172c0.813,0,1.469,0.672,1.469,1.453V386.297z"></path> </g> </g></svg>
                                            <p>{{ $t('message.view-walles') }}</p>
                                        </router-link>
                                        <router-link :to="{name:'admin-user-order-list', params: { id: data.ID } }" class="flex items-center space-x-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" version="1.0" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                                                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                                                <path d="M2285 4849 c-328 -43 -677 -166 -949 -338 -293 -183 -579 -474 -746 -758 -167 -282 -275 -595 -315 -912 -24 -185 -17 -503 15 -681 67 -379 235 -754 463 -1035 42 -51 60 -95 40 -95 -5 0 -33 7 -63 15 -30 8 -69 15 -86 15 -39 0 -73 -35 -81 -83 -5 -31 -1 -40 23 -65 25 -24 66 -38 288 -96 143 -38 273 -69 290 -68 39 1 76 42 76 84 0 42 -128 527 -146 556 -45 70 -164 36 -164 -47 0 -20 4 -50 8 -66 10 -35 6 -55 -12 -55 -7 0 -36 32 -65 71 -380 509 -512 1174 -356 1790 90 353 271 679 525 943 652 678 1646 847 2492 425 54 -27 108 -49 121 -49 31 0 74 43 82 82 10 45 -18 76 -121 130 -208 110 -500 201 -747 233 -130 16 -455 19 -572 4z"/>
                                                <path d="M3905 4345 c-16 -15 -25 -35 -25 -56 0 -43 127 -528 146 -557 31 -48 102 -52 144 -7 20 21 22 32 17 77 -3 29 -8 61 -12 70 -5 12 -1 20 10 24 21 8 41 -15 139 -161 165 -244 276 -524 331 -830 22 -123 31 -442 16 -575 -87 -756 -563 -1407 -1248 -1709 -298 -131 -605 -190 -932 -178 -306 11 -569 74 -840 203 -75 35 -103 44 -128 39 -59 -11 -91 -83 -62 -137 16 -29 211 -120 372 -173 271 -89 491 -120 792 -112 204 6 330 22 503 66 890 229 1551 952 1708 1871 25 147 30 486 10 640 -58 438 -209 801 -480 1153 -68 89 -65 103 18 81 28 -8 65 -14 82 -14 40 0 81 32 89 69 8 36 -17 88 -48 101 -43 19 -517 140 -547 140 -19 0 -40 -9 -55 -25z"/>
                                                <path d="M1970 3434 c-462 -162 -590 -210 -608 -230 l-22 -26 2 -624 3 -624 25 -23 c18 -17 198 -84 607 -227 l581 -202 104 35 c280 95 1027 360 1058 375 19 9 40 28 47 42 10 19 12 163 10 642 -2 609 -2 618 -23 638 -12 13 -167 72 -395 151 -431 151 -802 279 -803 278 -1 0 -264 -92 -586 -205z m724 -36 c104 -38 139 -58 124 -73 -2 -3 -183 -67 -401 -143 l-396 -139 -131 45 c-100 34 -130 48 -130 62 0 14 78 45 388 153 213 75 396 136 407 137 11 0 73 -19 139 -42z m568 -194 c70 -26 98 -41 98 -53 0 -13 -87 -47 -393 -154 -216 -75 -402 -137 -412 -136 -11 0 -60 15 -110 33 -68 24 -90 36 -90 50 0 15 72 44 380 156 209 76 391 139 404 139 14 1 69 -15 123 -35z m-1557 -247 l160 -54 5 -239 c3 -131 9 -247 14 -257 9 -20 56 -47 81 -47 32 0 73 30 84 61 6 19 11 107 11 215 0 169 1 184 18 184 9 0 99 -28 200 -62 l182 -62 0 -493 c0 -369 -3 -493 -12 -493 -6 0 -140 45 -297 101 -157 55 -358 126 -446 157 -88 30 -166 60 -172 65 -10 7 -13 117 -13 487 0 262 3 480 7 483 10 10 6 11 178 -46z m1893 -432 c1 -263 -1 -482 -6 -487 -15 -15 -917 -328 -930 -323 -10 3 -12 107 -10 491 l3 487 195 68 c107 37 312 108 455 158 143 50 267 89 275 88 13 -2 15 -65 18 -482z"/>
                                                <path d="M3205 2240 c-172 -63 -205 -86 -205 -141 0 -39 48 -89 85 -89 21 0 240 73 348 115 22 9 47 56 47 89 0 14 -10 37 -22 51 -39 44 -75 40 -253 -25z"/>
                                                </g>
                                            </svg>
                                            <p>{{ $t('message.view-active-orders') }}</p>
                                        </router-link>
                                        <router-link :to="{name:'admin-user-trade-history', params: { id: data.ID } }" class="flex items-center space-x-3">
                                            <svg class="h-5 w-5" fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32.68 32.68" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.24,8.591h0.691C17.915,8.189,17.906,7.738,17.9,7.24h-0.859l0.199-1.351h0.691c0.098-1.335,0.424-2.238,0.981-2.71 c0.67-0.568,2.026-0.852,4.075-0.852c1.57,0,2.615,0.233,3.137,0.7c0.479,0.428,0.738,1.361,0.788,2.798l0.008,0.249h-2.09V5.793 c0-0.772-0.188-1.262-0.562-1.471c-0.254-0.139-0.818-0.209-1.697-0.209c-1.181,0-1.899,0.158-2.162,0.474 c-0.166,0.198-0.278,0.632-0.338,1.303h3.787l-0.201,1.351h-3.644v0.161c0,0.402,0.005,0.798,0.017,1.19h3.426l-0.2,1.351h-3.151 c0.06,0.595,0.146,0.992,0.267,1.19c0.229,0.386,0.93,0.579,2.099,0.579c1.04,0,1.712-0.107,2.02-0.322 c0.326-0.23,0.479-0.702,0.457-1.415l-0.017-0.49h2.093v0.378c0,1.607-0.363,2.645-1.086,3.111 c-0.537,0.349-1.688,0.523-3.449,0.523c-2.06,0-3.338-0.354-3.836-1.062c-0.289-0.413-0.496-1.243-0.619-2.493h-0.988L17.24,8.591z M7.657,28.107c0.354-0.222,0.576-0.464,0.666-0.722l0.111-0.771l-0.008-0.57v-0.356h2.938V24.17H8.426v-1.777 c0-0.73,0.118-1.205,0.354-1.426c0.236-0.219,0.75-0.33,1.544-0.33c0.698,0,1.149,0.096,1.354,0.287 c0.205,0.189,0.306,0.609,0.306,1.262l0.008,0.23h2.056l0.008-0.533c0-1.186-0.265-1.982-0.794-2.394 c-0.529-0.409-1.553-0.614-3.072-0.614c-2.217,0-3.452,0.655-3.706,1.969l-0.111,1.279v0.459v1.588H5.04v1.516h1.333v0.699 c0,1.101-0.344,1.691-1.032,1.777v1.668h8.803v-1.707L7.66,28.163v-0.057L7.657,28.107L7.657,28.107z M5.34,16.352 c0-6.066,4.935-11,11-11v-3c-7.72,0-14,6.281-14,14H0l3.84,5.225l3.839-5.225H5.34z M28.84,11.128l-3.839,5.225h2.339 c0,6.065-4.936,11-11,11v3c7.721,0,14-6.281,14-14h2.34L28.84,11.128z"></path> </g> </g></svg>
                                            <p>{{ $t('message.view-trading-history') }}</p>
                                        </router-link>
                                    </div>
                                </portal>
                            </div>
                        </div>
                    </td>
                    </tr>
            </template>  
        </TableCompo>
        
        <table-paggination 
            @updateLimit="updateLimit"
            @prev="getPrevData"
            @next="getNextData"
            :total="ListLength"
            :perPage="tableData.length"
            :nextCursor="NextCursor"
            :prevCursor="PreviousCursor"
        />
    
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
import { UserListFilterRequest, UpdateUserStatus } from '../../../types/user';
import UserService from "../../../services/user";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { toastrMsg } from "../../../utils/toastr";
import { routeGroupCheck } from "../../../utils/route-utils"
import Loader from '../../../components/comp/Loader.vue';

let listFilterData : UserListFilterRequest={
    searchterm: "",
    startdate: "",
    enddate: "",
    phonenumber: "",
    roleid: "",
    sortbycolumn: "",
    sortby: "",
    status: "",
    cursor: "",
    limit: 10,
    cursortype:'CURSOR_TYPE_UNKNOWN'
}

export default defineComponent({
    components: {FilterModal,  ActionModalVue, PageHeader, AddModal, TableCompo, TableTitleColumn, TablePaggination, TableDataComp, Loader },
    name: 'UserListComp',
    setup(){
        const { actionModalID, actionButton, positionEditDrop, toggleActionDropdown } = actionDropdown();
        const store = useStore();
        const state = reactive(
            {
                isLoading:true,
                isFilterOpen:false,
                tableData:<any>[],
                filterForm:listFilterData,
                sortIconData : 0,
                activeHeader : '',
                prevElm : '',
                userStatus: false,
                NextCursor:'',
                PreviousCursor:'',
                ListLength:0,
                roleList:{}
            }
        );

        let resCol = ref(8)

        function controlColspan(){
            if(window.matchMedia("(max-width: 768px)").matches){
                resCol.value = 5
            }
            else if(window.matchMedia("(max-width: 1280px)").matches){
                resCol.value = 7
            }else{
                resCol.value = 8
            }
        }
        function newRowCreate(e:any,data:any){
            e.target.closest('.expandButton').classList.toggle('isExpand')
            e.target.closest('.expandButton').children[0].classList.toggle('hidden')
            e.target.closest('.expandButton').children[1].classList.toggle('hidden')

            let newRow:any;
            newRow = document.createElement('tr')
            newRow.className = 'child-row bg-secondary lg:hidden'

            let tableClosest = e.target.closest('td')

            if(e.target.closest('.expandButton').classList.contains('isExpand')){

                newRow.innerHTML = `<td colspan='${resCol.value}' class="py-3 px-6">
                        <ul class="flex flex-wrap">
                            <li class="pr-4 py-1 table-cell">
                                <span class="capitalize font-semibold">Email:</span><span class="ml-2">${data.Email}</span>
                            </li>
                            <li class="pr-4 py-1 table-cell">
                                <span class="capitalize font-semibold">Last Name:</span><span class="ml-2">${data.LastName}</span>
                            </li> 
                            <li class="pr-4 py-1 table-cell">
                                <span class="capitalize font-semibold">Phone Number:</span><span class="ml-2">${data.PhoneNumber}</span>
                            </li>
                        </ul>
                    </td>`

                tableClosest.parentElement.insertAdjacentElement("afterEnd", newRow)

            }else{
                e.target.closest('tr').nextElementSibling.remove()
            }
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
        onUnmounted(()=>{
            window.removeEventListener('resize', controlColspan);
        })
        const toggleModal=()=>{
            actionModalID.value='';
        };
        const openFilter=()=>{
            state.isFilterOpen = true;
        }

        const closeFilter=()=>{
            state.isFilterOpen = false;
        }

        const setTableData = ()=>{
            new UserService().listOfUser(state.filterForm).then((response:any)=>{
                if(response !== undefined && response.Data!==undefined){
                    state.tableData=response.Data.User;
                    state.NextCursor=response.Data.NextCursor;
                    state.PreviousCursor=response.Data.PreviousCursor;
                    state.ListLength=response.Data.TotalPages;
                    
                }
            }).catch((error)=>{});
        }
        const resetFilterForm=()=>{
            state.filterForm.status='';
            state.filterForm.roleid='';
            let data={
                status:'',
                roleid:'',
            }
            store.dispatch('setUserFilter', data);
            setTableData();
        }
        const updateSearchValue=(newValue:any)=>{
            state.filterForm.searchterm=newValue;
        }

        const setNewTableData =(newValue:any)=>{
            state.filterForm.searchterm=newValue;
            state.filterForm.cursortype='CURSOR_TYPE_UNKNOWN';
            state.filterForm.cursor='';
            setTableData();
        }

        const getListBySearch=(ev:any)=>{
            state.filterForm.searchterm = ev.parentElement.children[0].value
            store.dispatch('setUserSrcTerm', state.filterForm.searchterm);
            setTableData();
        }
        const resetSearchTerm=()=>{
            state.filterForm.searchterm='';
            store.dispatch('setUserSrcTerm', '');
            setTableData();
        }
        const getListByFiltering=()=>{
            let data={
                status:state.filterForm.status,
                roleid:state.filterForm.roleid,
            }
            store.dispatch('setUserFilter', data);
            setTableData();
            state.isFilterOpen = false;
        }

        const updateLimit=(newLimit:any)=>{
            state.filterForm.cursor='';
            state.filterForm.limit=newLimit;
            state.filterForm.cursortype='CURSOR_TYPE_UNKNOWN';
            state.NextCursor='';
            state.PreviousCursor='';
            setTableData();
        }

        const getPrevData=()=>{
            state.filterForm.cursor=state.PreviousCursor;
            state.filterForm.cursortype='PREVIOUS';
            if(state.filterForm.cursor!==''){
                setTableData();
            }
        }

        const getNextData=()=>{
            state.filterForm.cursor=state.NextCursor;
            state.filterForm.cursortype='NEXT';
            if(state.filterForm.cursor!==''){
                setTableData();
            }
        }

        const sortIconClickFun=(e:any,sort:string)=>{
           removeNewRow()
           state.activeHeader = e
            if(state.prevElm == e || state.prevElm == ''){
                state.sortIconData ++
                if(state.sortIconData == 3){
                    state.sortIconData = 0
                }
            }else{
                 state.sortIconData = 1
            }

            if(state.sortIconData==1){
                state.filterForm.sortbycolumn=sort;
                state.filterForm.sortby='DESC';
            }
            else if(state.sortIconData==2){
                state.filterForm.sortbycolumn=sort;
                state.filterForm.sortby='ASC';
            }
            else {
                state.filterForm.sortby='';
                state.filterForm.sortbycolumn='';
            }
    
            state.prevElm = e;
            state.filterForm.cursortype = 'CURSOR_TYPE_UNKNOWN';
            state.filterForm.cursor = '';
            setTableData();
        }
        const changeStatus=(status:any, id:string)=>{
            if(status =='ACTIVE') status = 2;
            else status = 1;
            let payload: UpdateUserStatus ={
                id : id,
                status : status,
            }
            new UserService().updateUserStatus(payload).then((response:any)=>{
                if(response !== undefined && response.Data!==undefined){
                    toast.success("Status has been changed successfully.");
                    setTableData();
                }
            }).catch((error)=>{});   
        }

        onBeforeUnmount(()=>{
            let routeData = routeGroupCheck();
            if (routeData.reset == "TRUE") {
                resetFilterForm()
                resetSearchTerm()
            }
        })

        onMounted(()=>{
            state.filterForm.status = store.state.usermanagement.filter.status == undefined? '' : store.state.usermanagement.filter.status;
            state.filterForm.searchterm = store.state.usermanagement.filter.searchterm;
            state.filterForm.roleid = store.state.usermanagement.filter.roleid == undefined? '' : store.state.usermanagement.filter.roleid;
            resetSearchTerm()
            setTableData();
            positionEditDrop();
            window.addEventListener('resize', controlColspan);

            if(localStorage.getItem('fromRoute') && localStorage.getItem('fromRoute')=='create'){
                toastrMsg('User created successfully.');
            }
            setTimeout(() => {
              state.isLoading = false  
            }, 1000);
        })

        return {
            ...toRefs(state),sortIconClickFun,setTableData, updateSearchValue, newRowCreate, removeNewRow,positionEditDrop,
            resetFilterForm, openFilter, closeFilter, actionModalID, toggleActionDropdown, toggleModal, actionButton,
            changeStatus, updateLimit, getPrevData, getNextData, getListBySearch, resetSearchTerm, getListByFiltering,setNewTableData
            
        }

    }
  
})
</script>
