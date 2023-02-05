<template>
  <div>
    <!--
    this.$confirm('内容','标题',{
        可以修改确定与取消按钮文本
        type:图标
    }).then(()=>{
        点击了确定
    }).catch(()=>{
        点击了取消
    })
 -->
    <button @click="btnClick">确定框</button>
  </div>
</template>
<script>
export default {
  methods: {
    btnClick() {
      this.$confirm('消息内容', '消息标题', {
        confirmButtonText: '你确定退出吗',
        cancelButtonText: '点错了',
        type: 'warning'
      })
        .then(() => {
          console.log('确定')
        })
        .catch(() => {
          console.log('取消')
        })
    }
  }
}
</script>
<style></style>
