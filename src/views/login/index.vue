<template>
  <!--
  完成登录：获取token
  1:定义接口api方法
  2：导入api方法
  3：点击登陆在表单验证通过后调用api方法
  4：调用成功
       保存token
       跳转到首页
 -->

  <div class="login">
    <el-form ref="form" class="form" :model="form" :rules="rules">
      <img class="logo" src="@/assets/common/login-logo.png" alt="">
      <el-form-item prop="mobile">
        <el-input v-model="form.mobile" prefix-icon="el-icon-user-solid" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          prefix-icon="el-icon-lock"
          show-password
          @keyup.enter.native="submit"
        />
      </el-form-item>
      <el-form-item>
        <!-- 登录 -->
        <el-button type="primary" class="btn" @click="submit">{{
          $t('login.login')
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { sysLogin } from '@/api/login'

export default {
  data() {
    return {
      form: {
        mobile: '13800000002', //	string	必须		手机号
        password: '123456' //	string	必须		密码
      },
      rules: {
        mobile: [
          {
            required: true,
            message: this.$t('login.tip'),
            trigger: 'change'
          },
          {
            pattern: /^1[3,9]\d{9}$/,
            message: '请正确输入手机号',
            trigger: 'change'
          }
        ], //	string	必须		手机号
        password: [
          {
            required: true,
            message: '必填',
            trigger: 'change'
          },
          {
            min: 6,
            max: 12,
            message: '请输入6-12位密码',
            trigger: 'change'
          }
        ] //	string	必须		密码
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(async(result) => {
        if (result) {
          const res = await sysLogin(this.form)

          // 存储token
          this.$store.dispatch('user/setToken', res.data)
          // 提示一下
          this.$message.success('登录成功')
          // 跳转到首页
          this.$router.push('/')
          // token:vuex
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// @:代表src  html js中代表src  style中不是 ~@代表src
// vue-cli 5.x版本后 @:代表src
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('~@/assets/common/login.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  .form {
    height: 400px;
    .logo {
      padding: 0 15px 20px 15px;
    }
    .btn {
      width: 100%;
      height: 60px;
      background-color: #407ffe;
      font-size: 24px;
    }
    ::v-deep .el-input__inner {
      height: 55px;
      background-color: #c9deff;
    }
    ::v-deep .el-form-item__error {
      color: #fff;
    }
  }
}
</style>
