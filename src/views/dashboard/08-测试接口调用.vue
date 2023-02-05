<template>
  <div>
    首页

    <button @click="btnClick">调用一个不需要token接口</button>
  </div>
</template>
<script>
import { sysLogin } from '@/api/test'
export default {
  methods: {
    async btnClick() {
      await sysLogin()
    }
  }
}
</script>
<style></style>
