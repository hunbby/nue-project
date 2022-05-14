<template>
  <div class="markup-tables flex">
    <va-card :title="$t('tables.stripedHoverable')">
      <va-card-content>
        <BoardList />
        <div class="row justify--end paginationButtons-right">
          <va-button class="mr-2 mb-2" @click="openWritePage">게시글 추가</va-button>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

import data from '@/data/tables/markup-table/data.json'

import BoardList from './BoardList.vue'

export default defineComponent({
  name: 'BoardIndex',
  components: { BoardList },
  setup() {
    const router = useRouter()
    const users = data.slice(0, 8)

    const getStatusColor = (status: string) => {
      if (status === 'paid') {
        return 'success'
      }

      if (status === 'processing') {
        return 'info'
      }

      return 'danger'
    }

    const openWritePage = () => {
      router.push({ name: 'boardWrite' })
    }

    return {
      users,
      getStatusColor,
      openWritePage,
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

  .paginationButtons-right {
    position: absolute;
    right: 25px;
    bottom: 25px;
  }
}
</style>
