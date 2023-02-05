<template>
  <div>
    <!--
    vue-print-nb
      1:下载  npm i vue-print-nb
      2:导入（main.js）
        import Print from 'vue-print-nb'
        Vue.use(Print)
      3:需要打印区域加  id
        div  id='xxx'
      4:  button  v-print="{id:'xxx'}"
 -->
    <h3>标题</h3>
    <div id="abc">我是需要打印的内容</div>
    <button v-print="{ id: 'abc', popTitle: '123' }">打印</button>
  </div>
</template>
<script>
export default {}
</script>
<style></style>
