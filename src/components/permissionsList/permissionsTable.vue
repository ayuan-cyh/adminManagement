<template>
  <div id="permissionsTable">
    <el-table
      :data="tableData"
      border
      max-height="520"
      style="width: 100%">
      <el-table-column
        type="index"
        fixed
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180">
      </el-table-column>
      <el-table-column
        prop="level"
        label="层级">
        <template slot-scope="scope" >
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-else-if="scope.row.level==='1'">二级</span>
          <span v-else-if="scope.row.level==='2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'permissionsTable',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    //  获取所有的权限列表
    async getTableData () {
      const res = await this.$http.get('rights/list')
      if (res.data.meta.status !== 200) return this.$message.error(res.data.meta.msg)
      this.$message.success(res.data.meta.msg)
      this.tableData = res.data.data
    }
  },
  created () {
    this.getTableData()
  }
}
</script>

<style scoped>
#permissionsTable {
  padding-top: 20px;
  box-sizing: border-box;
}

</style>
