<template>
  <div>
    <!-- .sync:修饰符：值的双向绑定
           它也是父子传值的语法糖
                 子组件标签  :属性名='父组件属性'  @update:属性名="父组件属性=$event"
                 子组件标签  :属性名.sync='父组件属性'
                 子组件内  props:['属性名']   this.$emit('update:属性名',实参值)
    -->
    <!-- 需求：+  1  - -->
    <!-- <Num :total="total" @update:total="total = $event" /> -->
    <Num :total.sync="total" />
  </div>
</template>
<script>
import Num from './components/num'
export default {
  components: {
    Num
  },
  data() {
    return {
      total: 100
    }
  }
}
</script>
<style></style>
