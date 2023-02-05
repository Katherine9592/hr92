<template>
  <div>
    <!--
       qrcode:将字符串转换成二维码
         1:下载  npm i qrcode
         2:导入 import Qrcode from 'qrcode'
         3:容器放二维码
            canvas标签  ref='canvas'
         4:Qrcode.toCanvas('放二维码的dom','需要转换的字符串',{width:number类型})
            最小高度与宽度限制（100多像素）
         注意：canvas能获取到（canvas渲染完成后调用toCanvas）
    -->
    <button @click="btnClick">点击生成二维码</button>
    <el-dialog title="生成二维码" width="500px" :visible.sync="bol">
      <canvas ref="xxx" />
    </el-dialog>
  </div>
</template>
<script>
import Qrcode from 'qrcode'
export default {
  data() {
    return {
      bol: false
    }
  },
  created() {},
  methods: {
    btnClick() {
      this.bol = true
      this.$nextTick(() => {
        Qrcode.toCanvas(this.$refs.xxx, 'http://www.baidu.com', { width: 200 })
      })
    }
  }
}
</script>
<style></style>
