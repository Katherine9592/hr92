<template>
  <div>
    <!-- 需求：选择省份   广东  湖北   广西 -->
    <el-dropdown trigger="click">
      <span>选择省份</span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>广东</el-dropdown-item>
          <el-dropdown-item disabled>湖北</el-dropdown-item>
          <el-dropdown-item>广西</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script>
export default {}
</script>
<style></style>
