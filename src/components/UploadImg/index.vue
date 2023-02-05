<template>
  <div class="upload-img">
    <el-upload
      action="#"
      :http-request="httpRequest"
      class="upload"
      :show-file-list="false"
      :before-upload="beforeUpload"
    >
      <img v-if="value" v-errorimg class="img" :src="value" alt="">
      <div v-else class="icon">
        <i class="el-icon-plus" />
      </div>
    </el-upload>
    <!-- 删除按钮 -->
    <i v-if="value" class="del el-icon-delete" @click="delClick" />
    <!-- 预览按钮 -->
    <i v-if="value" class="big el-icon-zoom-in" @click="showBig = true" />
    <!-- 预览弹窗 -->
    <el-dialog title="图片预览" width="600px" :visible.sync="showBig">
      <div style="text-align: center">
        <img v-errorimg style="width: 500px" :src="value" alt="">
      </div>
    </el-dialog>
    <!-- 进度条 -->
    <el-progress
      v-if="showProgress"
      :width="200"
      class="progress"
      type="circle"
      :percentage="percentage"
    />
  </div>
</template>
<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDf7JpO2CbXQO7dqulNfKnF0CfuxznsAqF',
  SecretKey: 'TH1c6g3qNjriqdJkhTBfkZ8SVTB5oHZm'
})
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      imgUrl: '',
      showBig: false,
      showProgress: false,
      percentage: 0
    }
  },
  methods: {
    httpRequest(res) {
      this.showProgress = true
      cos.uploadFile(
        {
          Bucket: 'abc-1305249343', // 存储桶
          Region: 'ap-chongqing', // 服务器地址
          Key: res.file.name, // 上传文件的标识  常使用文件名
          Body: res.file, // 上传文件对象
          SliceSize: 1024 * 1024 * 0.5, // 用于上传大文件做断点续传处理
          onProgress: (progressData) => {
            // 上传过程中的进度值
            this.percentage = +(progressData.percent * 100).toFixed(2)
            if (progressData.percent === 1) {
              this.showProgress = false
            }
            // console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          // 上传成功后的返回值  err:上传失败的错误信息  data:成功后返回的数据
          if (err) {
            console.log('上传失败', err)
          } else {
            // 图片能不能显示？
            // this.imgUrl = 'http://' + data.Location
            // this.value = 'http://' + data.Location
            this.$emit('input', 'http://' + data.Location)
            // console.log('上传成功', data)
          }
        }
      )
    },
    // 上传前回调
    beforeUpload(file) {
      const limitType = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!limitType) {
        this.$message.error('请上传jpg与png图片')
      }
      const limitSize = file.size / 1024 / 1024 < 1
      if (!limitSize) {
        this.$message.error('请上传1Mb以内图片')
      }
      return limitType && limitSize
    },
    // 删除点击事件
    delClick() {
      this.$confirm('您确定删除该图片吗')
        .then(() => {
          this.$emit('input', '')
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.upload {
  width: 200px;
  height: 200px;
  border: 1px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0;
  line-height: 0px;

  .el-icon-plus {
    font-size: 24px;
    color: #ccc;
  }
  .icon {
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .img {
    width: 200px;
    height: 200px;
    object-fit: contain;
  }
}
.upload-img {
  position: relative;
  width: 200px;
  &:hover {
    .del,
    .big {
      display: block;
    }
  }
  .del,
  .big {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 20px;
    cursor: pointer;
    display: none;
    &:hover {
      color: red;
    }
  }
  .big {
    right: 30px;
  }
}
.progress {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
}
</style>
