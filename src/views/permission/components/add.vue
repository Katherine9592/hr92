<template>
  <!-- 表单验证
        1：表单元素值的绑定
        2:el-form
              model  rules   ref
        3:el-form-item  prop
 -->

  <el-dialog
    :title="title"
    width="600px"
    :visible.sync="isShow"
    @close="closeEvent"
  >
    <el-form ref="form" label-width="120px" :model="form" :rules="rules">
      <el-form-item prop="name" label="权限名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item prop="code" label="权限标识">
        <el-input v-model="form.code" />
      </el-form-item>
      <el-form-item prop="description" label="权限描述">
        <el-input v-model="form.description" />
      </el-form-item>
      <el-form-item prop="enVisible" label="开启">
        <el-switch
          v-model="form.enVisible"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="tc">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button>取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { sysPermissionPost, sysPermissionPut } from '@/api/permission'
export default {
  data() {
    return {
      mode: 'add', // add:新增  edit:编辑
      isShow: false,
      form: {
        name: '', //	string	非必须
        code: '', //	string	非必须
        description: '', //	string	非必须
        enVisible: '1', //	string	非必须   enVisible： ‘0’：关闭  ‘1’：打开
        type: 1, //	number	非必须  type=1:页面  2：按钮
        pid: '0' //	string	非必须   '0':最外层数据
      },
      rules: {
        name: [{ required: true, message: '必填', trigger: 'change' }], //	string	非必须
        code: [{ required: true, message: '必填', trigger: 'change' }] //	string	非必须
      }
    }
  },
  computed: {
    title() {
      if (this.mode === 'add') {
        return '新增权限'
      } else if (this.mode === 'edit') {
        return '编辑权限'
      }
      return ''
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(async(result) => {
        if (result) {
          if (this.mode === 'add') {
            await sysPermissionPost(this.form)
            this.$message.success('添加成功')
          } else if (this.mode === 'edit') {
            await sysPermissionPut(this.form)
            this.$message.success('编辑成功')
          }
          this.isShow = false
          this.$emit('getData')
          console.log('验证通过')
        }
      })
    },
    closeEvent() {
      this.$refs.form.resetFields()
      this.form = {
        name: '', //	string	非必须
        code: '', //	string	非必须
        description: '', //	string	非必须
        enVisible: '1', //	string	非必须
        type: 1, //	number	非必须
        pid: '0' //	string	非必须
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tc {
  text-align: center;
}
</style>
