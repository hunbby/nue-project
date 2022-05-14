<template>
  <div ref="editorDiv"></div>
</template>

<script lang="ts">
import '@toast-ui/editor/dist/toastui-editor.css'

import { Editor } from '@toast-ui/editor'
import { defineComponent, onMounted, PropType, Ref, ref, toRefs, watch } from 'vue'
import { useStore } from 'vuex'

import FileService from '@/services/file/file-service'

interface TuiEditorSetupData {
  editorDiv: Ref
}

export default defineComponent({
  name: 'TuiEditor',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '600px',
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
    modelHTMLvalue: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }): TuiEditorSetupData {
    const store = useStore()

    const { modelValue } = toRefs(props)

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
                callback(window.URL.createObjectURL(result), 'alt text')
              })
            },
          },
        })
      }
    })

    watch(modelValue, () => {
      editor.setMarkdown(modelValue.value)
    })

    return { editorDiv }
  },
})
</script>
