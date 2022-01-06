<template>
  <div id="loginBody">
    <div id="loginBox">
      <el-form label-position="top" label-width="80px" :model="formData" :rules="rules" :ref="formData">
        <h2 class="title">用户登录</h2>
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="formData.username" required></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
        <p>
          <el-button type="primary" plain :style="{width: '100%'}" @click="submitForm(formData)">登录</el-button>
        </p>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      formData: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          // {min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur'},
          {pattern: /^[a-zA-Z0-9_.@~!?]{4,16}$/, message: '5到17位字符由字母开头、数字组合'}
          // {regexp: '/^[a-zA-Z][a-zA-Z0-9_.@~!?]{4,16}$/', message: '格式不正确', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {pattern: /^[a-zA-Z0-9_.@~!?]{4,16}$/, message: '4到17位字符由字母、数字组合可以使用_.@~!?'}
        ]
      }
    }
  },
  methods: {
    async submitForm (formName) {
      //  触发框架的表单验证事件
      this.$refs[formName].validate(async (valid) => {
        //  如果验证成功后触发的事件
        if (valid) {
          const {data, data: {meta: {msg, status}}} = await this.$http.post('login', this.formData)
          //  错误处理如果状态码不等于200说明发生错误反之则没有错误
          if (!(status === 200)) return this.$message.error(msg)
          //  将服务器发送的token数据通过localStorage存储到本地
          localStorage.setItem('token', data.data.token)
          this.$message.success(msg)
          //  路由跳转到home页面
          this.$router.push({name: 'about'})
        } else { //  失败后触发的事件
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
#loginBody {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

#loginBody::before {
  content: '';
  display: block;
  background: url("../../assets/img/back.jpg") no-repeat center;
  filter: brightness(.5);
  width: 100%;
  height: 100vh;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -10;
}

#loginBox {
  width: 40vw;
  height: 60vh;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 30px;
  box-sizing: border-box;
}

.title {
  padding-bottom: 5px;
}
</style>
