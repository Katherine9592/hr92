<template>
  <div>
    父组件拿到上传的文件路径22222：{{ img }}
    <br>
    <!-- <UploadImg :value="img" @input="img = $event" /> -->
    <UploadImg v-model="img" />
  </div>
</template>
<script>
import UploadImg from '@/components/UploadImg'
export default {
  components: {
    UploadImg
  },
  data() {
    return {
      img: 'http://abc-1305249343.cos.ap-chongqing.myqcloud.com/1c2f813bbe7f22f575927fc7fe6c4281.png'
    }
  }
}
</script>
<style></style>
