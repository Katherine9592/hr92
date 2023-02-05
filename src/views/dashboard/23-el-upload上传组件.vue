<template>
  <div>
    <!-- 上传组件
    el-upload
        action:上传的接口地址（必传参数）
        http-request:自定义上传
        before-upload:上传前的钩子，常用于上传前限制上传文件大小与类型  return true 正常上传 false 中止上传
        show-file-list：是否显示已上传文件列表  默认是true
 -->
    <el-upload
      :http-request="httpRequest"
      action="#"
      :before-upload="beforeUpload"
      :show-file-list="false"
    >
      <span v-if="!imgUrl">上传图片</span>
      <img else :src="imgUrl" alt="">
    </el-upload>
  </div>
</template>
<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDf7JpO2CbXQO7dqulNfKnF0CfuxznsAqF',
  SecretKey: 'TH1c6g3qNjriqdJkhTBfkZ8SVTB5oHZm'
})
export default {
  data() {
    return {
      imgUrl: ''
    }
  },
  created() {},
  methods: {
    // 上传前
    beforeUpload(file) {
      console.log(file)
      // 只允许 上传jpg与png
      const limitType = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!limitType) {
        this.$message.error('只允许上传jpg与png图片')
      }
      // 只允许 上传100kb内的图片
      const limitSize = file.size / 1024 < 100
      if (!limitSize) {
        this.$message.error('只允许上传100kb内的图片')
      }
      return limitType && limitSize
    },
    httpRequest(res) {
      // res.file拿到上传的文件对象
      console.log(res.file)
      cos.uploadFile(
        {
          Bucket: 'abc-1305249343' /* 填写自己的bucket，必须字段 */,
          Region: 'ap-chongqing' /* 存储桶所在地域，必须字段 */,
          Key: res.file
            .name /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */,
          Body: res.file, // 上传文件对象
          SliceSize:
            1024 *
            1024 *
            0.5 /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */,
          onProgress: (progressData) => {
            console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          if (err) {
            console.log('上传失败', err)
          } else {
            this.imgUrl = 'http://' + data.Location
            console.log('上传成功')
          }
        }
      )
    }
  }
}
</script>
<style></style>
