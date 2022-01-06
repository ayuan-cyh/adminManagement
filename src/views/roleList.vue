<template>
  <div id="roleList">
    <my-crumbs level1="权限管理" level2="角色列表"></my-crumbs>
    <el-row class="addRole">
      <el-button type="primary" @click="ifShowDialog = true">添加角色</el-button>
    </el-row>
    <!--    表格组件-->
    <rolesListTable ref='rolesListTable'></rolesListTable>
    <!--    添加角色的弹出层组件-->
    <el-dialog title="收货地址" :visible.sync="ifShowDialog">
      <el-form :model="roleForm">
        <el-form-item label="角色名称" :label-width="formLabelWidth" required>
          <el-input v-model="roleForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="roleForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ifShowDialog = false">取 消</el-button>
        <el-button type="primary" @click="addRoleEvent">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import rolesListTable from '../components/rolesList/rolesListTable'

export default {
  name: 'roleList',
  components: {
    rolesListTable
  },
  data () {
    return {
      roleForm: {
        roleName: '',
        roleDesc: ''
      },
      formLabelWidth: '1rem',
      ifShowDialog: false
    }
  },
  methods: {
    //  添加角色的事件
    async addRoleEvent () {
      let {data} = await this.$http.post('roles', this.roleForm)
      if (data.meta.status !== 201) return this.$message.error(data.meta.msg)
      this.$message.success(data.meta.msg)
      await this.$refs.rolesListTable.getRoleList()
      this.ifShowDialog = false
    }
  }
}
</script>

<style scoped>
.addRole {
  margin-top: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
}
</style>
