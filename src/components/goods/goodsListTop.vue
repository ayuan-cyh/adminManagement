<template>
  <div id="goodsListTop">
    <el-input placeholder="请输入内容" v-model="input3" class="input-with-select ipt">
      <el-button slot="append" icon="el-icon-search" @click="searchEvent"></el-button>
    </el-input>
    <el-button type="primary" @click="$router.push({name:'goodsadd'})">添加商品</el-button>
  </div>
</template>

<script>
export default {
  name: 'goodsListTop',
  data () {
    return {
      input3: ''
    }
  },
  methods: {
    async searchEvent () {
      this.$bus.$emit('searchData', this.input3)
    }
  }
}
</script>

<style scoped>
.ipt {
  margin-top: 20px;
  width: 30vw;
}
</style>
