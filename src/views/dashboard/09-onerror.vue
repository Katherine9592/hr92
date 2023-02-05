<template>
  <div>
    <img
      ref="img"
      src="http://q6cu3t6jv.bkt.clouddn.com/1063705989926227968?t=1616204161907"
      alt=""
    >
    <!-- 图片加载出错就使用默认图片
    dom.onerror=()=>{
        // dom加载出错时执行
    }
     -->
  </div>
</template>
<script>
export default {
  //   created() {
  //     this.$nextTick(() => {
  //       console.log(this.$refs.img)
  //     })
  //   }
  mounted() {
    this.$refs.img.onerror = () => {
      // dom加载出错时执行
      console.log('图片加载出错了')
      this.$refs.img.src = require('@/assets/common/head.jpg')
    }
  }
}
</script>
<style></style>
