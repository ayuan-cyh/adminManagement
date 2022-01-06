<template>
  <div id="userList">
    <!--  面包屑-->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
    </el-row>
    <!--    搜索和添加-->
    <el-row style="margin-top: 30px">
      <el-col>
        <el-input placeholder="请输入内容" v-model="val" class="input-with-select" style="width: 30vw" clearable
                  @clear="clearData">
          <el-button slot="append" icon="el-icon-search" @click="searchData"></el-button>
        </el-input>
        <el-button type="primary" round @click="dialogFormVisible=true">添加用户</el-button>
        <!--        add组件如果点击了添加用户的按钮弹出组件-->
        <!--        新增用户的弹窗组件-->
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
            <el-button @click="dialogFormVisible=false">取 消</el-button>
            <el-button type="primary" @click="adduser">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
    <!--    表格区域-->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="mobile"
        width="180"
        label="电话号">
      </el-table-column>
      <el-table-column
        prop="email"
        width="180"
        label="邮箱地址">
      </el-table-column>
      <el-table-column
        width="180"
        label="创建时间">
        <template slot-scope="slot">
          {{ formatData(slot.row.create_time) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="mg_state"
        width="180"
        label="用户状态">
        <template slot-scope="slot" v-if="slot.row.username!=='admin'">
          <el-switch
            v-model="slot.row.mg_state"
            active-color="#13ce66"
            @change="changeMgState(slot.row)"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="操作">
        <template slot-scope="scope" v-if="scope.row.username!=='admin'">
          <el-button type="danger" icon="el-icon-delete" circle size="mini" plain
                     @click="deleteOne(scope.row.id)"></el-button>
          <el-button type="primary" icon="el-icon-edit" circle size="mini" plain
                     @click="editBoxAppear(scope.row)"></el-button>
          <el-button type="success" icon="el-icon-check" circle size="mini" plain
                     @click="userBoxEvent(scope.row)"
          ></el-button>
        </template>
      </el-table-column>

    </el-table>
    <userBox :userBox.sync="userBox" :userBoxFormData="userBoxFormData" :userList="userList"
             :nowUserId="nowUserId"></userBox>
    <edit :dialogFormVisible="editBox" :editFormData="editFormData"></edit>
    <!--    分页区域-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10, 15]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import add from '../../components/alertBox/add'
import edit from '../../components/alertBox/edit'
import userBox from '../../components/alertBox/userBox'

export default {
  name: 'userList',
  components: {
    add, edit, userBox
  },
  data () {
    return {
      val: '',
      tableData: [],
      pagenum: 1,
      pagesize: 5,
      total: 0,
      dialogFormVisible: false,
      editBox: false,
      editFormData: {},
      userBox: false,
      userBoxFormData: {},
      userList: [],
      nowUserId: -1,
      form: {}

    }
  },
  methods: {
    //  点击对勾触发的事件
    async userBoxEvent (data) {
      this.userBox = true
      this.userBoxFormData = data
      //  查询所有的角色列表
      const res = await this.$http.get('roles')
      this.userList = res.data.data
      //  查询当前的角色id
      let res1 = await this.$http.get(`users/${data.id}`)
      this.nowUserId = res1.data.data.rid
    },
    //  改变用户状态的事件
    async changeMgState (data) {
      await this.$http.put(`users/${data.id}/state/${data.mg_state}`)
    },
    async loadData () {
      const {data: {data: {total, users}, meta: {msg, status}}} = await this.$http({
        url: 'users',
        method: 'get',
        params: {
          'query': this.val,
          'pagenum': this.pagenum,
          'pagesize': this.pagesize
        }
      })
      if (!(status === 200)) return this.$message.error(msg)
      this.$message.success(msg)
      this.tableData = users
      this.total = total
    },
    formatData (val) {
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
    },
    handleSizeChange (val) {
      this.pagenum = 1
      this.pagesize = val
      this.loadData()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.loadData()
    },
    //  搜索按钮触发的事件
    searchData () {
      this.loadData()
    },
    //  搜索框中清除按钮触发的事件
    clearData () {
      this.val = ''
      this.loadData()
    },
    //  用于接收add组件传递的数据用于关闭弹窗和传递表单数据
    async adduser () {
      this.dialogFormVisible = false
      const {data: {meta: {msg, status}}} = await this.$http.post('users', this.form)
      if (!(status === 201)) return this.$message.warning(msg)
      this.$message.success(msg)
      await this.loadData()
    },
    //  删除按钮点击时触发的事件
    async deleteOne (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data: {meta: {msg, status}}} = await this.$http.delete(`users/${id}`)
        if (!(status === 200)) return this.$message.error(msg)
        this.$message.success(msg)
        this.pagenum = 1
        await this.loadData()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    //  关闭添加用户弹窗的事件
    shutdownbox (val) {
      this.dialogFormVisible = val
    },
    //  用于关闭编辑框的事件
    shutDownEditBox (val) {
      this.editBox = val
    },
    //   点击编辑按钮弹出编辑框的事件
    editBoxAppear (data) {
      this.toEditData(data)
      this.$bus.$emit('getFromData', data)
      this.editBox = true
    },
    //    用于向edit组件传递数据
    toEditData (data) {
      this.$bus.$emit('toEditData', data)
    },
    //    编辑用户的事件
    async editUser (data) {
      const res = await this.$http({
        url: `users/${data.id}`,
        method: 'put',
        data: {
          email: data.email,
          mobile: data.mobile
        }
      })
      let {data: {meta: {status, msg}}} = res
      if (!(status === 200)) return this.$message.error(msg)
      this.$message.success(msg)
      this.editBox = false
    }
  },
  mounted () {
    this.loadData()
    this.$bus.$on('shutBox', this.adduser)
    this.$bus.$on('shutDownEvent', this.shutdownbox)
    this.$bus.$on('shutDownEditBox', this.shutDownEditBox)
    this.$bus.$on('editUser', this.editUser)
  },
  beforeDestroy () {
    this.$bus.$off('shutBox')
    this.$bus.$off('shutDownEvent')
    this.$bus.$off('shutDownEditBox')
    this.$bus.$off('editUser')
  }
}
</script>

<style scoped>

</style>
