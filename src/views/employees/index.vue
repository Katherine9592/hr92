<template>
  <!-- 查
        1：定义api
        2:导入api
        3:调用api获取数据存储
        4：与分页关联
      增：
        1：创建新增弹框组件
        2：导入注册使用
        3：点击新增打开弹框
        4：完成弹框内的布局
        5：表单验证
        6：定义新增api
        7:导入新增api
        8:点击确定调用新增api
        9:调用成功
          a:提示
          b:弹框关闭
          c:清空表单数据与验证
          d:刷新父级列表数据
      删
        1：点击删除弹出确定框
        2：定义删除api
        3:导入删除api
        4:确定框点击确定才调用删除api
        5:调用成功
           a:提示
           b:刷新列表数据
              注意点：
                如果当前页只有一条数据 且页码>1
                  页码--  再刷新列表

       excel导出
         1：导入excel导出方法
         2：绑定导出按钮点击事件
         3：获取所有用户的列表数据
         4：将数据转换成excel所需要的格式
         5：调用excel导出方法实现导出
         6：导出成功
             提示

      分配角色（没有新增弹框的编辑）
        1：创建分配角色弹框
        2：在父组件使用
        3：点击分配角色打开弹框
        4：完成内部布局
        5：调用接口获取角色列表数据
        6：完成已有角色回显
        7：如果有表单处理需要完成表单验证
        8：定义编辑api
        9:导入api
        10:点击确定调用api
        11:调用成功
           提示
           关闭弹框
           清空数据
           刷新列表（看父级有没有展示它，有展示才刷新）
 -->
  <div class="employees">
    <el-card class="mb15">
      <div class="top">
        <div class="left">
          <i class="el-icon-info" />
          <span>共{{ total }}条记录</span>
        </div>
        <div class="right">
          <el-button
            size="mini"
            type="danger"
            @click="exportClick"
          >普通excel导出</el-button>
          <el-button size="mini" type="info">复杂表头excel导出</el-button>
          <el-button
            size="mini"
            type="success"
            @click="$router.push('/employees/import')"
          >excel导入</el-button>
          <!--
            页面跳转
            1：创建导入的组件
            2：配制路由
            3：实现路由跳转
           -->
          <el-button
            size="mini"
            type="primary"
            @click="addEvent"
          >新增员工</el-button>
        </div>
      </div>
    </el-card>
    <el-card>
      <el-table :data="list" border>
        <el-table-column label="序号" type="index" width="50px" />
        <el-table-column prop="username" label="姓名" sortable />
        <el-table-column prop="staffPhoto" label="头像">
          <template v-slot="{ row }">
            <img
              v-errorimg
              class="avatar"
              :src="row.staffPhoto"
              alt=""
              @click="imgClick(row.staffPhoto)"
            >
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" />
        <el-table-column prop="workNumber" label="工号" />
        <el-table-column
          prop="formOfEmployment"
          :formatter="changeFormOfEmployment"
          label="聘用形式"
        />
        <el-table-column prop="departmentName" label="部门" />
        <el-table-column
          prop="timeOfEntry"
          :formatter="changeTime"
          label="入职时间"
        />
        <el-table-column
          prop="enableState"
          :formatter="changeEnableState"
          label="状态"
        />
        <el-table-column label="操作" width="300px">
          <template v-slot="{ row }">
            <el-button
              type="text"
              @click="$router.push('/employees/detail/' + row.id)"
            >查看</el-button>
            <el-button type="text">转正</el-button>
            <el-button type="text">调岗</el-button>
            <el-button type="text">离职</el-button>
            <el-button
              v-if="isShowBtn('employees_roleBtn')"
              type="text"
              @click="roleEvent(row)"
            >角色</el-button>
            <el-button
              v-if="isShowBtn('employees_delBtn')"
              type="text"
              @click="delEvent(row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          :current-page.sync="page.page"
          :page-size.sync="page.size"
          :page-sizes="[1, 10, 20, 50, 100, 200, 300]"
          :total="total"
          layout="total,sizes,prev,pager,next"
          @current-change="getData"
          @size-change="getData"
        />
      </div>
    </el-card>
    <!-- 新增弹框组件 -->
    <Add ref="add" @getData="getData" />
    <el-dialog title="生成二维码" width="500px" :visible.sync="showCode">
      <div style="text-align: center">
        <canvas ref="canvas" />
      </div>
    </el-dialog>
    <!-- 分配角色弹框 -->
    <SetRole ref="setRole" />
  </div>
</template>
<script>
import { sysUser, sysUserDelete } from '@/api/employees'
import employeesData from '@/api/constant/employees'
import Add from './components/add'
import dayjs from 'dayjs'
import { export_json_to_excel } from '@/vendor/Export2Excel'
import Qrcode from 'qrcode'
import SetRole from './components/setRole'
export default {
  components: {
    Add,
    SetRole
  },
  data() {
    return {
      showCode: false,
      list: [],
      total: 10,
      page: {
        page: 1,
        size: 10
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await sysUser(this.page)
      // 存储total
      this.total = res.data.total
      this.list = res.data.rows
      console.log('员工列表', res)
    },
    // 聘用形式数据转换
    changeFormOfEmployment(row, column, cellValue, index) {
      // employeesData.hireType=[{id:1,value:'正式'}...]   1
      // find:找到了返回值是找到项的值  找不到返回undefined
      const findItem = employeesData.hireType.find(
        (item) => item.id === +cellValue
      )

      return findItem ? findItem.value : '-'
    },
    // 状态数据转换
    changeEnableState(row, column, cellValue, index) {
      const findItem = employeesData.workingState.find(
        (item) => +item.id === cellValue
      )
      return findItem ? findItem.value : '-'
    },
    // 入职时间数据转换
    changeTime(row, column, cellValue, index) {
      // dayjs
      // 1：下载  npm i dayjs
      // 2:导入  import dayjs from 'dayjs'
      // 3:使用  dayjs(时间数据).format('YYYY-MM-DD')
      return dayjs(cellValue).format('YYYY-MM-DD')
    },
    // 新增按钮点击
    addEvent() {
      // 打开弹框
      this.$refs.add.isShow = true
    },
    // 删除点击事件
    delEvent(id) {
      this.$confirm('您确定删除该项吗？', '提示')
        .then(async() => {
          await sysUserDelete(id)
          // 提示
          this.$message.success('删除成功')
          // 刷新列表
          if (this.list.length === 1 && this.page.page > 1) {
            this.page.page--
          }
          this.getData()
        })
        .catch(() => {})
    },
    // 普通excel导出
    async exportClick() {
      // 获取所有用户列表数据
      const res = await sysUser({
        page: 1,
        size: 99999
      })
      const userArr = res.data.rows
      const data = res.data.rows.map((item) => {
        return [
          item.username,
          item.mobile,
          item.workNumber,
          this.changeFormOfEmployment(null, null, item.formOfEmployment),
          item.departmentName,
          this.changeTime(null, null, item.timeOfEntry),
          this.changeEnableState(null, null, item.enableState)
        ]
      })
      console.log(userArr)

      export_json_to_excel({
        header: [
          '姓名',
          '手机号',
          '工号',
          '聘用形式',
          '部门',
          '入职时间',
          '状态'
        ],
        filename: '人资用户列表',
        data: data
      })
      this.$message.success('导出成功')
    },
    // 头像点击生成二维码
    imgClick(avatar) {
      console.log(avatar, this.$refs.canvas)
      if (avatar) {
        this.showCode = true
        this.$nextTick(() => {
          Qrcode.toCanvas(this.$refs.canvas, avatar, { width: 400 })
        })
      }
    },
    // 角色点击
    roleEvent(row) {
      console.log(row)
      this.$refs.setRole.isShow = true
      // 调用弹框内的方法获取角色列表
      this.$refs.setRole.getData()
      // 调用弹框内的方法获取当前用户的角色id
      this.$refs.setRole.getUserRoleIds(row.id)
    }
  }
}
</script>
<style lang="scss" scoped>
.employees {
  padding: 20px;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      padding: 6px;
      border: 1px solid #91d5ff;
      background-color: #e6f7ff;
      border-radius: 5px;
      i {
        color: #45adff;
        padding-right: 7px;
      }
    }
  }
  .mb15 {
    margin-bottom: 15px;
  }
  .page {
    text-align: right;
    padding-top: 15px;
  }
  .avatar {
    width: 30px;
    height: 30px;
    object-fit: contain;
  }
}
</style>
