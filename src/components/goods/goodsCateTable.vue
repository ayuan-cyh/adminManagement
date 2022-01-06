<template>
  <div id="goodsCateTable">
    <el-table
      :data="tableData"
      class="table"
      size="small"
      max-height="450px"
      border
      style="width: 100%">
      <!--      使用树形组件-->
      <ElTreeGrid
        label="分类名称"
        prop="cat_name"
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
        childKey="children"
      >
      </ElTreeGrid>
      <el-table-column
        label="级别"
        width="300">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level===0">一级</span>
          <span v-else-if="scope.row.cat_level===1">二级</span>
          <span v-else-if="scope.row.cat_level===2">三级</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否有效"
        width="300">
        <template slot-scope="scope">
          <span>有效</span>
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
// 引入第三方Element树形组件
let ElTreeGrid = require('element-tree-grid')

export default {
  name: 'goodsCateTable',
  components: {
    // 挂载树形组件
    ElTreeGrid
  },
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
    //  删除分类的事件
    async deleteOne (item) {
      this.$confirm('此操作将永久删除该商品分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let {data} = await this.$http.delete(`categories/${item.cat_id}`)
        if (data.meta.status !== 200) return this.$message.error(data.meta.msg)
        this.$message.success(data.meta.msg)
        this.$bus.$emit('loadData')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  mounted () {
    this.$bus.$on('getCateData', this.getPageData)
  },
  beforeDestroy () {
    this.$bus.$off('getCateData')
  }
}
</script>

<style scoped>
#goodsCateTable {
  margin-top: .2rem;
}
</style>
