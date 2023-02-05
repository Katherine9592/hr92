<template>
  <div>
    <!-- 子传父
            子组件标签  @事件名=‘父组件事件’
            子组件内
                    this.$emit('事件名')

        组件身上使用原生事件可以通过.native修饰符
     -->

    <Son @click.native="sonClick" />
  </div>
</template>
<script>
import Son from './components/Son.vue'
export default {
  components: {
    Son
  },
  methods: {
    sonClick() {
      console.log('sonClick')
    }
  }
}
</script>
<style></style>
