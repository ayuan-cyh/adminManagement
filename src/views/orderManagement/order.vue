<template>
  <div id="order">
    <!--  面包屑-->
    <my-crumbs level1="订单管理" level2="订单统计"></my-crumbs>
    <!--    表格组件-->
    <orderTable @test="test"></orderTable>
    <!--    分页器组件-->
    <orderPaper></orderPaper>
  </div>
</template>

<script>
import orderTable from '../../components/order/orderTable'
import orderPaper from '../../components/order/orderPaper'

export default {
  name: 'order',
  components: {
    orderTable, orderPaper
  },
  data () {
    return {}
  },
  methods: {
    test () {
    }
  }
}
</script>

<style scoped>

</style>
