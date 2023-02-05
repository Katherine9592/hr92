<template>
  <!--
  查：
    1：定义接口api
    2:导入api
    3：进入页面调用接口
    4：存储数据并渲染
    5：与分页建立联系
      a:页码，页容量，total都需要定义变量，并绑定到分页组件
      b:调用接口时使用相应变量，存储total
      c:分页组件内，页码与页容量加.sync  页码与页容量改变都要请求接口

   增：
    1：点击新增打开弹框
        a:创建弹框组件
        b:导入注册使用
        c:通过ref打开弹框
    2：完成布局与表单验证
    3：调用新增api
       a：定义新增api
       b:导入api
       c:调用api
    4:调用成功
        提示
        清空表单验证与数据
        关闭弹框
        刷新父级列表数据

    删
    1：点击删除弹出确定框
    2：定义删除api
    3:导入删除api
    4:确定框点击确定时调用
    5：调用成功
        a:提示
        b:刷新列表数据（分页有坑点）
        当前页只有一条数据，且页码>1时 页码要-- 再调用接口刷新列表数据

    改
      1：点击编辑打开弹框
      2：新增弹框组件内定义一个mode用于区分场景
      3：新增与编辑打开弹框时都要修改mode
      4：调整标题
      5：编辑时数据回显（深拷贝当前行数据）
      6：如果有表单验证要调整就调整一下
      7：调用编辑api
         a:定义
         b:导入
         c:点击确定分场景调用
      8：调用成功
         a:提示
         b:关闭弹框
         c:清空表单数据与验证
         d:刷新父级列表数据

   公司信息
     1：创建一个公司信息组件
     2：导入注册使用
     3：在组件内完成布局
     4：定义api
     5:导入api
     6:调用api获取数据渲染

     给角色分配权限数据
       1：创建一个弹框组件
       2：导入注册使用
       3：点击分配权限打开弹框
       4：完成布局
       5：获取权限数据通过el-tree展示
       6：完成数据回显
       7：定义分配权限编辑api
       8:导入api
       9:点击确定调用
       10：调用成功
          a:提示
          b:关闭弹框
          c:清空勾选
          d:是否要刷新取决父级是否使用该数据
 -->

  <div class="setting">
    <el-tabs>
      <el-tab-pane label="角色管理">
        <el-button
          type="primary"
          size="small"
          @click="addEvent"
        >新增角色</el-button>

        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="80px" />
          <el-table-column label="角色" prop="name" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <el-button
                type="success"
                size="mini"
                @click="setEvent(row)"
              >分配权限</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="editEvent(row)"
              >编辑</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="delEvent(row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: right; padding-top: 20px">
          <el-pagination
            :current-page.sync="page.page"
            :page-sizes="[1, 5, 10, 100, 200, 300, 400]"
            :page-size.sync="page.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="getData"
            @current-change="getData"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="公司信息" lazy>
        <Info />
      </el-tab-pane>
    </el-tabs>
    <!-- 新增弹框组件 -->
    <Add ref="add" @getData="getData" />
    <!-- 分配权限弹框 -->
    <SetPermission ref="set" />
  </div>
</template>
<script>
import { sysRole, sysRoleDelete } from '@/api/setting'
import Add from './components/add.vue'
// import Info from './components/info'
import SetPermission from './components/setPermission'
export default {
  components: {
    Add,
    Info: () => import('./components/info'),
    SetPermission
  },
  data() {
    return {
      tableData: [],
      total: 50,
      page: {
        page: 1,
        pagesize: 10
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await sysRole(this.page)
      this.tableData = res.data.rows
      // 存储总条数
      this.total = res.data.total
      console.log('角色列表', res)
    },
    // 新增点击
    addEvent() {
      this.$refs.add.isShow = true
      this.$refs.add.mode = 'add'
    },
    // 删除点击
    delEvent(id) {
      this.$confirm('您确定删除该项吗？')
        .then(async() => {
          await sysRoleDelete(id)
          this.$message.success('删除成功')
          // 刷新列表
          // 当前页只有一条数据，且页码>1时 页码要-- 再调用接口刷新列表数据
          if (this.tableData.length === 1 && this.page.page > 1) {
            this.page.page--
          }
          this.getData()
        })
        .catch(() => {})
    },
    // 编辑点击
    editEvent(row) {
      // 打开弹框
      this.$refs.add.isShow = true
      this.$refs.add.mode = 'edit'
      // 数据回显
      this.$refs.add.form = JSON.parse(JSON.stringify(row))
    },
    // 分配权限点击
    setEvent(row) {
      // console.log(row)
      this.$refs.set.isShow = true
      // 调用弹框组件获取列表
      this.$refs.set.getData()
      // 调用弹框方法获取详情
      this.$refs.set.getRoleInfo(row.id)
      this.$refs.set.title = row.name
    }
  }
}
</script>
<style lang="scss" scoped>
.setting {
  padding: 20px;
}
</style>
