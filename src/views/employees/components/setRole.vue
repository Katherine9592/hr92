<template>
  <el-dialog
    title="分配角色"
    width="600px"
    :visible.sync="isShow"
    @close="closeEvent"
  >
    <!-- <h3>{{ selectVal }}</h3> -->
    <el-checkbox
      v-for="item in list"
      :key="item.id"
      v-model="selectVal"
      :label="item.id"
    >{{ item.name }}</el-checkbox>

    <template #footer>
      <div class="tc">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="isShow = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { sysRole } from '@/api/setting'
import { sysUser } from '@/api/user'
import { sysUserAssignRoles } from '@/api/employees'
export default {
  data() {
    return {
      isShow: false,
      list: [],
      selectVal: [],
      id: ''
    }
  },
  created() {
    // this.getData()
  },
  methods: {
    // 获取角色列表
    async getData() {
      if (this.list.length === 0) {
        const res = await sysRole({
          page: 1,
          pagesize: 99999
        })
        this.list = res.data.rows
        console.log('获取角色列表', res)
      }
    },
    // 获取当前用户角色id
    async getUserRoleIds(id) {
      this.id = id
      const res = await sysUser(id)
      this.selectVal = res.data.roleIds || []
      console.log('当前用户角色', res)
    },
    closeEvent() {
      this.selectVal = []
    },
    // 确定点击
    async submit() {
      await sysUserAssignRoles({
        id: this.id,
        roleIds: this.selectVal
      })
      this.$message.success('分配角色成功')
      this.isShow = false
    }
  }
}
</script>
<style lang="scss" scoped>
.tc {
  text-align: center;
}
</style>
