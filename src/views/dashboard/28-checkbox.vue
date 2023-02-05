<template>
  <div>
    <!--
      el-checkbox
          v-model:选中后所有一组checkbox的值
          label:选中该项后的值
          注意点：如果v-model=非数组  选中后变成true,取消变false
                     v-model=数组  选中后变成数组添加它对应的label的值,取消就删除该项的值
     -->
    <h1>{{ val }}</h1>
    <el-checkbox v-model="val" label="广东">广东</el-checkbox>
    <el-checkbox v-model="val" label="四川">四川</el-checkbox>
    <el-checkbox v-model="val" label="湖南">湖南</el-checkbox>
  </div>
</template>
<script>
export default {
  data() {
    return {
      val: []
    }
  }
}
</script>
<style></style>
