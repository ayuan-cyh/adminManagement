<template>
  <div id="cateParams">
    <!--     面包屑-->
    <my-crumbs level1="商品管理" level2="分类参数"></my-crumbs>
    <!--    顶部警告-->
    <el-alert
      class="alert"
      title="只允许为第三级参数设置参数"
      type="error">
    </el-alert>
    <!--    级联选择器-->
    <el-form label-position="left" label-width="1.2rem" style="margin-top: .2rem">
      <el-form-item label="商品名称">
        <el-cascader
          :show-all-levels="false"
          v-model="value"
          :options="options"
          :props="defaultProps"
          @change="handleChange"
        >
        </el-cascader>
      </el-form-item>
    </el-form>
    <!--tabs标签页 动态参数和静态参数-->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!--      动态参数所在的标签页-->
      <el-tab-pane label="动态参数" name="1">
        <el-button type="danger" @click="ifShowDialog=true" :disabled="isDisabled">设置动态参数</el-button>
        <!--        添加动态参数的弹层-->
        <el-dialog title="添加动态参数" :visible.sync="ifShowDialog">
          <el-form :model="dynamicParams">
            <el-form-item label="属性名称" :label-width="formLabelWidth" required>
              <el-input v-model="dynamicParams.attr_name" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="ifShowDialog = false">取 消</el-button>
            <el-button type="primary" @click="addDynamicParams">确 定</el-button>
          </div>
        </el-dialog>
        <!--        动态参数表格-->
        <el-table
          :data="parameterData"
          style="width: 100%">
          <el-table-column type="expand" width="150" align="left">
            <!--            tag标签-->
            <template slot-scope="scope">
              <el-tag
                :key="i"
                v-for="(tag,i) in scope.row.attr_vals"
                closable
                :disable-transitions="false"
                @close="handleClose(scope.row,tag)">
                {{ tag }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
          </el-table-column>
          <el-table-column
            width="300"
            label='属性名称'
            prop="attr_name">
          </el-table-column>
          <el-table-column
            label="操作"
            width="300"
          >
            <template slot-scope="scope">
              <el-popconfirm
                confirm-button-text='好的'
                cancel-button-text='不用了'
                icon="el-icon-info"
                icon-color="red"
                @confirm="deleteParams(scope.row)"
                title="是否确定删除这个属性？"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  slot="reference"
                  circle size="mini" plain
                >
                </el-button>
              </el-popconfirm>
              <el-button type="primary" icon="el-icon-edit" circle size="mini" plain
                         @click="editDynamicParams(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!--      静态参数所在的标签页-->
      <el-tab-pane label="静态参数" name="2">
        <el-button type="danger" :disabled="isDisabled" @click="isShowStaticDialog=true">设置静态参数</el-button>
        <!--        添加静态参数的弹窗-->
        <el-dialog title="添加静态参数" :visible.sync="isShowStaticDialog">
          <el-form :model="staticParams">
            <el-form-item label="属性名称" :label-width="formLabelWidth" required>
              <el-input v-model="staticParams.attr_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="属性值" :label-width="formLabelWidth" required>
              <el-input v-model="staticParams.attr_vals" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isShowStaticDialog = false">取 消</el-button>
            <el-button type="primary" @click="addStaticParams">确 定</el-button>
          </div>
        </el-dialog>
        <el-table
          :data="arrayStaticData"
          style="width: 100%">
          <el-table-column type="index" label="#" width="150">
          </el-table-column>
          <el-table-column
            width="300"
            label='属性名称'
            prop="attr_name">
          </el-table-column>
          <el-table-column
            width="300"
            label='属性值'
            prop="attr_vals">
          </el-table-column>
          <el-table-column
            label="操作"
            width="300"
          >
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle size="mini" plain
                         @click="editBoxAppear(scope.row)"></el-button>
              <el-popconfirm
                confirm-button-text='好的'
                cancel-button-text='不用了'
                icon="el-icon-info"
                icon-color="red"
                @confirm="deleteParams(scope.row)"
                title="是否确定删除这个属性？"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  slot="reference"
                  circle size="mini" plain
                >
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!--    编辑静态参数的弹窗-->
    <el-dialog title="编辑静态参数" :visible.sync="isShowStaticEditDialog">
      <el-form :model="setStaticParams">
        <el-form-item label="属性名称" :label-width="formLabelWidth" required>
          <el-input v-model="setStaticParams.attr_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="属性值" :label-width="formLabelWidth" required>
          <el-input v-model="setStaticParams.attr_vals" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowStaticEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="editStaticParams">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'cateParams',
  data () {
    return {
      value: [],
      options: [],
      // 级联选择器配置项
      defaultProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      parameterData: [], //  动态参数
      arrayStaticData: [], //  静态参数
      activeName: '1',
      //  tag标签所用到的数据
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      //  添加动态参数用到的数据
      dynamicParams: {
        attr_name: '', // 参数名称
        attr_sel: 'many'
      },
      // 控制动态参数添加弹窗的出现
      ifShowDialog: false,
      formLabelWidth: '1rem',
      // 用于控制静态参数弹层的出现
      isShowStaticDialog: false,
      //  添加静态参数弹层使用的数据
      staticParams: {
        attr_vals: '',
        attr_name: '',
        attr_sel: 'only'
      },
      //  设置静态参数用到的数据
      setStaticParams: {},
      //  控制编辑静态参数弹窗出现的数据
      isShowStaticEditDialog: false
    }
  },
  computed: {
    isDisabled () {
      return !this.value[2]
    }
  },
  methods: {
    //  tag标签用到的方法
    //  点击x触发的事件
    async handleClose (attr, tag) {
      attr.attr_vals.splice(attr.attr_vals.indexOf(tag), 1)
      //   路径 categories/:id/attributes/:attrId 请求方式 put
      //  预先处理需要发送的数据
      let putData = {
        attr_name: attr.attr_name, //   动态参数名称
        attr_sel: 'many', //  动态参数列表
        attr_vals: attr.attr_vals.join(',') //  动态参数值
      }
      //  发送网络请求
      await this.$http.put(`categories/${this.value[2]}/attributes/${attr.attr_id}`, putData)
    },
    //  点击新增触发的事件
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    //  确定编辑触发的事件
    async handleInputConfirm (attr) {
      let inputValue = this.inputValue
      if (inputValue) {
        attr.attr_vals.push(inputValue)
      }
      //  预先处理需要发送的数据
      let putData = {
        attr_name: attr.attr_name, //   动态参数名称
        attr_sel: 'many', //  动态参数列表
        attr_vals: attr.attr_vals.join(',') //  动态参数值
      }
      //  发送网络请求
      await this.$http.put(`categories/${this.value[2]}/attributes/${attr.attr_id}`, putData)
      this.inputVisible = false
      this.inputValue = ''
    },
    // 添加动态参数的事件
    async addDynamicParams () {
      let {data} = await this.$http.post(`categories/${this.value[2]}/attributes`, this.dynamicParams)
      if (data.meta.status !== 201) return this.$message.error(data.meta.msg)
      this.$message.success(data.meta.msg)
      // 重新获取数据
      await this.getData()
      this.isShowStaticDialog = false
      this.ifShowDialog = false
    },
    // element组件绑定的事件,不能删除会报错
    handleClick () {
    },
    // 获取动态参数和静态参数的事件
    async getData () {
      //  获取动态参数列表
      let res = await this.$http.get(`categories/${this.value[2]}/attributes?sel=many`)
      //  赋值
      this.parameterData = res.data.data
      this.parameterData.forEach((item) => {
        item.attr_vals = item.attr_vals.trim().length === 0 ? [] : item.attr_vals.trim().split(',')
      })
      //   获取静态参数
      let res1 = await this.$http.get(`categories/${this.value[2]}/attributes?sel=only`)
      this.arrayStaticData = res1.data.data
    },
    //  级联选择器点击后触发的事件
    async handleChange () {
      if (this.value.length === 3) {
        await this.getData()
      }
    },
    //   获取商品分类的事件
    async getGoodsCate () {
      let res = await this.$http.get(`categories?type=3`)
      this.options = res.data.data
    },
    // 添加静态参数的事件
    async addStaticParams () {
      let {data} = await this.$http.post(`categories/${this.value[2]}/attributes`, this.staticParams)
      if (data.meta.status !== 201) return this.$message.error(data.meta.msg)
      this.$message.success(data.meta.msg)
      // 重新获取数据
      await this.getData()
      this.isShowStaticDialog = false
    },
    // 删除参数的事件
    async deleteParams (item) {
      let {data} = await this.$http.delete(`categories/${this.value[2]}/attributes/${item.attr_id}`)
      if (data.meta.status !== 200) return this.$message.error(data.meta.msg)
      this.$message.success(data.meta.msg)
      await this.getData()
    },
    //  编辑动态参数事件
    async editDynamicParams (item) {
      this.$prompt('请输入您要修改的参数名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async ({value}) => {
        // 预先处理数据
        let SetData = {
          attr_name: value,
          'attr_sel': 'many',
          attr_vals: item.attr_vals.join(',')
        }
        await this.$http.put(`categories/${this.value[2]}/attributes/${item.attr_id}`, SetData)
        await this.getData()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    //  编辑静态参数的事件
    async editStaticParams () {
      await this.$http.put(`categories/${this.value[2]}/attributes/${this.setStaticParams.attr_id}`, this.setStaticParams)
      await this.getData()
      this.isShowStaticEditDialog = false
    },
    //  控制编辑静态参数按钮出现的事件
    editBoxAppear (item) {
      let froms = {
        attr_id: item.attr_id,
        attr_vals: item.attr_vals,
        attr_name: item.attr_name,
        attr_sel: 'only'
      }
      this.setStaticParams = froms
      this.isShowStaticEditDialog = true
    }
  },
  mounted () {
    this.getGoodsCate()
  }
}
</script>

<style scoped>
.alert {
  margin-top: .2rem;
  height: 35px;
  line-height: .2rem;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
