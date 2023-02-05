<template>
  <div>
    首页

    <button @click="btnClick">调用api</button>
  </div>
</template>
<script>
import { sysLogin } from '@/api/test.js'
export default {
  methods: {
    async btnClick() {
      await sysLogin()
    }
  }
}
</script>
<style></style>
