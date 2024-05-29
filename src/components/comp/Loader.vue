<!-- Loader.vue -->
<template>
  <div v-if="isLoading" class="loader-container bg-white dark:bg-black">
    <div class="loader"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name:'Loader',
    props : ['isLoading'],
}
)
</script>

<style scoped>
.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.loader {
  width: 80px;
  height: 80px;
  border-right: 4px solid rgb(144 238 144);
  border-radius: 100%;
  -webkit-animation: spinRight 800ms linear infinite;
          animation: spinRight 800ms linear infinite;
}
.loader:before, .loader:after {
  content: "";
  width:60px;
  height:60px;
  display: block;
  position: absolute;
  top: calc(50% - 30px);
  left: calc(50% - 30px);
  border-left: 3px solid rgb(144 238 144);
  border-radius: 100%;
  -webkit-animation: spinLeft 800ms linear infinite;
          animation: spinLeft 800ms linear infinite;
}
.loader:after {
  width: 40px;
  height: 40px;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
  border: 0;
  border-right: 2px solid rgb(144 238 144);
  -webkit-animation: none;
          animation: none;
}

@-webkit-keyframes spinLeft {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(720deg);
  }
}

@keyframes spinLeft {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(720deg);
  }
}
@-webkit-keyframes spinRight {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
@keyframes spinRight {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
</style>