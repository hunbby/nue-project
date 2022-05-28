<template>
  <div class="markup-tables flex">
    <va-card>
      <va-card-content>
        <div class="row">
          <va-select v-model="tags.tag" class="flex xs8 md1" label="Tag" :options="tags.items" />
          <va-input v-model="title" class="flex xs4 md11" label="Title" />
        </div>
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
    const tags = ref({
      tag: '',
      items: ['success', 'info', 'danger', 'warning', 'gray', 'dark'],
    })

    const saveData = () => {
      console.log('title', title)
      console.log('saveEditorData', modelValue)
    }

    return { modelValue, tags, title, saveData }
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
