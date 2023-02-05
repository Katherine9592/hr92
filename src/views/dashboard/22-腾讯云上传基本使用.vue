<template>
  <div>
    <input type="file" @change="changeEvent">
    <div>{{ imgUrl }}</div>
    <img :src="imgUrl" alt="">
  </div>
</template>
<script>
/*
对象存储
  1：先有一个file文件对象
  2:使用腾讯云上传文件对象
     a:下载插件  npm i cos-js-sdk-v5
     b:导入插件  import COS　from　＂cos-js-sdk-v5＂
     c：验证身份
      var cos = new COS({
        SecretId: 'SECRETID',
        SecretKey: 'SECRETKEY',
    });
    ｄ：上传对象
      cos.uploadFile({
      Bucket: 'examplebucket-1250000000',
      Region: 'COS_REGION',
      Key: '1.jpg',
      Body: file, // 上传文件对象
      SliceSize: 1024 * 1024 * 5,
      onProgress: function(progressData) {
          console.log(JSON.stringify(progressData));
      }
  }, function(err, data) {
      if (err) {
        console.log('上传失败', err);
      } else {
        console.log('上传成功');
      }
  })
*/
import COS from 'cos-js-sdk-v5'

export default {
  data() {
    return {
      cos: '',
      imgUrl: ''
    }
  },
  created() {
    this.cos = new COS({
      SecretId: 'AKIDf7JpO2CbXQO7dqulNfKnF0CfuxznsAqF',
      SecretKey: 'TH1c6g3qNjriqdJkhTBfkZ8SVTB5oHZm'
    })
  },
  methods: {
    changeEvent(e) {
      console.log(e.target.files[0])
      this.cos.uploadFile(
        {
          Bucket: 'abc-1305249343', // 存储桶
          Region: 'ap-chongqing', // 服务器地址
          Key: e.target.files[0].name, // 上传文件的标识  常使用文件名
          Body: e.target.files[0], // 上传文件对象
          SliceSize: 1024 * 1024 * 0.5, // 用于上传大文件做断点续传处理
          onProgress: (progressData) => {
            // 上传过程中的进度值
            console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          // 上传成功后的返回值  err:上传失败的错误信息  data:成功后返回的数据
          if (err) {
            console.log('上传失败', err)
          } else {
            // 图片能不能显示？
            this.imgUrl = 'http://' + data.Location
            console.log('上传成功', data)
          }
        }
      )
    }
  }
}
</script>
<style></style>
