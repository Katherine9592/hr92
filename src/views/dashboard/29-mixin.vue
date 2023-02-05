<template>
  <div>
    <!--
  局部混入
     1：封装一个js（封装了组件的js部分）
        export default { data,生命周期，过滤器，自定义指令,methods。。。。。  }
     2：
       导入  import 名字  from '路径'
       mixins:[名字]
  全局混入（所有组件都可使用）
      1：封装一个js（封装了组件的js部分）
        export default { data,生命周期，过滤器，自定义指令,methods。。。。。  }
      2：在main.js
         import 名字  from '路径'
         Vue.mixin(名字)
   注意点：重名了，以当前组件的值为主
 -->

    <h1>{{ num }}</h1>
    <button @click="add">点击++</button>
  </div>
</template>
<script>
import NumMixin from './mixins'
export default {
  mixins: [NumMixin],
  data() {
    return {
      num: 999
    }
  }
}
</script>
<style></style>
