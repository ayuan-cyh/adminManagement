<template>
  <div id="permissionsList">
    <!--  面包屑-->
    <my-crumbs level1="权限管理" level2="权限列表"></my-crumbs>
    <!--    表格-->
    <permissionsTable></permissionsTable>
  </div>
</template>

<script>
import permissionsTable from '../components/permissionsList/permissionsTable'

export default {
  name: 'permissionsList',
  components: {
    permissionsTable
  }
}
</script>

<style scoped>
#permissionsList{
  box-sizing: border-box;
}

</style>
