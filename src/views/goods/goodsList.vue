<template>
  <div id="goods">
    <my-crumbs level1="商品管理" level2="商品列表"></my-crumbs>
    <goodsListTop></goodsListTop>
    <goodsTable></goodsTable>
    <goodsListPaper></goodsListPaper>
  </div>
</template>

<script>
import goodsTable from '../../components/goods/goodsTable'
import goodsListPaper from '../../components/goods/goodsListPaper'
import goodsListTop from '../../components/goods/goodsListTop'

export default {
  name: 'goodsList',
  components: {
    goodsTable, goodsListPaper, goodsListTop
  },
  data () {
    return {}
  }
}
</script>

<style scoped>

</style>
