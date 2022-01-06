// 导出插件
import dayjs from 'dayjs'

export default {
  // 使用install关键字安装vue这里的vue就相当于全局对象中的vue可以操作原型的数据
  install (Vue) {
    Vue.prototype.FormatDate = (val) => {
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
    }
    Vue.prototype.hello = () => {
      console.log('test')
    }
  }
}
