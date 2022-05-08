<template>
  <div class="markup-tables flex">
    <va-card>
      <va-card-content>
        <div id="refEditor">
          <v-md-editor
            v-model="text"
            height="500px"
            :disabled-menus="[]"
            @upload-image="handleUploadImage"
          ></v-md-editor>
        </div>
        <br />
        <div class="row justify--end paginationButtons-left">
          <va-button class="mr-2 mb-2">List</va-button>
        </div>
        <div class="row justify--end paginationButtons-right">
          <va-button class="mr-2 mb-2">Save</va-button>
        </div>
      </va-card-content>
    </va-card>
  </div>
  <div class="cards">
    <div class="flex xs12">
      <div class="cards-container row d-flex wrap align--start">
        <va-card>
          <va-card-title>데이터 확인용</va-card-title>
          <va-card-content>{{ text }}</va-card-content>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'BoardWrite',
  components: {},
  setup() {
    const text = ref('')

    return { text }
  },
  methods: {
    handleUploadImage(event: any, insertImage: any, files: any) {
      // Get the files and upload them to the file server, then insert the corresponding content into the editor
      var reader = new FileReader()
      reader.readAsDataURL(files[0])
      console.log(reader)

      // Here is just an example
      insertImage({
        url: reader.result,
        desc: 'desc',
        // width: 'auto',
        // height: 'auto',
      })
    },
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
