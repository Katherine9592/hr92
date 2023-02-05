<template>
  <div :class="{ 'has-logo': showLogo }" class="sidebar">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(['sidebar']),
    routes() {
      console.log('this.$router', this.$router)
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss" scoped>
#app .sidebar {
  background-color: #5687fe;
  // 1:权重不够  2：没选中
  background-image: url('~@/assets/common/leftnavBg.png');
  background-repeat: no-repeat;
  background-position: 0 100%;
  .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
    ::v-deep a {
      &.router-link-exact-active,
      &:hover {
        .svg-icon {
          color: #43a7fe;
        }
        span {
          color: #43a7fe;
        }
        background-color: #fff;
      }
      li {
        .svg-icon {
          color: #fff;
          font-size: 18px;
          vertical-align: middle;
          .icon {
            color: #fff;
          }
        }
        span {
          color: #fff;
        }
      }
    }
  }
}
</style>
