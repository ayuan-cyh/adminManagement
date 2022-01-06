<template>
  <div id="goodsCatePaper">
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
  name: 'goodsCatePaper',
  data () {
    return {
      currentPage: 1,
      tableData: [],
      pageSize: 10,
      total: 0
    }
  },
  methods: {
    // 查询分类数据的事件
    async getTableData () {
      let res = await this.$http
        .get(`categories?type=3&pagenum=${this.currentPage}&pagesize=${this.pageSize}`)
      this.currentPage = 1
      this.total = res.data.data.total
      this.tableData = res.data.data.result
      this.$bus.$emit('getCateData', this.tableData)
    },
    // 分页器事件
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
    // 绑定获取商品分类数据的事件
    this.$bus.$on('loadData', this.getTableData)
  },
  beforeDestroy () {
    this.$bus.$off('loadData')
  }
}
</script>

<style scoped>

</style>
