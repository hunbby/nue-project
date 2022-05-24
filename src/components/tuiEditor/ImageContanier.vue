<template>
  <div>
    <div class="file-preview-content-container">
      <div class="file-preview-container">
        <div v-if="fileDataList.length">
          <div v-for="file in fileDataList" :key="file" class="file-preview-wrapper">
            <div class="file-close-button" :data-file-seq="file.fileSeq" @click="deleteImg">x</div>
            <img :src="file.fileLocation" />
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
import { computed, defineComponent, onMounted, PropType, Ref, ref, toRef, toRefs, watch } from 'vue'

import fileService from '@/services/file/file-service'

declare interface FileDatas {
  fileSeq: string | null
  fileTypeCd: string | null
  ognlFileNm: string | null
  makeFileNm: string | null
  thumFileNm: string | null
  filePath: string | null
  fileHash: string | null
  creationId: string | null
  creationDt: string | null
  fileDesc: string | null
}

export default defineComponent({
  name: 'ImageContanier',
  props: {
    fileData: {
      type: Array,
      default: [],
    },
  },
  setup(props, { emit }) {
    const fileDataList = ref([])
    const { fileData } = toRefs(props)
    onMounted(() => {
      fileDataList.value = fileData.value
    })
    watch(fileData, () => {
      console.log('start?')
      fileDataList.value = fileData.value
    })

    console.log('fileData', fileData)
    console.log('fileDataList', fileDataList)
    // const fileDataList = computed(() => {
    //   return props.fileData
    // })
    // const fileDataList = computed(() => {
    //   let resultDataList = []
    //   const orgData = props.fileData
    //   for (let i = 0; i < orgData.length; i++) {
    //     let setData = orgData[i] as FileDatas
    //     resultDataList.push(setData)
    //   }
    //   return resultDataList
    // })
    const deleteImg = (event: Event) => {
      const target = event.target as Element
      const fileSeq = target.getAttribute('data-file-seq')
      console.log('deleteImg', target.getAttribute('data-file-seq'))
      const data = {
        fileSeq: fileSeq,
      } as FileDatas
      const fileList = []
      fileList.push(data)

      const files = { files: fileList }
      fileService.fileDel(files)
    }
    return { deleteImg, fileDataList }
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
  float: left;
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
