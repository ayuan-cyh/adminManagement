<template>
  <el-dialog title="新增用户" :visible.sync="dialogFormVisible" :show-close="false">
    <el-form :model="form">
      <el-form-item label="用户名" label-width="200px">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="200px">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="200px">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="200px">
        <el-input v-model="form.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="shotdownBox(false)">取 消</el-button>
      <el-button type="primary" @click="addevent(false)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'add',
  data () {
    return {
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      bol: false
    }
  },
  methods: {
    //  用于给父组件userlist传递数据
    addevent (val) {
      this.$bus.$emit('shutBox', val, this.form)
      this.form = {}
    },
    shotdownBox (val) {
      this.$bus.$emit('shutDownEvent', val)
    }
  },
  props: ['dialogFormVisible']
}
</script>

<style scoped>

</style>
