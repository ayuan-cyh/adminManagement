import axios from 'axios'
// 导出插件
export default {
  // 使用install关键字安装vue这里的vue就相当于全局对象中的vue可以操作原型的数据
  install (Vue) {
    axios.defaults.baseURL = 'http://118.31.246.242:8888/api/private/v1'
    // 添加请求拦截器
    axios.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      if (config.url !== 'login') {
        config.headers.Authorization = localStorage.getItem('token')
      }
      return config
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    })
    //  添加响应拦截器
    axios.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      return response
    }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error)
    })

    Vue.prototype.$http = axios
  }
}
