<template>
  <div>
    <h3>自定义指令</h3>
    <!--
        指令的使用：v-指令名:属性名.修饰符=值
                   v-on:keyup.enter="方法"
        定义：
            全局自定义指令
                Vue.directive('指令名',{
                     指令的生命周期
                     bind:beforeMount:绑定时，指令绑定到dom上了，但是还没有完成渲染
                     inserted:mounted：指令所在dom渲染完成,
                     update:指令所在组件有更新，但不保证更新完成
                     componentUpdated:updated：指令所在组件更新完成了(包括子组件)
                     unbind:destroyed：指令所在dom销毁了（v-if=false）
                })
            局部自定义指令
               directives:{
                   指令名:{
                    指令的生命周期
                   }
               }
     -->
    {{ xxx }}
    <button @click="xxx++">修改xxx</button>
    <br>
    <input v-if="bol" v-focus="val" type="text">
    <h3>{{ val }}</h3>
    <button @click="val++">修改val</button>
    <button @click="bol = !bol">切换显示input</button>
    <br>
    <img
      v-imgerror
      alt=""
      src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf123.png"
    >
  </div>
</template>
<script>
export default {
  directives: {
    focus: {
      inserted(dom, obj, vnode) {
        // dom:指令所在dom
        // obj:{value}
        // vnode:指令所在dom的节点信息，包括指令所在组件实例对象:{context:指令所在组件的this  }
        dom.focus()
        dom.value = obj.value
      },
      update() {
        console.log('指令所在组件有更新')
      },
      componentUpdated(dom, obj, vnode) {
        dom.value = obj.value
      },
      unbind() {
        console.log('指令所在dom销毁了')
      }
    },
    imgerror: {
      inserted(dom, obj, vnode) {
        dom.src = dom.src || require('@/assets/common/head.jpg')
        dom.onerror = () => {
          dom.src = require('@/assets/common/head.jpg')
        }
      },
      componentUpdated() {
        dom.src = dom.src || require('@/assets/common/head.jpg')
      }
    }
  },
  data() {
    return {
      val: 1,
      xxx: 100,
      bol: true
    }
  }
}
</script>
<style></style>
