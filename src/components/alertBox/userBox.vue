<template>
  <el-dialog title="权限管理" :visible.sync="dialogFormVisible" :show-close="false" @open="test">
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" :label-width="formLabelWidth">
        <el-select v-model="nowUser" placeholder="请选择需要分配的角色">
          <el-option label="请选择" :value="-1"></el-option>
          <el-option v-for="(item,i) in userList" :label="item.roleName" :value="item.id" :key="i"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:userBox', false)">取 消</el-button>
      <el-button type="primary" @click="updateUser">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'userBox',
  data () {
    return {
      formLabelWidth: '200px',
      form: {
        username: ''
      },
      dialogFormVisible: false,
      nowUser: -1
    }
  },
  methods: {
    //  弹窗打开时触发的事件
    async test () {
      this.form = this.userBoxFormData
      this.nowUser = this.nowUserId
    },
    //  弹窗确定按钮点击触发的事件
    async updateUser () {
      await this.$http.put(`users/${this.form.id}/role`, {rid: this.nowUser})
      this.$emit('update:userBox', false)
    }
  },
  props: ['userBox', 'userBoxFormData', 'userList', 'nowUserId'],
  watch: {
    userBox () {
      this.dialogFormVisible = this.userBox
    },
    nowUserId () {
      this.nowUser = this.nowUserId
    }
  },
  mounted () {
  },
  beforeUpdate () {

  },
  updated () {
  }
}
</script>

<style scoped>

</style>
