<template>
  <div class="navbar">
    <hamburger
      :is-active="$store.state.app.sidebar.opened"
      class="hamburger-container"
      @click.native="iconClick"
    />
    <div class="name">
      <span> 江苏传智播客教育科技股份有限公司 </span>
      <span class="tip">体验版</span>
    </div>
    <Lang class="mr" />
    <svg-icon icon-class="fullscreen" class="mr" @click="fullClick" />
    <el-dropdown trigger="click">
      <div class="user">
        <img
          v-errorimg="avatar"
          class="avatar"
          :src="$store.state.user.userInfo.staffPhoto"
          alt=""
        >
        <span class="username">{{ $store.state.user.userInfo.username }}</span>
        <i class="el-icon-caret-bottom" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            @click.native="$router.push('/')"
          >首页</el-dropdown-item>
          <el-dropdown-item @click.native="toGit">项目地址</el-dropdown-item>
          <el-dropdown-item divided @click.native="exit">登出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script>
import hamburger from '@/components/Hamburger'
import screenFull from 'screenfull'
import Lang from '@/components/lang'
export default {
  components: {
    hamburger,
    Lang
  },
  data() {
    return {
      avatar: require('@/assets/common/img.jpeg')
    }
  },
  methods: {
    // 全屏点击
    fullClick() {
      if (screenFull.isEnabled) {
        screenFull.toggle()
      } else {
        this.$message.error('该浏览器不支持全屏')
      }
      console.log(screenFull)
    },
    iconClick() {
      this.$store.dispatch('app/toggleSideBar')
      // console.log('iconClick')
    },
    // 跳转到项目git地址
    toGit() {
      location.href = 'https://gitee.com/dhf481229/hr92.git'
    },
    // 退出登录
    exit() {
      this.$confirm('您确定退出该网站吗')
        .then(() => {
          // 1:提示
          this.$message.success('退出成功')
          // 2：删除token与用户信息
          this.$store.commit('user/LOGOUT')
          // 3：跳转到登陆页
          this.$router.push('/login')
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  background-color: #4777fa;
  display: flex;
  align-items: center;
  color: #fff;
  .hamburger-container {
    cursor: pointer;
    ::v-deep svg {
      fill: #fff;
    }
  }
  .name {
    flex: 1;
    .tip {
      padding: 6px;
      border-radius: 8px;
      background-color: #84a9fe;
      margin-left: 15px;
      font-size: 12px;
    }
  }
  .user {
    display: flex;
    align-items: center;
    margin-right: 15px;
    color: #fff;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .username {
      margin: 0 12px;
    }
  }
}
.mr {
  margin-right: 15px;
  cursor: pointer;
}
</style>
