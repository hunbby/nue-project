<template>
  <div ref="editorDiv"></div>
  <div class="imagePrevie">
    <va-card class="imagePrevieCard">
      <va-card-title>이미지 업로드 목록</va-card-title>
      <va-card-content>
        <div class="uploadImgContent">
          <ImageContanier :file-data="fileData" />
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<script lang="ts">
import '@toast-ui/editor/dist/toastui-editor.css'

import { Editor } from '@toast-ui/editor'
import { defineComponent, onMounted, PropType, reactive, Ref, ref, toRefs, watch } from 'vue'

import FileService from '@/services/file/file-service'

import ImageContanier from './ImageContanier.vue'

interface TuiEditorSetupData {
  editorDiv: Ref
  fileData: Array<any>
}

export default defineComponent({
  name: 'TuiEditor',
  components: { ImageContanier },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '500px',
    },
    previewStyle: {
      type: String as PropType<'tab' | 'vertical'>,
      default: 'vertical',
    },
    initialEditType: {
      type: String as PropType<'wysiwyg' | 'markdown'>,
      default: 'markdown',
    },
    useCommandShortcut: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }): TuiEditorSetupData {
    const { modelValue } = toRefs(props)
    const fileData = reactive([])

    let editor: Editor
    const editorDiv = ref<HTMLElement>()

    onMounted(() => {
      if (editorDiv.value) {
        editor = new Editor({
          el: editorDiv.value,
          // toolbarItems: props.toolbars,
          initialValue: props.modelValue,
          height: props.height,
          previewStyle: props.previewStyle,
          initialEditType: props.initialEditType,
          useCommandShortcut: props.useCommandShortcut,
          language: 'ko',
          events: {
            /* load: (editor: any) => {
                        }, */
            change: (/* param: { source: SourceType | 'viewer'; data: MouseEvent } */) => {
              const value = editor.getMarkdown()
              emit('update:modelValue', value)
            },
          },
          hooks: {
            addImageBlobHook: (file, callback) => {
              console.log(file)
              const param = new FormData()
              param.append('upload', file)
              FileService.fileUpload(param).then((result) => {
                const baseUrl = import.meta.env.VITE_APP_BASE_API
                const fileLocation = baseUrl + result.data.filePath
                const fileSeq = result.data.fileSeq
                const dataSet = {
                  fileSeq: fileSeq,
                  fileLocation: fileLocation,
                }
                fileData.push(dataSet)
                callback(fileLocation, fileSeq.toString())
              })
            },
          },
        })
      }
    })

    watch(modelValue, () => {
      editor.setMarkdown(modelValue.value)
    })

    return { editorDiv, fileData }
  },
})
</script>
<style>
.imagePrevie {
  border: 1px solid #dadde6;
  min-height: 225px;
  font-family: 'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', '나눔바른고딕',
    'Nanum Barun Gothic', '맑은고딕', 'Malgun Gothic', sans-serif;
  border-radius: 4px;
}
.imagePrevieCard {
  height: 100%;
}
</style>
