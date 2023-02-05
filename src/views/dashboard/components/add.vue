<template>
  <el-dialog title="新增弹框" width="600px" :visible.sync="isShow">
    <div>弹框内容</div>
    <template #footer>
      <div>
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      isShow: false
    }
  }
}
</script>
<style></style>
