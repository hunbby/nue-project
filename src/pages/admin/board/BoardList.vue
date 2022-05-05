<template>
  <div class="table-wrapper">
    <div v-for="user in users" :key="user.id" class="list_content">
      <a href="">
        <strong class="tit_post">{{ user.name }}</strong>
        <p class="txt_post">{{ user.email }} / {{ user.country }} / {{ user.status }}</p>
      </a>
      <div class="detail_info">
        <a href="" class="ling_cate">vue.js</a>
        <span class="txt_bar"></span>
        <span class="txt_date">2022-05-05</span>
      </div>
    </div>
  </div>
  <div class="row pagination">
    <div class="flex md6 offset--md3">
      <va-pagination
        v-model="pageValue"
        class="grid__container flex-center"
        :visible-pages="7"
        :total="100"
        boundary-numbers
        :page-size="10"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import data from '@/data/tables/markup-table/data.json'

export default defineComponent({
  name: 'BoardList',
  setup() {
    const users = data.slice(0, 8)

    const pageValue = ref(1)

    const getStatusColor = (status: string) => {
      if (status === 'paid') {
        return 'success'
      }

      if (status === 'processing') {
        return 'info'
      }

      return 'danger'
    }

    return {
      users,
      getStatusColor,
      pageValue,
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

  .list_content {
    padding: 24px 0 26px;
    border-bottom: 1px solid #efefef;
  }

  .list_content .link_post {
    display: block;
    overflow: hidden;
    text-decoration: none;
  }

  .list_content .tit_post {
    display: block;
    font-weight: normal;
    font-size: 24px;
    line-height: 34px;
  }

  .list_content .txt_post {
    display: -webkit-box;
    display: -ms-flexbox;
    display: box;
    overflow: hidden;
    margin-top: 4px;
    font-size: 13px;
    line-height: 23px;
    color: #5c5c5c;
    vertical-align: top;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }

  .txt_bar {
    display: inline-block;
    width: 1px;
    height: 9px;
    margin: 0 9px;
    background-color: #ebebeb;
  }

  .list_content .detail_info {
    margin-top: 11px;
    font-size: 12px;
    color: #aaa;
  }

  .list_content .detail_info .link_cate {
    font-size: 13px;
    text-decoration: none;
    color: #6bacce;
  }

  .pagination {
    position: relative;
  }
}
</style>
