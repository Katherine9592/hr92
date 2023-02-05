<template>
  <div>
    <h1>我是xxx</h1>
    <slot :data="0" node="我是数据" />
    <slot name="aaa" abc="999" />
    <h1>我是底部</h1>
  </div>
</template>
<script>
export default {}
</script>
<style></style>
