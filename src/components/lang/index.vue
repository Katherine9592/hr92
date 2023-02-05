<template>
  <el-dropdown>
    <span>
      <svg-icon class="icon" icon-class="language" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <!-- 获取语言标识 ：this.$i18n.locale -->
        <el-dropdown-item
          :disabled="$i18n.locale === 'zh'"
          @click.native="changeLang('zh')"
        >中文</el-dropdown-item>
        <el-dropdown-item
          :disabled="$i18n.locale === 'en'"
          @click.native="changeLang('en')"
        >en</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script>
import jsCookie from 'js-cookie'
export default {
  methods: {
    changeLang(code) {
      this.$i18n.locale = code
      // 存储到浏览器 建议存储cookie
      // cookie:它会主动参与接口请求 localStorage
      jsCookie.set('lang', code)
      // 刷新
      this.$router.go(0)
    }
  }
}
</script>
<style lang="scss" scoped>
.icon {
  color: #fff;
  font-size: 20px;
}
</style>
