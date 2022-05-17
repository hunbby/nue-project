<template>
  <div>
    <div class="file-preview-content-container">
      <div class="file-preview-container">
        <div class="file-preview-wrapper">
          <!-- file-preview-wrapper 이놈이 반복되야함 -->
          <div class="file-close-button">x</div>
          <!-- <img :src="file.preview" /> -->
          <img src="http://localhost:18090/cms/images/2022/20220517213248773.png" />
          {{ fileData }}
        </div>
      </div>
    </div>
  </div>
</template>
<!-- v-for="(file, index) in files" :key="index"   @click="fileDeleteButton" :name="file.number"-->
<script lang="ts">
import { defineComponent, onMounted, PropType, Ref, ref, toRefs, watch } from 'vue'

export default defineComponent({
  name: 'ImageContanier',
  props: ['fileData'],
  setup() {
    return {}
  },
})
</script>
<style>
.file-preview-content-container {
  height: 100%;
}
.file-preview-container {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.file-preview-wrapper {
  padding: 10px;
  position: relative;
  min-height: 130px;
}

.file-preview-wrapper > img {
  position: relative;
  width: 190px;
  height: 130px;
  z-index: 10;
}
.file-close-button {
  position: absolute;
  /* align-items: center; */
  line-height: 18px;
  z-index: 99;
  font-size: 18px;
  right: 5px;
  top: 10px;
  color: #fff;
  font-weight: bold;
  background-color: #666666;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
}
</style>
