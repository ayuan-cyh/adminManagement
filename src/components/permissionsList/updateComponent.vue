<template>
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible" @open="openEvent">
    <!--
             :data="treeData"   树形结构的数据
          :props="defaultProps"  标记数据的children和label对应的key
          title="分配权限"       title值
          show-checkbox        展示复选框
          default-expand-all  默认展开所有的标签
          node-key="id"  子节点的键名 必须
          :default-checked-keys="checkKeys"  选中节点的数组
       -->
    <el-tree
      :data="treeData"
      :props="defaultProps"
      title="分配权限"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="checkKeys"
      ref="tree"
    >
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:ifShow',false)">取 消</el-button>
      <el-button type="primary" @click="updateRole">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'updateComponent',
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      nowRoleId: -1, // 当前角色id
      checkKeys: []
    }
  },
  methods: {
    //  点击弹窗确认按钮触发的事件
    async updateRole () {
      //  获取全选的按钮
      let arr1 = this.$refs.tree.getCheckedKeys()
      //  获取全部办选按钮
      let arr2 = this.$refs.tree.getHalfCheckedKeys()
      //  全部节点
      let arr = [...arr1, ...arr2]
      await this.$http.post(`roles/${this.nowRoleId}/rights`, {
        //  将数组用逗号分隔转为字符串
        rids: arr.join(',')
      })
      this.$emit('update:ifShow', false)
      this.$emit('tableLoad')
    },
    //  打开弹窗后触发的事件
    async openEvent () {
      const res = await this.$http.get(`rights/tree`)
      let {data: {data}} = res
      this.nowRoleId = this.nowRole.id
      this.treeData = data
      const arr = []
      this.nowRole.children.forEach((item) => {
        item.children.forEach((item1) => {
          item1.children.forEach((item2) => {
            arr.push(item2.id)
          })
        })
      })
      this.checkKeys = arr
    }
  },
  props: ['ifShow', 'nowRole'],
  watch: {
    ifShow: {
      immediate: true,
      handler () {
        this.dialogFormVisible = this.ifShow
      }
    }
  }
}
</script>

<style scoped>

</style>
