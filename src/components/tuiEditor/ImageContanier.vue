<template>
  <div>
    <div class="file-preview-content-container">
      <div class="file-preview-container">
        <div v-if="fileData.length">
          <div v-for="file in fileData" :key="file" class="file-preview-wrapper">
            <div class="file-close-button">x</div>
            <img :src="file.fileLocation" :data-file-seq="file.fileSeq" />
          </div>
        </div>
        <div v-else>
          <div class="file-preview-wrapper">
            <p></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
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
.file-preview-wrapper > p {
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
