<template>
  <el-dialog title="新增用户" :visible.sync="dialogFormVisible" :show-close="false">
    <el-form :model="form">
      <el-form-item label="用户名" label-width="200px">
        <el-input :placeholder="form.username" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="200px">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="200px">
        <el-input v-model="form.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="shutDownEditBox(false)">取 消</el-button>
      <el-button type="primary" @click="editEvent">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'edit',
  data () {
    return {
      form: {
        username: '',
        email: '1654910676',
        mobile: '12345781'
      }
    }
  },
  methods: {
    shutDownEditBox (val) {
      this.$bus.$emit('shutDownEditBox', val)
    },
    toEditData (data) {
      this.form = data
    },
    editEvent () {
      this.$bus.$emit('editUser', this.form)
    }
  },
  beforeMount () {
    this.form = this.editFormData
  },
  mounted () {
    this.$bus.$on('toEditData', this.toEditData)
  },
  props: {
    'dialogFormVisible': {
      type: null
    },
    'editFormData': {
      type: Object
    }
  },
  beforeDestroy () {
  }
}
</script>

<style scoped>

</style>
