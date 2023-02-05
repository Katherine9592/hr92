<template>
  <div>
    excel导出
    <el-button @click="excelOutClick">导出excel</el-button>
    <el-button @click="excelOutClick2">导出复杂表头excel</el-button>
  </div>
</template>
<script>
import { export_json_to_excel } from '@/vendor/Export2Excel'
export default {
  methods: {
    excelOutClick() {
      // filename:下载的文件名
      // header:excel头部标题['姓名',"年龄"]
      // data：数据:[[对应标题的值(姓名的值,年龄的值)]]

      export_json_to_excel({
        filename: '测试excel导出',
        header: ['姓名', '手机号'],
        data: [
          ['孙财', '13800000003'],
          ['罗晓晓', '13800000004']
        ]
      })
    },
    excelOutClick2() {
      // filename:下载的文件名
      // header:excel头部标题['姓名',"年龄"]
      // data：数据:[[对应标题的值(姓名的值,年龄的值)]]
      // multiHeader:复合型表头[[表头数据,....],[...]]
      // merges:['哪一项:哪一项合并(A1:A2)']
      export_json_to_excel({
        filename: '测试excel导出',
        header: ['姓名', '手机号'],
        data: [
          ['孙财', '13800000003'],
          ['罗晓晓', '13800000004']
        ],
        multiHeader: [
          ['人员信息', '手机号'],
          ['', '工作人员手机号'],
          ['用户信息', '']
        ],
        merges: ['A1:A2', 'A3:B3']
      })
    }
  }
}
</script>
<style></style>
