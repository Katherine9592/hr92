<template>
  <!--
    路由params传值(动态路由匹配)
      1:配制路由
         {
          path:'/xxx/:id'
         }
       2:传
          this.$router.push('/xxx/123')
       3:收
          this.$route.params.id

   用户姓名显示
      1：通过id调用接口获取用户详情显示出来
      2：修改用户姓名或者密码
         a:定义接口api
         b:导入api
         c:点击更新在表单验证通过后调用api
         d:调用成功，提示一下

 -->

  <div class="detail">
    <el-card>
      <el-tabs>
        <el-tab-pane label="登录帐户设置">
          <el-form
            ref="form"
            label-width="80px"
            class="form"
            :model="form"
            :rules="rules"
          >
            <el-form-item label="姓名" prop="username">
              <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" show-password />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit">更新</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="个人详情" lazy>
          <!-- 父传子
               <xxx   :ooo="appOoo"  />   appOoo={num:10}
               xxx.vue
                  props:['ooo']
                ooo是单向数据流（父传子属性不可修改）,基本数据类型不可修改，复杂数据类型只要不修改它的引用地址，它的值随便改
                ooo能直接修改吗   ooo.num=20
           -->
          <Info :user-info="userInfo2" @getData="getData" />
        </el-tab-pane>
        <el-tab-pane label="岗位信息" lazy>
          <Job />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import { sysUser } from '@/api/user'
import { sysUserPut } from '@/api/employees'
export default {
  components: {
    Info: () => import('./components/Info.vue'),
    Job: () => import('./components/Job.vue')
  },
  data() {
    return {
      id: this.$route.params.id,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '必填',
            trigger: 'change'
          }
        ],
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
        ]
      },
      userInfo: {},
      userInfo2: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await sysUser(this.id)
      this.userInfo = res.data
      this.userInfo2 = JSON.parse(JSON.stringify(res.data))
      this.form.username = res.data.username
      console.log('用户详情', res)
    },
    // 更新按钮点击
    submit() {
      this.$refs.form.validate(async(result) => {
        if (result) {
          // 修改用户信息
          await sysUserPut({
            ...this.userInfo,
            ...this.form
          })
          this.$message.success('更新成功')
          // 更新数据
          this.getData()
          // 更新当前用户信息
          if (this.id === this.$store.state.user.userInfo.id) {
            this.$store.dispatch('user/getUserInfo')
          }
          console.log('验证通过')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.detail {
  padding: 20px;
  .form {
    width: 400px;
    margin: 40px 0 30px 120px;
  }
}
</style>
