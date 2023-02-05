<template>
  <div>
    <!-- beforeUpload:上传前的一个回调函数 -->
    <!-- onSuccess:解析excel成功后的回调函数 -->
    <UploadExcel :on-success="onSuccess" />
  </div>
</template>
<script>
import UploadExcel from '@/components/UploadExcel/index.vue'
import { sysUserBatch } from '@/api/employees'
import { excelTojsTime } from '@/utils/index'
export default {
  components: {
    UploadExcel
  },
  methods: {
    async onSuccess(res) {
      // res就是解析excel后的数据
      //   {header:头部标题数据,results:列表数据}

      const arr = res.results.map((item) => {
        return {
          timeOfEntry: excelTojsTime(item['入职日期']),
          username: item['姓名'],
          workNumber: item['工号'],
          mobile: item['手机号'],
          correctionTime: excelTojsTime(item['转正日期'])
        }
      })
      // 接口调用
      await sysUserBatch(arr)
      this.$message.success('导入成功')
      this.$router.push('/employees')
      console.log(res.results, arr)
    }
  }
}
</script>
<style></style>
