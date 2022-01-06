<template>
  <div id="orderPaper">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10,15,20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'orderPaper',
  data () {
    return {
      currentPage: 1,
      tableData: [],
      pageSize: 10,
      total: 0
    }
  },
  methods: {
    async getTableData () {
      let res = await this.$http.get(`orders`, {
        params: {
          pagenum: this.currentPage,
          pagesize: this.pageSize
        }
      })
      this.total = res.data.data.total
      this.tableData = res.data.data.goods
      this.$bus.$emit('getOrdersData', this.tableData)
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
      this.getTableData()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getTableData()
    }
  },
  mounted () {
    this.getTableData()
    this.$bus.$on('getOrderTableData', this.getTableData)
  },
  beforeDestroy () {
    this.$bus.$off('getOrderTableData')
  }
}
</script>

<style scoped>
#orderPaper {
  margin-top: .2rem;
}
</style>
