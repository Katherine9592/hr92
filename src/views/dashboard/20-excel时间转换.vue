<template>
  <div>
    <!--
    excel时间：从1900年到现在的天数，从1开始计算（多算了一天），时差8小时
    js时间戳：1970年到现在的毫秒数，从0开始计算
    excel转换成js时间要怎么处理？

 -->
  </div>
</template>
<script>
export default {
  created() {
    const num = 43719 // excel时间
    const t = new Date((num - 1) * 24 * 60 * 60 * 1000 - 8 * 60 * 60 * 1000)
    t.setYear(t.getFullYear() - 70)
    console.log(t.toLocaleString())
  }
}
</script>
<style></style>
