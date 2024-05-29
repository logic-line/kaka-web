<template>
  <div>
    <div v-if="isLoading" class="h-[507px] pt-2 pr-3" >
       <Loader :isLoading="isLoading" />
     </div>
    <div class="bg-opacity-0">
            <div class="py-20 dark:bg-black100">
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
                <!-- <div>
    <h2 class="text-3xl font-bold mb-4">Dashboard</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded shadow">
        <h3 class="text-xl font-semibold">User Count</h3>
        <p class="text-2xl">{{ userCount }}</p>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <h3 class="text-xl font-semibold">Active Users</h3>
        <p class="text-2xl">{{ activeUserCount }}</p>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <h3 class="text-xl font-semibold">Booking Count</h3>
        <p class="text-2xl">{{ bookingCount }}</p>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <h3 class="text-xl font-semibold">Total Bookings</h3>
        <p class="text-2xl">{{ totalBooking }}</p>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <h3 class="text-xl font-semibold">Packages Count</h3>
        <p class="text-2xl">{{ packagesCount }}</p>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <h3 class="text-xl font-semibold">Total Packages</h3>
        <p class="text-2xl">{{ totalPackage }}</p>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <h3 class="text-xl font-semibold">Services Count</h3>
        <p class="text-2xl">{{ servicesCount }}</p>
      </div>
      
      <div class="bg-white p-4 rounded shadow">
        <h3 class="text-xl font-semibold">Total Services</h3>
        <p class="text-2xl">{{ totalService }}</p>
      </div>
      
    </div>
  </div> -->
            </div>
       </div>  
    </div>
  </div>  
</template>



 