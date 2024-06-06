<template>
  <div>
    <div v-if="isLoading" class="h-[507px] pt-2 pr-3" >
       <Loader :isLoading="isLoading" />
     </div>
    <div class="bg-opacity-0">
            <!-- <div class="py-20 dark:bg-black100">
            <div class="custom-max-width">
                <div class="flex items-center flex-wrap -mx-6">
                    <div class="lg:w-1/2 w-full px-6 ">
                        <div>
                            <img src="../../assets/images/kakaHome.png" alt="">
                        </div>
                    </div>
                    <div class="lg:w-1/2 w-full px-6">
                        <div>
                            <h2 class="text-black100 dark:text-white 2xl:text-5xl text-4xl mt-3 font-semibold lg:text-start text-center">Kaka made is easier for you</h2>
                            <p class="font-medium text-base dark:text-white dark:text-opacity-60 text-black90 mt-3 lg:text-start text-center">Our Application everything have
                                you need in Saudi Arabia. Saudi Arabia offers a diverse range of experiences for visitors to explore.</p>
                            
                        </div>
                    </div>
                </div>
            </div>
       </div>   -->
    <div class=" dark:bg-black100">
        <div class="custom-max-width">
            <div class="px-4 py-4">
              <p>Hello, <span>Kaka</span></p>
              <p>Today is <span>Monday</span> <span>06 Jun 2024</span> </p>
            </div>
            <div class="flex flex-wrap">
              <div class="w-full md:w-1/4">
                <div class="px-4 py-4">
                  <div class=" bg-kakaCard p-4 rounded-md shadow-md">
                    <p class="">User</p>
                    <div class="py-2 text-sm">
                        <p class="py-1"><span>Total User:</span> <span>100</span></p>
                        <p class="py-1"><span>Active User:</span> <span>5</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full md:w-1/4">
                <div class="px-4 py-4">
                  <div class=" bg-kakaCard  p-4 rounded-md shadow-md">
                    <p>Package</p>
                    <div class="py-2 text-sm">
                        <p class="py-1"><span>Total Package:</span> <span>100</span></p>
                        <p class="py-1"><span>Total booking Package:</span> <span>5</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full md:w-1/4">
                <div class="px-4 py-4">
                  <div class=" bg-kakaCard p-4 rounded-md shadow-md">
                    <p>Qurbani</p>
                    <div class="py-2 text-sm">
                        <p class="py-1"><span>Total Qurbani:</span> <span>100</span></p>
                        <p class="py-1"><span>Total Qurbani booking:</span> <span>5</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full md:w-1/4">
                <div class="px-4 py-4">
                  <div class=" bg-kakaCard p-4 rounded-md shadow-md">
                    <p>Product</p>
                    <div class="py-2 text-sm">
                        <p class="py-1"><span>Total Product:</span> <span>100</span></p>
                        <p class="py-1"><span>Total Order Product:</span> <span>5</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap">
              <div class="w-full md:w-1/2">
                <div class="px-4 py-4">
                  <div class=" bg-kakaCard p-4 rounded-md shadow-md">
                    <p class="">Today Booking</p>
                    <div class="py-2 text-sm">
                        <p class="py-2">Qurbani</p>
                        <div class="h-2 bg-gray-200 w-full rounded-md">
                            <div class="h-2 bg-kakaCard2 rounded-md" style="width:33%"></div>
                        </div>
                    </div>
                    <div class="py-2 text-sm">
                        <p class="py-2">Product</p>
                        <div class="h-2 bg-gray-200 w-full rounded-md">
                            <div class="h-2 bg-kakaPrimary rounded-md" style="width:53%"></div>
                        </div>
                    </div>
                    <div class="py-2 text-sm">
                        <p class="py-2">Package</p>
                        <div class="h-2 bg-gray-200 w-full rounded-md">
                            <div class="h-2 bg-kakaCard4 rounded-md" style="width:83%"></div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full md:w-1/2">
                <div class="px-4 py-4">
                  <div class=" bg-kakaCard  p-4 rounded-md shadow-md">
                    <p class="text-center">Today totoal register user</p>
                    <div class="py-2 flex justify-center items-center">
                        <div class="h-40 w-40 bg-kakaCard3 rounded-full flex justify-center items-center">
                              <div class=" h-32 w-32 bg-kakaCard rounded-full flex justify-center items-center">
                                  <div>
                                     <p class=" text-2xl text-kakaCard1 text-center"><span>50</span></p>
                                      <p class=" text-2xl text-kakaCard1 text-center border-t-2 border-kakaCard1">2000</p>
                                  </div>
                              </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>

    </div>
    </div>
  </div>  
</template>



 