<template>
  <!--
  查：
    1：定义api
    2:导入与调用
    3：存储与渲染
    4：如果有分页，与分页建立关联
       a:接口传参要是data中数据
       b:分页组件要与data数据关联
       c:分页组件中页码与页容量要加.sync双向绑定
       d:总条数要存储起来并加到分页组件渲染
       e:页码改变与页容量改变都要调用接口

  增
    1：创建弹框组件
    2：导入注册使用
    3：点击新增打开弹框
    4：完成布布
    5：表单验证
    6：定义新增api
    7:导入与调用
    8：调用成功
       a:提示
       b:关闭弹框
       c:清空表单数据与验证
       d:刷新父级列表

  改：
     1：点击编辑打开弹框
     2：在弹框内定义一个mode
     3:新增与编辑点击时都修改mode成相应的值
     4：根据mode调整标题
     5:编辑时要回显数据（通过深拷贝相应数据）
     6:如果有表单验证要调整就调整
     7：定义编辑api
     8:导入编辑api
     9:点击确定时分场景调用api
    10:调用成功
       a:提示
       b:关闭弹框
       c:清空表单数据与验证
       d:刷新父级列表

    删
      1：点击删除弹出确定框
      2：定义删除api
      3:导入删除api
      4:确定框点击确定调用删除api
      5:调用成功
         提示
         刷新列表
           有分页：  页码>1 且当前页.length===1
                     页码--
                     刷新列表
                     页码=1 刷新列表

 -->

  <div class="permission">
    <el-card class="top">
      <div class="tr">
        <el-button
          type="primary"
          size="mini"
          @click="addEvent"
        >添加权限</el-button>
      </div>
    </el-card>
    <!-- 树形table
              1:数据要有children
              2:el-table  row-key="唯一标识的字段名"
     -->

    <el-table :data="list" border row-key="id">
      <el-table-column label="名称" prop="name" />
      <el-table-column label="标识" prop="code" />
      <el-table-column label="描述" prop="description" />
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button
            v-if="row.type === 1"
            type="text"
            @click="addEvent2(row.id)"
          >添加</el-button>
          <el-button type="text" @click="editEvent(row)">编辑</el-button>
          <el-button type="text" @click="delEvent(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增弹框组件 -->
    <Add ref="add" @getData="getData" />
  </div>
</template>
<script>
import { sysPermission, sysPermissionDelete } from '@/api/permission'
import Add from './components/add'
export default {
  components: {
    Add
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await sysPermission()
      this.list = this.changeData(res.data, '0')
      // console.log('列表数据', res)
      console.table(res.data)
    },
    // 树形数据转换
    changeData(arr, pid) {
      // 1:获取第一层的数据
      // 2:将pid的值变成形参(可以取任意层数据)
      // 3:给找出的每一项加children=[]
      // 4:通过递归找出每一项的子集（子集的pid是自己的id）
      return arr.filter((item) => {
        if (item.pid === pid) {
          item.children = this.changeData(arr, item.id)
          return true
        }
      })
    },
    // 新增点击
    addEvent() {
      this.$refs.add.isShow = true
      this.$refs.add.mode = 'add'
    },
    addEvent2(id) {
      this.$refs.add.isShow = true
      this.$refs.add.mode = 'add'
      this.$refs.add.form.type = 2
      this.$refs.add.form.pid = id
    },
    // 编辑点击
    editEvent(row) {
      // 打开弹框
      this.$refs.add.isShow = true
      this.$refs.add.mode = 'edit'
      // 数据回显
      this.$refs.add.form = JSON.parse(JSON.stringify(row))
      console.log(row)
    },
    // 删除点击
    async delEvent(id) {
      this.$confirm('您确定删除该项吗?')
        .then(async() => {
          await sysPermissionDelete(id)
          this.$message.success('删除成功')
          this.getData()
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.permission {
  padding: 20px;
  .top {
    margin-bottom: 15px;
  }
  .tr {
    text-align: right;
  }
}
</style>
