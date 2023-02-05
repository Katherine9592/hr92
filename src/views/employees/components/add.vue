<template>
  <!-- 部门选择：
        1：布局 el-tree
        2:在输入框聚焦时调用接口获取组织架构数据
           a:导入组织构架的api
           b:在输入框绑定聚焦事件
           c:在聚焦时调用api获取数据并存储
           d:转换成树形结构渲染
   -->

  <el-dialog
    title="新增员工"
    width="600px"
    :visible.sync="isShow"
    @close="closeEvent"
  >
    <el-form ref="form" label-width="100px" :model="form" :rules="rules">
      <el-form-item prop="username" label="姓名">
        <el-input v-model.trim="form.username" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item prop="mobile" label="手机号">
        <el-input v-model.trim="form.mobile" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item prop="timeOfEntry" label="入职时间">
        <!-- value-format="yyyy-MM-dd" -->
        <el-date-picker
          v-model.trim="form.timeOfEntry"
          placeholder="请选择入职时间"
        />
      </el-form-item>
      <el-form-item prop="formOfEmployment" label="聘用形式">
        <el-select
          v-model.trim="form.formOfEmployment"
          placeholder="请输入聘用形式"
        >
          <el-option
            v-for="item in employeesData.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="workNumber" label="工号">
        <el-input v-model.trim="form.workNumber" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item prop="departmentName" label="部门">
        <!--
            1:控制el-tree(组织架构的显示与消失)
                默认不显示
                聚焦时才显示
                选择某项后消失
            2：减少接口调用（只调用一次接口获取组织架构数据）
         -->
        <el-input
          v-model.trim="form.departmentName"
          placeholder="请输入部门"
          readonly
          @focus="focusEvent"
        />
        <el-tree
          v-if="showTree"
          :data="treeData"
          :props="{ label: 'name', children: 'children' }"
          @node-click="treeClick"
        />
      </el-form-item>
      <el-form-item prop="correctionTime" label="转正时间">
        <!-- value-format="yyyy-MM-dd" -->
        <el-date-picker
          v-model.trim="form.correctionTime"
          placeholder="请选择转正时间"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="center">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button>取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import employeesData from '@/api/constant/employees'
import { companyDepartment } from '@/api/departments'
import { changeData } from '@/utils/index'
import { sysUserPost } from '@/api/employees'
export default {
  data() {
    return {
      isShow: false,
      employeesData: employeesData,
      treeData: [],
      showTree: false,
      form: {
        username: '', //	string	非必须		姓名
        mobile: '', //	string	非必须		手机号
        timeOfEntry: '', //	string	非必须		入职时间
        formOfEmployment: '', //	number	非必须		聘用形式
        workNumber: '', //	string	非必须		工号
        departmentName: '', //	string	非必须		组织名称
        correctionTime: '' //	string	非必须		转正时间
      },
      rules: {
        username: [
          { required: true, message: '必填', trigger: 'change' },
          {
            min: 2,
            max: 10,
            message: '请正确输入姓名,要求2-10字符',
            trigger: 'change'
          }
        ], //	string	非必须		姓名
        mobile: [
          { required: true, message: '必填', trigger: 'change' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '请正确输入手机号',
            trigger: 'change'
          }
        ], //	string	非必须		手机号
        timeOfEntry: [{ required: true, message: '必填', trigger: 'change' }], //	string	非必须		入职时间
        formOfEmployment: [
          { required: true, message: '必填', trigger: 'change' }
        ], //	number	非必须		聘用形式
        workNumber: [{ required: true, message: '必填', trigger: 'change' }], //	string	非必须		工号
        departmentName: [
          { required: true, message: '必填', trigger: 'change' }
        ], //	string	非必须		组织名称
        correctionTime: [{ required: true, message: '必填', trigger: 'change' }] //	string	非必须		转正时间
      }
    }
  },
  methods: {
    // 部门选择聚焦事件
    async focusEvent() {
      this.showTree = true
      if (this.treeData.length === 0) {
        const res = await companyDepartment()
        // 树形数据转换并存储
        this.treeData = changeData(res.data.depts, '')
        console.log('组织架构数据获取', res)
      }
    },
    // tree节点点击
    treeClick(obj) {
      console.log(obj.name)
      //   关闭el-tree
      this.showTree = false
      // 拿到选择项的值赋值给输入框
      this.form.departmentName = obj.name
    },
    // 确定点击
    submit() {
      this.$refs.form.validate(async(result) => {
        if (result) {
          await sysUserPost(this.form)
          //   提示
          this.$message.success('新增员工成功')
          //   关闭弹框
          this.isShow = false
          //   刷新父级列表
          this.$emit('getData')
          console.log('验证通过')
        }
      })
    },
    // 清空表单数据与验证
    closeEvent() {
      this.$refs.form.resetFields()
      this.form = {
        username: '', //	string	非必须		姓名
        mobile: '', //	string	非必须		手机号
        timeOfEntry: '', //	string	非必须		入职时间
        formOfEmployment: '', //	number	非必须		聘用形式
        workNumber: '', //	string	非必须		工号
        departmentName: '', //	string	非必须		组织名称
        correctionTime: '' //	string	非必须		转正时间
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.center {
  text-align: center;
}
</style>
