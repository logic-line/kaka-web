<template>
    <div class="">
        <PageHeader>
            <template v-slot:body>
                <router-link :to="prevLink" class="flex items-center justify-center bg-kakaPrimary py-2.5 px-8 w-full rounded-sm bor">
                    {{ $t('message.back') }}
                </router-link>
            </template>
        </PageHeader>
    <div class="image-container w-1/2 mx-auto border" @wheel="handleZoom">
      <img class="w-full"
        :src="getImageScr"
        :style="{ transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)` }"
        @mousedown="startDragging"
        @mousemove="handleDragging"
        @mouseup="stopDragging"
      />
    </div>
    <div class="controls">
      <button class="px-5" @click="zoomIn">+</button>
      <button class="px-5" @click="zoomOut">-</button>
    </div>
  </div>
</template>

<script lang="ts">
import PageHeader from '../components/list/PageHeader.vue';
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
    name : 'image-view',
    components : {PageHeader},
    props : [''],
    setup(props){
        const router = useRouter();
        const route = useRoute()
        const state = reactive({
            getImageScr: <string>route.params.imgSrc,
            scale: 1,
            translateX: 0,
            translateY: 0,
            isDragging: false,
            lastX: 0,
            lastY: 0,
            prevLink : <any>''
        })
       const zoomIn =()=> {
        state.scale += 0.1;
        }
    const zoomOut=()=> {
      if (state.scale > 0.2) {
        state.scale -= 0.1;
      }
    }
    const handleZoom=(event:any)=> {
      event.preventDefault();
      const delta = Math.sign(event.deltaY);
      if (delta > 0) {
        zoomOut();
      } else if (delta < 0) {
        zoomIn();
      }
    }
    const startDragging=(event:any)=> {
      event.preventDefault();
      state.isDragging = true;
      state.lastX = event.clientX;
      state.lastY = event.clientY;
    }
    const handleDragging=(event:any)=> {        
      if (state.isDragging) {
        const deltaX = event.clientX - state.lastX;
        const deltaY = event.clientY - state.lastY;
        state.lastX = event.clientX;
        state.lastY = event.clientY;
        state.translateX += deltaX;
        state.translateY += deltaY;
        
      }
    }
    const stopDragging=()=> {
      state.isDragging = false;
    }
    onMounted(()=>{
        state.prevLink = router.options.history.state.back
    })
        return {
          ...toRefs(state),stopDragging,zoomIn,zoomOut,handleZoom,handleDragging,startDragging
        }
    }
})
</script>
<style scoped>
.zoomable-draggable-image {
  display: inline-block;
  position: relative;
}

.image-container {
  position: relative;
  overflow: hidden;
  cursor: grab;
  /* transition: all 0.3s ease; */
}

.image-container img {
  max-width: 100%;
  /* transition: transform 0.3s ease; */
}

.controls {
  margin-top: 10px;
  text-align: center;
}

.controls button {
  font-size: 20px;
  cursor: pointer;
  margin: 0 5px;
  background-color: #eee;
  border: none;
  border-radius: 5px;
}
</style>