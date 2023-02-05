<template>
  <div>
    <!-- 需求：num可修改可持久化用cookie处理 -->
    <h1>{{ num }}</h1>
    <button @click="setNum">修改num</button>
  </div>
</template>
<script>
import jsCookie from 'js-cookie'
// 持久化：1：值修改了存储到浏览器 2：初始值读取浏览器存储
export default {
  data() {
    return {
      num: +jsCookie.get('num') || 10
    }
  },
  methods: {
    setNum() {
      this.num++
      jsCookie.set('num', this.num)
    }
  }
}
</script>
<style></style>
