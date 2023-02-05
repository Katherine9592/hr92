<template>
  <div>
    <!-- 作用域插槽
       插槽基础上传值
          默认插槽
              定义
                 xxx组件内
                     <slot num='1' />
              使用
                 <xxx>
                     <template v-slot={num}>
                        ......
                      </template>
                 </xxx>
          具名插槽
              定义
                 xxx组件内
                     <slot name='aaa' num='1' />
              使用
                 <xxx>
                     <template #aaa={num}>
                        ......
                      </template>
                 </xxx>
 -->
    <hm-tree>
      <template v-slot="{ data, node }">
        <div>{{ node }}-----{{ data }}</div>
      </template>
      <template #aaa="{ abc }">
        <div>我是具名插槽aaa---{{ abc }}</div>
      </template>
    </hm-tree>
  </div>
</template>
<script>
import HmTree from './components/xxx.vue'
export default {
  components: {
    HmTree
  }
}
</script>
<style></style>
