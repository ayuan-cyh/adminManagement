<template>
  <div id="goodsCategories">
    <!--  面包屑-->
    <my-crumbs level1="商品管理" level2="商品分类"></my-crumbs>
    <!--    添加分类-->
    <el-button type="info"
               style="margin-top: .2rem"
               @click="showBox"
    >添加分类
    </el-button>
    <!--表格-->
    <goodsCateTable></goodsCateTable>
    <!--    分页器-->
    <goodsCatePaper></goodsCatePaper>
    <!--    添加分类的弹层-->
    <goodCateAdd :ifShow.sync="ifShow"></goodCateAdd>
  </div>
</template>

<script>
import goodsCateTable from '../../components/goods/goodsCateTable'
import goodsCatePaper from '../../components/goods/goodsCatePaper'
import goodCateAdd from '../../components/goods/goodCateAdd'

export default {
  components: {
    goodsCateTable, goodsCatePaper, goodCateAdd
  },
  name: 'goodsCategories',
  data () {
    return {
      tableData: [],
      ifShow: false

    }
  },
  methods: {
    showBox () {
      this.ifShow = !this.ifShow
    }
  }
}
</script>

<style scoped>

</style>
