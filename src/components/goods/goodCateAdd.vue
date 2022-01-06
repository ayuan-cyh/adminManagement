<template>
  <div id="goodCateAdd">
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible" :show-close="false" @open="openEvent">
      <el-form :model="form" label-position="left">
        <el-form-item label="分类名称:" label-width="200">
          <el-input v-model="form.cat_name" autocomplete="off" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="请选择分类:" label-width="200">
          <el-cascader
            v-model="value"
            :options="options"
            :props="defaultProps"
            @change="handleChange"
          >
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:ifShow', false)">取 消</el-button>
        <el-button type="primary" @click="addEvent">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'goodCateAdd',
  data () {
    return {
      form: {
        cat_name: '', //  分类名称(已处理)
        cat_pid: -1, //  分类父id
        cat_level: -1 //  分类层级
      },
      dialogFormVisible: false,
      //  级联选择器使用的数据
      value: [], //  级联选择器绑定的数据
      options: [],
      defaultProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        checkStrictly: true
      }
    }
  },
  props: ['ifShow'],
  methods: {
    //  点击确定按钮触发的事件
    async addEvent () {
      //  添加一级分类的情况
      if (this.value.length === 0) {
        this.form.cat_level = 0
        this.form.cat_pid = 0
        //  添加二级分类的情况下
      } else if (this.value.length === 1) {
        this.form.cat_level = 1
        this.form.cat_pid = this.value[0]
        //  添加三级分类的情况下
      } else if (this.value.length === 2) {
        this.form.cat_level = 2
        this.form.cat_pid = this.value[1]
      }
      let res = await this.$http.post('categories', this.form)
      if (res.data.meta.status !== 201) return this.$message.error(res.data.meta.msg)
      this.$message.success(res.data.meta.msg)
      //  触发全局事件总线刷新数据
      this.$bus.$emit('loadData')
      //  关闭弹窗
      this.$emit('update:ifShow', false)
    },
    //  弹层弹出触发的事件
    openEvent () {
      this.getGoodsCate()
    },
    handleChange () {
    },
    //   获取商品分类的事件
    async getGoodsCate () {
      let res = await this.$http.get(`categories?type=2`)
      this.options = res.data.data
    }
  },
  watch: {
    ifShow () {
      this.dialogFormVisible = this.ifShow
    }
  }
}
</script>

<style scoped>

</style>
