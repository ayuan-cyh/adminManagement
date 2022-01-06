<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[10,15,20]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</template>

<script>
export default {
  name: 'my-pager',
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
      let res = await this.$http.get(`categories?type=3&pagenum=${this.currentPage}&pagesize=${this.pageSize}`)
      this.currentPage = 1
      this.total = res.data.data.total
      this.tableData = res.data.data.result
      this.$bus.$emit('getCateData', this.tableData)
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
    this.$bus.$on('loadData', this.getTableData)
  },
  beforeDestroy () {
    this.$bus.$off('loadData')
  }
}
</script>

<style scoped>

</style>
