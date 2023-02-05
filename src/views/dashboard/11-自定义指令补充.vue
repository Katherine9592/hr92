<template>
  <div>
    <!--
      指令的生命周期
      bind:绑定类似beforeMount
      inserted:渲染：类似mounted
      update:更新（指令所在组件有更新时执行，不保证更新完成），
      componentUpdated：更新完成时，类似updated
      unbind:解绑（指令所在dom销毁时）
      bind(dom,obj,vnode){
        dom:指令所在dom
        obj:{
          属性
          修饰符
          值(value)
        },
        vnode:{
          节点信息
          context:指令所在组件的this
        }
      }
      指令的使用
        v-指令名:属性名.修饰符=值
     -->
    <!-- 实现v-hmtext='值' -->
    <div v-hmtext.html="str" />
    <input v-xxx type="text">
  </div>
</template>
<script>
export default {
  directives: {
    hmtext: {
      inserted(dom, obj, vnode) {
        console.log(vnode.context.num)
        if (obj.modifiers.html) {
          dom.innerHTML = obj.value
        } else {
          dom.innerText = obj.value
        }
      },
      componentUpdated(dom, obj, vnode) {
        if (obj.modifiers.html) {
          dom.innerHTML = obj.value
        } else {
          dom.innerText = obj.value
        }
      }
    }
  },
  data() {
    return {
      str: '<h1>hello</h1>',
      num: 123
    }
  }
}
</script>
<style></style>
