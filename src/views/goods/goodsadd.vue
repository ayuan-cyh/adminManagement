<template>
  <div id="goodsadd">
    <my-crumbs level1="商品管理" level2="商品列表"></my-crumbs>
    <el-alert
      class="alert"
      title="添加商品信息"
      type="success"
      center
      show-icon>
    </el-alert>
    <el-steps :active="1*activeName" finish-status="success" simple style="margin-top: 10px">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <el-form label-position="left" label-width="80px" :model="form" class="AddFrom">
      <el-tabs tab-position="left" style="height: 60vh;overflow: auto" v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="基本信息" name="1">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="选择商品">
            <el-cascader
              v-model="value"
              :options="options"
              :props="defaultProps"
              @change="handleChange"
            >
            </el-cascader>
          </el-form-item>
        </el-tab-pane>
        <!--         商品参数-->
        <el-tab-pane label="商品参数" name="2">
          <el-form-item v-for="(item1,i) in parameterData" :label="item1.attr_name" :key="i">
            <el-checkbox-group v-model="item1.attr_vals">
              <el-checkbox :label="item2" v-for="(item2,i) in item1.attr_vals" :key="i" border></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <!--        商品属性-->
        <el-tab-pane label="商品属性" name="3">
          <el-form-item v-for="(item,i) in arrayStaticData" :key="i" :label="item.attr_name" label-width="150px">
            <el-input v-model="item.attr_vals" style="width: 200px"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="4">
          <el-form-item>
            <el-upload
              class="upload-demo"
              :headers="header"
              action='http://127.0.0.1:8888/api/private/v1/upload'
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="5">
          <el-form-item>
            <quillEditor v-model="form.goods_introduce"></quillEditor>
          </el-form-item>
          <el-row style="text-align: center">
            <el-button type="primary" round @click='addGoods'>添加商品</el-button>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import {quillEditor} from 'vue-quill-editor'

export default {
  components: {quillEditor},
  name: 'goodsadd',
  data () {
    return {
      /*
      goods_name商品名称
      goods_cat以为','分割的分类列表
      goods_price价格
      goods_number数量
      goods_weight重量
      goods_introduce介绍
      pics上传的图片临时路径（对象）
      attrs商品的参数（数组），包含 `动态参数` 和 `静态属性`
      */
      form: {
        goods_name: '',
        goods_cat: '', //  需要处理
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      //  tabs标签页的所在页
      activeName: '1',
      //   级联选择器需要使用的数据
      value: [],
      options: [],
      defaultProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      //  参数
      parameterData: [], //  动态参数
      checkList: ['选中且禁用', '复选框 A'],
      arrayStaticData: [],
      //  文件上传的请求头
      header: {Authorization: localStorage.getItem('token')}
    }
  },
  methods: {
    //  添加商品按钮点击触发的事件
    async addGoods () {
      //  在发送网络请求前处理未处理的数据
      //  处理分类
      this.form.goods_cat = this.value.join(',')
      //  处理静态和动态数组
      let arr1 = this.parameterData.map((item) => {
        return {attr_id: item.attr_id, attr_value: item.attr_vals}
      })
      let arr2 = this.arrayStaticData.map((item) => {
        return {attr_id: item.attr_id, attr_value: item.attr_vals}
      })
      this.form.attrs = [...arr1, ...arr2]
      //    发送网络请求
      await this.$http.post('goods', this.form)
    },
    //  上传文件触发的事件
    handleRemove (file) {
      //  移除事件触发后移除list里面的数据
      this.form.pics = this.form.pics.filter((item) => {
        return item.pic !== file.response.data.tmp_path
      })
    },
    handlePreview () {
    },
    handleSuccess (file) {
      //  上传成功后将临时路径添加到pics这个数组里面
      this.form.pics.push({pic: file.data.tmp_path})
    },
    //  tabs 点击触发的事件
    async tabClick () {
      //  商品参数页面触发的事件
      if (this.activeName === '2') {
        if (this.value.length <= 0) {
          this.$nextTick(() => {
            this.activeName = '1'
          })
          return this.$message.error('请选中三级菜单')
        }
        //  获取动态参数列表
        let res = await this.$http.get(`categories/${this.value[2]}/attributes?sel=many`)
        //  赋值
        this.parameterData = res.data.data
        this.parameterData.forEach((item) => {
          item.attr_vals = item.attr_vals.trim().length === 0 ? [] : item.attr_vals.trim().split(',')
        })
        //    商品属性页面触发的事件
      } else if (this.activeName === '3') {
        if (this.value.length <= 0) {
          this.$nextTick(() => {
            this.activeName = '1'
          })
          return this.$message.error('请选中三级菜单')
        }
        // 这里开始逻辑处理
        //  获取静态参数的数据
        let res = await this.$http.get(`categories/${this.value[2]}/attributes?sel=only`)
        this.arrayStaticData = res.data.data
      }
    },
    //  级联选择器点击后触发的事件
    handleChange () {

    },
    //   获取商品分类的事件
    async getGoodsCate () {
      let res = await this.$http.get(`categories?type=3`)
      this.options = res.data.data
    }
  },
  mounted () {
    //  获取分类数据
    this.getGoodsCate()
  }
}
</script>

<style scoped>
.alert {
  margin-top: .2rem;
  height: .4rem;
  line-height: 20px;
}

.AddFrom {
  margin-top: .1rem;
}

</style>
