<template>
  <div id="goodsListPaper">
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
  name: 'goodsListPaper',
  data () {
    return {
      currentPage: 1,
      tableData: [],
      pageSize: 10,
      total: 0
    }
  },
  methods: {
    // 获取商品列表表格数据事件
    async getTableData (parameter) {
      let res = await this.$http.get('goods', {
        params: {
          pagenum: this.currentPage,
          pagesize: this.pageSize,
          query: parameter
        }
      })

      let {data: {data, meta: {msg, status}}} = res
      if (status !== 200) return this.$message.error(msg)
      this.$message.success(msg)
      this.total = data.total
      this.tableData = data.goods
      this.$bus.$emit('getPageData', this.tableData)
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
    // 绑定事件
    this.$bus.$on('searchData', this.getTableData)
    this.getTableData()
  },
  beforeDestroy () {
    this.$bus.$off('searchData')
  }
}
</script>

<style scoped>

</style>
