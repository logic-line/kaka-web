<template>
    <div>
        <div class="hidden dark:block brand-dark-bg">
            <div class="custom-max-width py-8">
                <div class="flex flex-wrap justify-between gap-16 items-center">
                    <div v-for="(img,inx) in brandImg" :key="inx" class="mx-auto">
                        <img class="w-full" :src="require(`../assets/images/${img}`)" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="dark:hidden brand-white-bg">
            <div class="custom-max-width py-8">
                <div class="flex flex-wrap justify-between gap-16 items-center">
                    <div v-for="(img,inx) in brandImg" :key="inx" class="mx-auto">
                        <img class="w-full brightness-0 dark:brightness-100" :src="require(`../assets/images/${img}`)" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

export default{
    data(){
          return {
                brandImg : ['monero.svg','centre.svg','kraken.svg','near.svg','cex.svg','gemini.svg']
          };
      },
}

</script>

<style scoped>
    .brand-dark-bg, .brand-white-bg{
        background-image: url(../assets/images/brand.jpg);
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
    .brand-white-bg{
        background-image: url(../assets/images/brand-bg.jpg);
    }
  </style>