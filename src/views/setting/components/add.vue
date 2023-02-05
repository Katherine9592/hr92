<template>
  <el-dialog
    :title="title"
    width="600px"
    :visible.sync="isShow"
    @close="closeEvent"
  >
    <el-form ref="form" label-width="100px" :model="form" :rules="rules">
      <el-form-item prop="name" label="角色名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item prop="description" label="角色描述">
        <el-input v-model="form.description" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="text-align: right">
        <el-button>取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { sysRolePost, sysRolePut } from '@/api/setting'
export default {
  data() {
    return {
      isShow: false,
      mode: 'add', // add:新增  edit:编辑
      form: {
        name: '', //	string	必须		角色名称
        description: '' //	string	必须		角色描述
      },
      rules: {
        name: [{ required: true, message: '必填', trigger: 'change' }], //	string	必须		角色名称
        description: [{ required: true, message: '必填', trigger: 'change' }] //	string	必须		角色描述
      }
    }
  },
  computed: {
    title() {
      if (this.mode === 'add') {
        return '新增角色'
      }
      return '编辑角色'
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(async(result) => {
        if (result) {
          if (this.mode === 'add') {
            await sysRolePost(this.form)
            this.$message.success('新增角色成功')
          } else if (this.mode === 'edit') {
            await sysRolePut(this.form)
            this.$message.success('编辑角色成功')
          }
          this.isShow = false
          this.$emit('getData')
        }
      })
    },
    closeEvent() {
      this.$refs.form.resetFields()
      this.form = {
        name: '', //	string	必须		角色名称
        description: '' //	string	必须		角色描述
      }
    }
  }
}
</script>
<style></style>
