<template>
  <div id="goodsTable">
    <el-table
      :data="tableData"
      class="table"
      size="small"
      max-height="450px"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="250">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
        width="150">
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量"
        width="150">
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="150">
        <template slot-scope="scope">
          <span>{{ FormatData(scope.row.add_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="操作">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" circle size="mini" plain
                     @click="deleteOne(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'goodsTable',
  data () {
    return {
      tableData: [],
      input3: ''
    }
  },
  methods: {
    //  接收分页组件传递的数据
    getPageData (data) {
      this.tableData = data
    },
    //  日期格式化
    FormatData (data) {
      return dayjs(Date.now(data)).format('YYYY-MM-DD HH:mm:ss')
    },
    //  删除商品的事件
    async deleteOne (item) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let {data} = await this.$http.delete(`goods/${item.goods_id}`)
        this.$bus.$emit('searchData')
        if (data.meta.status !== 200) return this.$message.error(data.meta.msg)
        this.$message.success(data.meta.msg)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  mounted () {
    this.$bus.$on('getPageData', this.getPageData)
  },
  beforeDestroy () {
    this.$bus.$off('getPageData')
  }
}
</script>

<style scoped>
.table {
  margin-top: .2rem;
}
</style>
