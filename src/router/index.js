import Vue from 'vue'
import Router from 'vue-router'
import i18n from '@/lang' // i18n===this.$i18n
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
/*
菜单规则
   多层菜单
       children的项的长度有多个（hidden为false的项是多个）
   单层菜单
      无children
      children项只有一个(hiddren为false)
   meta: { title: '标题', icon: '图标' }
*/
/*
权限管理
  1：将路由分成二块
      静态路由：不需要权限管理的路由，默认只有静态路由
      动态路由：需要权限管理的路由，在获取用户信息后根据用户信息中的权限数据来添加
*/
// 动态路由
export const otherRoutes = [
  {
    path: '/setting',
    component: Layout,
    meta: {
      name: 'settings'
    },
    children: [
      {
        path: '',
        name: 'Setting',
        component: () => import('@/views/setting/index'),
        meta: { title: i18n.t('route.setting'), icon: 'setting' }
      }
    ]
  },
  {
    path: '/departments',
    component: Layout,
    meta: {
      name: 'departments'
    },
    children: [
      {
        path: '',
        name: 'Departments',
        component: () => import('@/views/departments/index'),
        meta: { title: '组织架构', icon: 'tree' }
      }
    ]
  },
  {
    path: '/employees',
    component: Layout,
    meta: {
      name: 'employees'
    },
    children: [
      {
        path: '',
        name: 'Employees',
        component: () => import('@/views/employees/index'),
        meta: { title: '员工', icon: 'people' }
      },
      {
        path: 'import',
        name: 'Import',
        component: () => import('@/views/employees/import'),
        hidden: true // 不在菜单中显示
      },
      {
        path: 'detail/:id',
        name: 'Detail',
        component: () => import('@/views/employees/detail'),
        hidden: true // 不在菜单中显示
      }
    ]
  },
  {
    path: '/salarys',
    component: Layout,
    meta: {
      name: 'salarys'
    },
    children: [
      {
        path: '',
        name: 'Salarys',
        component: () => import('@/views/salarys/index'),
        meta: { title: '工资', icon: 'money' }
      }
    ]
  },
  {
    path: '/social',
    component: Layout,
    meta: {
      name: 'social_securitys'
    },
    children: [
      {
        path: '',
        name: 'Social',
        component: () => import('@/views/social/index'),
        meta: { title: '社保', icon: 'table' }
      }
    ]
  },
  {
    path: '/attendances',
    component: Layout,
    meta: {
      name: 'attendances'
    },
    children: [
      {
        path: '',
        name: 'Attendances',
        component: () => import('@/views/attendances/index'),
        meta: { title: '考勤', icon: 'skill' }
      }
    ]
  },
  {
    path: '/approvals',
    component: Layout,
    meta: {
      name: 'approvals'
    },
    children: [
      {
        path: '',
        name: 'approvals',
        component: () => import('@/views/approvals/index'),
        meta: { title: '审批', icon: 'tree-table' }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    meta: {
      name: 'permissions'
    },
    children: [
      {
        path: '',
        name: 'Permission',
        component: () => import('@/views/permission/index'),
        meta: { title: '权限管理', icon: 'lock' }
      }
    ]
  }
]
// 静态路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    // meta: { title: '404', icon: 'dashboard' }
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        beforeEnter(to, from, next) {
          console.log('beforeEnter')
          next()
        },
        meta: { title: i18n.t('route.dashboard'), icon: 'dashboard' }
      }
    ]
  }

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    // routes: [...constantRoutes, ...otherRoutes]
    routes: constantRoutes
  })

const router = createRouter() //  addRoutes添加过的

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
