<template>
  <div class="markup-tables flex">
    <va-card>
      <va-card-content>
        <va-input v-model="title" class="mb-4" label="Title" />
        <va-input v-model="tagItemSet" class="mb-4" label="Tag" @input="tagInsert" />
        <va-chip
          v-for="(tag, index) in tagItem"
          :key="index"
          class="mb-1 mr-1"
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

    const tagInsert = () => {
      let tagSet = tagItemSet.value
      if (tagSet.includes(',')) {
        let tag: string = tagSet.substring(0, tagSet.indexOf(','))
        tagItem.value.push(tag)
        tagItemSet.value = ''
      }
    }

    const delTag = (e: Event) => {
      let target = (e.target as HTMLInputElement).textContent
      tagItem.value = tagItem.value.filter((data) => {
        return data !== target
      })
    }

    const saveData = () => {
      console.log('title', title)
      console.log('saveEditorData', modelValue)
    }

    return { modelValue, tagItemSet, tagItem, title, saveData, tagInsert, delTag }
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
