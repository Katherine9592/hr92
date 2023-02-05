<template>
  <div>
    <button @click="btnClick">全屏切换</button>
  </div>
</template>
<script>
import screenFull from 'screenfull'
export default {
  methods: {
    btnClick() {
      screenFull.toggle()
    }
  }
}
</script>
<style></style>
