<template>
  <div class="markup-tables flex">
    <va-card>
      <va-card-content>
        <div id="editorDev">
          <TuiEditor v-model="modelValue" />
        </div>
        <br />
        <div class="row justify--end paginationButtons-left">
          <va-button class="mr-2 mb-2">List</va-button>
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

    const saveData = () => {
      console.log('saveEditorData', modelValue)
    }

    return { modelValue, saveData }
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
