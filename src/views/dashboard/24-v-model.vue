<template>
  <div>
    <!-- <HmModel :value="fatherValue" @input="fatherValue = $event" /> -->
    <HmModel v-model="fatherValue" />
    <!--
        v-model:作用：值的双向绑定，它后面一定要是一个变量值
        <xxx  :value="ooo" @input="ooo=$event"  >
        <xxx  v-model="ooo"  >
         xxx.vue
            props:['value']
            model:{
                prop:'value',
                event:'input'
            }
            this.$emit('input',实参值)
     -->
  </div>
</template>
<script>
import HmModel from './components/HmModel.vue'
export default {
  components: {
    HmModel
  },
  data() {
    return {
      fatherValue: 10
    }
  }
}
</script>
<style></style>
