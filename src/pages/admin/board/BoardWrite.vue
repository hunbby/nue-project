<template>
  <div class="markup-tables flex">
    <va-card>
      <va-card-content>
        <va-input
          v-model="title"
          class="mb-4"
          label="Title"
          :error="!!titleError.length"
          :error-messages="titleError"
        />
        <div>test</div>
        <va-input
          id="tagItemSet"
          v-model="tagItemSet"
          :class="{ 'mb-1': tagItem.length > 0, 'mb-4': tagItem.length == 0 }"
          label="Tag"
          :error="!!tagError.length"
          :error-messages="tagError"
          @input="tagInsert"
        />
        <va-chip
          v-for="(tag, index) in tagItem"
          :key="index"
          class="mb-3 mr-1"
          color="primary"
          @click="delTag"
        >
          {{ tag }}
        </va-chip>
        <div id="editorDev">
          <TuiEditor v-model="modelValue" />
        </div>
        <br />
        <div class="row justify--end paginationButtons-left">
          <router-link :to="{ name: 'board' }">
            <va-button class="mr-2 mb-2">List</va-button>
          </router-link>
        </div>
        <div class="row justify--end paginationButtons-right">
          <va-button class="mr-2 mb-2" @click="saveData">Save</va-button>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import TuiEditor from '@/components/tuiEditor/TuiEditor.vue'
export default defineComponent({
  name: 'BoardWrite',
  components: { TuiEditor },
  setup() {
    const modelValue = ref('test')
    const title = ref()
    const tagItemSet = ref('')
    const tagItem = ref<string[]>([])
    const validation = ref<boolean>(true)
    const titleError = ref<string[]>([])
    const tagError = ref<string[]>([])

    const tagInsert = () => {
      tagError.value = [] //remove error msg
      let tagSet = tagItemSet.value
      let sizeChk = tagItem.value.length
      if (sizeChk >= 5) {
        tagError.value.push('태그는 최대 5개만 설정 가능합니다.')
        tagItemSet.value = ''
      }
      if (tagSet.includes(',')) {
        let tag: string = tagSet.substring(0, tagSet.indexOf(','))
        if (tag == '') {
          tagError.value.push('태그를 입력해주세요')
          tagItemSet.value = ''
        } else {
          let tagChk = tagItem.value.indexOf(tag) !== -1
          if (tagChk) {
            tagError.value.push('중복된 태그 입니다.')
            tagItemSet.value = ''
          } else {
            tagItem.value.push(tag)
            tagItemSet.value = ''
          }
        }
      }
    }

    const delTag = (e: Event) => {
      let target = (e.target as HTMLInputElement).textContent
      tagItem.value = tagItem.value.filter((data) => {
        return data !== target
      })
    }

    const saveData = (e: Event) => {
      e.preventDefault()
      validationChk()
      if (validation.value) {
        console.log('title', title)
        console.log('saveEditorData', modelValue)
        console.log('tagItem', tagItem)
      }
    }

    const validationChk = () => {
      errMsgReset()
      validation.value = true // 초기화
      console.log('title', title.value == undefined)
      if (title.value == '' || title.value == undefined) {
        titleError.value.push('타이틀을 입력해주세요')
        validation.value = false
      }
      let sizeChk = tagItem.value.length
      if (sizeChk == 0) {
        document.getElementById('tagItemSet')?.focus()
        tagError.value.push('태그는 최소 1개 설정 해주세요')
        validation.value = false
      }
    }

    const errMsgReset = () => {
      titleError.value = []
      tagError.value = []
    }

    return {
      modelValue,
      tagItemSet,
      tagItem,
      title,
      titleError,
      tagError,
      saveData,
      tagInsert,
      delTag,
    }
  },
})
</script>

<style lang="scss">
.markup-tables {
  .table-wrapper {
    overflow: auto;
  }

  .va-table {
    width: 100%;
  }

  .paginationButtons-left {
    position: absolute;
    left: 25px;
    bottom: 25px;
  }

  .paginationButtons-right {
    position: absolute;
    right: 25px;
    bottom: 25px;
  }
}

#editorDev {
  margin-bottom: 50px;
}
</style>
