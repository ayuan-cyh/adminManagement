<template>
  <div id="about">
    <my-crumbs level1="关于我们" level2="关于"></my-crumbs>
    <el-row style="margin-top: 20px;text-align: center" class="aboutTitle">
      <el-col>About</el-col>
    </el-row>
    <hr>
    <el-row class="desc">
      <p style="text-indent: .3rem;line-height: .3rem">
        一个简洁美观的后台管理系统,集成了用户管理,权限管理,商品管理,订单管理,数据统计等功能,如果遇到权限不足情况请登录超管admin,请不要随意更改admin的权限,
        系统集成了,角色管理,权限管理,商品管理,订单管理,数据统计等功能,部分功能可能并不完善后续会进行补全,本项目仅为演示学习使用
        超管账号:admin 密码 123456
        侧边栏采用动态侧边栏,如果遇到侧边栏为空等情况请重新进行登录
      </p>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'about'
}
</script>

<style scoped>
.desc {
  margin-top: 50px;
  color: #999;
  font-size: 16px;
  letter-spacing: .04rem;
}

.aboutTitle {
  color: #3AAFFF;
}

</style>
