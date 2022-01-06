<template>
  <div id="roleList">
    <el-table
      class="roletable"
      :data="tableData"
      max-height="450px"
      style="width: 100%">
      <el-table-column
        type="expand"
        width="50"
      >
        <template slot-scope="scope">
          <el-row v-for="(item1,i1) in scope.row.children" :key="i1">
            <!--          一级标签-->
            <el-col :span="4">
              <el-tag closable @close="deletePermission(scope.row,item1)">{{ item1.authName }}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <!--          二级标签和三级标签-->
            <el-col :span="20">
              <el-row v-for="(item2,i1) in item1.children" :key="i1">
                <!--              二级标签-->
                <el-col :span="4">
                  <el-tag @close="deletePermission(scope.row,item2)" type="success" style="margin-left: 10px" closable>
                    {{ item2.authName }}
                  </el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <!--              三级标签-->
                <el-col :span="20">
                  <el-tag
                    class="tag"
                    type="warning"
                    style="margin-left: 10px"
                    closable v-for="(item3,i1) in item2.children" :key="i1"
                    @close="deletePermission(scope.row,item3)"
                  >{{ item3.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <span v-if="scope.row.children.length === 0">当前角色无任何权限</span>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="100">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="150">
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="操作">
        <template slot-scope="scope">
          <!--          删除角色按钮-->
          <el-button type="danger" icon="el-icon-delete" circle size="mini" plain
                     @click="deleteOne(scope.row.id)"></el-button>
          <!--        更新角色权限的按钮-->
          <el-button type="success" icon="el-icon-check" circle size="mini" plain
                     @click="updateRole(scope.row)"
          ></el-button>
        </template>
      </el-table-column>

    </el-table>
    <!--    更新权限的弹窗组件-->
    <updateComponent
      @tableLoad="getRoleList"
      :ifShow.sync="updateShow"
      :nowRole="nowRole"
    >
    </updateComponent>
  </div>
</template>

<script>
import updateComponent from '../permissionsList/updateComponent'

export default {
  name: 'rolesListTable',
  components: {
    updateComponent
  },
  data () {
    return {
      tableData: [],
      updateShow: false,
      nowRole: {}
    }
  },
  methods: {
    //  更新角色权限的事件
    updateRole (data) {
      this.nowRole = data
      this.updateShow = true
    },
    deleteOne (id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let {data} = await this.$http.delete(`roles/${id}`)
        if (data.meta.status !== 200) return this.$message.error(data.meta.msg)
        this.$message.success(data.meta.msg)
        await this.getRoleList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    //  获取角色以及角色对应权限列表的事件
    async getRoleList () {
      const res = await this.$http.get('roles')
      let {data: {data, meta: {msg, status}}} = res
      if (status !== 200) return this.$message.error(msg)
      this.$message.success(msg)
      this.tableData = data
    }
  },
  created () {
    this.getRoleList()
  }
}
</script>

<style scoped>
</style>
