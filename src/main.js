// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//  引入自定义的面包屑组件
import mycrubs from './components/publicComponents/my-crumbs'
// 引入elementUI组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import httpPlugin from './plugins/httpPlugin'
import globalFunc from './plugins/globalFunc'
//  挂载elementUI
Vue.use(ElementUI)
// 挂载全局方法插件
Vue.use(globalFunc)
Vue.config.productionTip = false
// 挂载axios插件
Vue.use(httpPlugin)

//  挂载全局自定义组件 组件名称是组件内的name属性
Vue.component(mycrubs.name, mycrubs)
/* eslint-disable no-new */
new Vue({

  el: '#app',
  router,
  beforeCreate () {
    Vue.prototype.$bus = this // 安装全局事件总线，$bus就是当前应用的vm
  },
  components: {App},
  template: '<App/>'
})
