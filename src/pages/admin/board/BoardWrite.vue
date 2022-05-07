<template>
  <div class="markup-tables flex">
    <va-card :title="$t('tables.stripedHoverable')">
      <va-card-content>
        <div id="refEditor" ref="refEditor"></div>
        <br />
        <div class="row justify--end paginationButtons-left">
          <va-button class="mr-2 mb-2">List</va-button>
        </div>
        <div class="row justify--end paginationButtons-right">
          <va-button class="mr-2 mb-2" @click="getHTML">Save</va-button>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<script lang="ts">
import '@toast-ui/editor/dist/toastui-editor.css'

import Editor from '@toast-ui/editor'
import { defineComponent, onMounted, ref } from 'vue'

import data from '@/data/tables/markup-table/data.json'

export default defineComponent({
  name: 'BoardWrite',
  components: {},
  setup() {
    const refEditor = ref(null)

    const users = data.slice(0, 8)

    const getHTML = () => {
      console.log('test')
      let html = refEditor.value.invoke('getHtml')
      console.log(html)
    }

    onMounted(() => {
      const editor = new Editor({
        el: refEditor.value,
        height: '700px',
        initialEditType: 'markdown',
        previewStyle: 'vertical',
      })
      editor.getMarkdown()
    })

    return {
      users,
      getHTML,
      refEditor,
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

#refEditor {
  margin-bottom: 50px;
}
</style>
