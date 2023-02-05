<template>
  <div>
    <!--
    el-dialog
       title:标题
       :visible.sync="是否显示弹框，它是boolean值"
       width:宽度
       默认插槽：内容
       具名插槽：footer
           常用于放底部按钮
    -->

    <el-button @click="btnClick">打开弹框</el-button>
    <Add ref="add" />
  </div>
</template>
<script>
import Add from './components/add.vue'
export default {
  components: {
    Add
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    btnClick() {
      //   this.isShow = true
      this.$refs.add.isShow = true
    }
  }
}
</script>
<style></style>
