<template>
  <!-- 增删改查：查  增  删与改
       查：
        1：定义接口api
        2:导入api
        3:进入页面就调用api获取数据存储
        4：数据渲染

       增：
        1：点击新增打开一个弹框
            弹框组件封装成一个单独组件
            导入注册使用
            点击按钮打开弹框
        2：完成弹框组件布局（表单处理）
        3：完成表单验证
        4：调用新增api
            定义新增api
            导入新增api
            点击确定调用新增api
        5:调用成功
            提示
            关闭弹框
            关闭弹框时清空内容
            刷新父级列表数据

        删
         1：点击删除弹出确定框
         2：定义删除api
         3:导入删除api
         4:确定框点击确定再调用删除api
         5:调用成功
            提示
            刷新列表数据

        改
          需要做的事件：
             1：打开弹框
             2：修改标题
             3：数据回显
             4：点击确定要调用编辑api
          步骤
            1：点击编辑按钮打开弹框
            2：在新增弹框组件内定义了一个mode
            3:新增与编辑点击打开弹框时都需要修改mode的值，用于区分新增与编辑场景
            4：根据mode调整标题
            5：编辑时打开编辑需要回显数据（数据使用深拷贝）
            6：表单验证调整
            7：定义编辑api
            8:导入编辑api
            9:点击确定要分场景调用
            10：调用成功
                提示
                关闭弹框
                清空列表数据（做了手动清空form）
                刷新父级列表
 -->

  <div
    v-loading="loading"
    class="departments"
    element-loading-text="加载中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-card>
      <div class="main">
        <div class="tree-top">
          <div class="name">传智教育</div>
          <div class="manager">负责人</div>
          <!-- el-dropdown
                     默认插槽：默认展示 内容
                     具名插槽（dropdown）
                       el-dropdown-menu
                          el-dropdown-item
           -->
          <div class="other">
            <el-dropdown>
              <span>
                <span>操作</span>
                <i class="el-icon-arrow-down" />
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    @click.native="addEvent('')"
                  >添加子部门</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <el-tree style="margin-top: 15px" :data="list" default-expand-all>
          <template v-slot="{ data }">
            <div class="tree-top">
              <div class="name">{{ data.name }}</div>
              <div class="manager">{{ data.manager }}</div>
              <div class="other">
                <el-dropdown>
                  <span>
                    <span>操作</span>
                    <i class="el-icon-arrow-down" />
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item
                        @click.native="addEvent(data.id)"
                      >添加子部门</el-dropdown-item>
                      <el-dropdown-item
                        @click.native="editEvent(data)"
                      >编辑部门</el-dropdown-item>
                      <el-dropdown-item
                        @click.native="delEvent(data.id)"
                      >删除部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>
          </template>
        </el-tree>
      </div>
    </el-card>
    <!-- 新增弹框组件 -->
    <!-- 子传父
        子组件标签  @事件名=‘父组件方法’
        子组件内：this.$emit('事件名'，参数值)
     -->
    <Add ref="add" :init-list="initList" @getData="getData" />
  </div>
</template>
<script>
import { companyDepartment, companyDepartmentDelete } from '@/api/departments'
import Add from './components/add.vue'
import { changeData } from '@/utils'
// .js  .vue  utils/package.json   utils/index.js  utils/index.vue
export default {
  components: {
    Add
  },
  data() {
    return {
      loading: false,
      list: [],
      initList: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      this.loading = true
      const res = await companyDepartment()
      this.loading = false
      this.initList = res.data.depts
      this.list = changeData(res.data.depts, '')
    },
    // 树形数据转换
    // changeData(arr, pid) {
    //   // 1:找出第一层数据
    //   // 2:能找出任意项的子集（将pid使用形参）
    //   // 3:给找出的每一项加入children=[]
    //   // 4:使用递归找出当前项的子集（子集的pid是自己的id）
    //   return arr.filter((item) => {
    //     if (item.pid === pid) {
    //       item.children = this.changeData(arr, item.id)
    //       return true
    //     }
    //   })
    // },
    // 新增点击事件
    addEvent(id) {
      this.$refs.add.isShow = true
      this.$refs.add.form.pid = id
      // 新增打开时修改mode为add
      this.$refs.add.mode = 'add'
    },
    // 删除点击事件
    delEvent(id) {
      this.$confirm('您确定删除该项吗?', '提示')
        .then(async() => {
          await companyDepartmentDelete(id)
          this.$message.success('删除成功')
          this.getData()
        })
        .catch(() => {})
    },
    // 编辑按钮点击
    editEvent(data) {
      // console.log(data)
      // 打开弹框
      this.$refs.add.isShow = true
      // 新增打开时修改mode为edit
      this.$refs.add.mode = 'edit'
      // 深拷贝数据
      this.$refs.add.form = JSON.parse(JSON.stringify(data))
    }
  }
}
</script>
<style lang="scss" scoped>
.departments {
  padding: 15px;
  min-height: 100vh;
  .main {
    width: 80%;
    margin: 30px auto;
  }
  .tree-top {
    width: 100%;
    display: flex;
    align-items: center;
    .name {
      flex: 1;
    }
    .manager {
      width: 150px;
    }
  }
}
</style>
