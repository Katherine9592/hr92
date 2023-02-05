<template>
  <!-- 基本表单验证
        1：表单的值绑定
           el-input绑定
        2:el-form
              model:整个表单的数据
              rules:规则
                {
                  prop的值:[
                  {required:true,message:'错误信息',trigger:'change/blur'},
                  {pattern:正则,message:'错误信息',trigger:'change/blur'},
                  {min:最小长度,max:'最大长度',message:'错误信息',trigger:'change/blur'},
                  ]
                }
        3：el-form-item
              prop="需要验证项的字段名"
 -->
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item>
        <el-button @click="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '必填', trigger: 'change' }],
        password: [{ required: true, message: '必填', trigger: 'change' }]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate((result) => {
        console.log(result)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.item {
  display: flex;
}
</style>
