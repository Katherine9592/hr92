<template>
  <div>
    <!--
  路由是什么？
     指向，将地址指向一个组件
  全局路由勾子
     beforeEach:所有路由跳转前都会经过它
     afterEach:已进入了相应路由后才会执行
     beforeResolve:解析勾子
  路由所对应组件勾子(只有路由配制的组件才有)
     beforeRouteEnter:解析组件前的勾子（找到了路由所对应组件）
     beforeRouteUpdate:路由所对应组件不变，但是路由地址变化了
     beforeRouteLeave:路由离开前的勾子
  路由配制勾子
     beforeEnter:读取路由配制时勾子
 -->
    <button @click="$router.push('/?id=' + Date.now())">跳转路由</button>
  </div>
</template>
<script>
export default {
  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter')
    next()
  },
  beforeRouteUpdate(to, from, next) {
    console.log(this.$route.query.id)
    console.log('beforeRouteUpdate', to)
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave')
    next()
  },
  beforeDestroy() {
    console.log('beforeDestroy:首页', this.$route.path)
  },
  created() {
    console.log('created')
  }
}
</script>
<style></style>
