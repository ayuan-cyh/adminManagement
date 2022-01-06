<template>
  <div id="reports">
    <my-crumbs level1="数据统计" level2="数据报表"></my-crumbs>
    <div id="main" ref="main"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'reports',
  data () {
    return {
      options2: {} //  后端请求的数据
    }
  },
  methods: {
    //  使用echarts绘制图表
    async useEcharts () {
      // 获取后端的数据
      let res = await this.$http.get('reports/type/1')
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('main'))
      //  准备数据
      //  固定数据
      let option1 = {
        title: {
          text: '数据报表'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        }
      }
      //  后端请求的数据
      let options2 = res.data.data
      //  合并数据
      let option = {...option1, ...options2}
      // 绘制图表
      myChart.setOption(option)
    }
  },
  mounted () {
    this.useEcharts()
  }
}
</script>

<style scoped>
#main {
  margin-top: .2rem;
  width: 70vw;
  height: 70vh;
}
</style>
