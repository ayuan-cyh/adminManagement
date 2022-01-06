<template>
  <div id="orderTable">
    <el-table
      size="small"
      :data="ordersData"
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="order_number"
        label="订单号"
        width="180">
      </el-table-column>
      <el-table-column
        label="支付状态"
        width="180">
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.pay_status==='0'"
            effect='plain'
          >
            已支付
          </el-tag>
          <el-tag
            v-else
            effect='plain'
            type="danger"
          >
            未支付
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="是否发货"
        width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.is_send!=='否'"><el-tag>已发货</el-tag></span>
          <span v-else><el-tag type="danger">未发货</el-tag></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="order_price"
        label="价格"
        width="180">
      </el-table-column>
      <el-table-column
        label="下单时间">
        <template slot-scope="scope">
          <span>{{ FormatDate(scope.row.create_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="修改时间">
        <template slot-scope="scope">
          <span>{{ FormatDate(scope.row.update_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="delivery(scope.row)">发货</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'orderTable',
  data () {
    return {
      ordersData: []
    }
  },
  methods: {
    getOrdersData (val) {
      this.ordersData = val
    },
    async delivery (val) {
      // 预先处理修改的数据
      let obj = {
        is_send: 1,
        order_price: val.order_price
      }
      let {data} = await this.$http.put(`orders/${val.order_id}`, obj)
      if (data.meta.status !== 201) return this.$message.error(data.meta.msg)
      this.$message.success('发货成功')
      this.$bus.$emit('getOrderTableData')
    }
  },
  mounted () {
    this.$bus.$on('getOrdersData', this.getOrdersData)
  },
  beforeDestroy () {
    this.$bus.$off('getOrdersData')
  }
}
</script>

<style scoped>
#orderTable {
  margin-top: .2rem;
}
</style>
