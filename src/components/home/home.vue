<template>
  <el-container class="container">
    <!--    顶部nav区域-->
    <el-header class="header">
      <el-row>
        <!--        顶部logo区域-->
        <el-col :span="4">
          <div class="grid-content bg-purple imgBox">
            <img src="../../assets/img/logo2.png" alt="">
          </div>
        </el-col>
        <!--        中间区域-->
        <el-col :span="16">
          <div class="grid-content bg-purple-light middleBox">
            <h2 class="navTitle">Admin后台管理系统</h2>
          </div>
        </el-col>
        <!--        nav右侧区域 退出区域-->
        <el-col :span="4" class="">
          <div class="grid-content bg-purple rightBox">
            <div>
              <el-button type="danger" plain @click="loginOut">退出登录</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!--      侧边栏区域-->
      <el-aside width="200px" class="aside">
        <el-menu
          class="el-menu-vertical-demo"
          :unique-opened="true"
          :router="true"
          active-text-color="#409EFF"
        >
          <!--          动态菜单-->
          <el-submenu :index="''+item.order" v-for="(item,i) in menus" :key="i">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item :index="item2.path" v-for="(item2,i) in item.children" :key="i">
              <i class="el-icon-location"></i>{{ item2.authName }}
            </el-menu-item>
          </el-submenu>
          <!--          静态菜单-->
          <el-submenu index="staticMenu">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>关于我们</span>
            </template>
            <el-menu-item index="about">
              <i class="el-icon-user-solid"></i>关于
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <el-card class="box-card">
          <router-view></router-view>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      menus: []
    }
  },
  methods: {
    //  获取动态列表的事件
    async getMenus () {
      const res = await this.$http.get('menus')
      this.menus = res.data.data
    },
    //  退出登录的事件
    loginOut () {
      localStorage.clear()
      this.$router.push({name: 'login'})
    }
  },
  beforeMount () {
    this.getMenus()
  }

}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

.header {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-bottom: 1px solid #dcdfe6;

}

.aside {
  background-color: #d3dce6;
}

.main {
  background-color: #e9eef3;
  height: 100%;
}

.imgBox {
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 50px;
  box-sizing: border-box;
}

.imgBox > img {
  height: 100%;

}

.navTitle {
  text-align: center;
  line-height: 60px;
  color: #3AAFFF;
  font-size: 20px;
}

.rightBox {
  display: flex;
  height: 60px;
  align-items: center;
  text-align: center;
  justify-content: center;
  cursor: pointer;
}

.box-card {
  height: 100%;
  box-sizing: border-box;
}

</style>
