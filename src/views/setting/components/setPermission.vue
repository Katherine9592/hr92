<template>
  <el-dialog
    :title="`为【${title}】分配权限`"
    width="700px"
    :visible.sync="isShow"
    @close="closeEvent"
  >
    <!-- el-tree
            默认选中
              el-tree
                 node-key="数据项内的唯一标识字段名，一般是id"
                 :default-checked-keys='[需要选中项的唯一标识的值]'
                 ref= 'tree'
              设置节点选中   this.$refs.tree.setCheckedKeys(['需要选中项的唯一标识的值']) 限制条件：一定要在el-tree渲染完成后使用
              获取选中的节点  this.$refs.tree.getCheckedKeys()
     -->
    <el-tree
      ref="tree"
      check-strictly
      :data="list"
      node-key="id"
      :default-checked-keys="permIds"
      show-checkbox
      default-expand-all
      :props="{
        label: 'name'
      }"
    />
    <template #footer>
      <div class="tc">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { sysPermission } from '@/api/permission'
import { sysRoleId, sysRoleAssignPrem } from '@/api/setting'
export default {
  data() {
    return {
      title: '',
      isShow: false, // 是否显示弹框
      list: [], // 权限数据
      permIds: [], // 角色的权限点数据
      id: ''
    }
  },
  methods: {
    // 获取权限数据列表
    async getData() {
      if (this.list.length === 0) {
        const res = await sysPermission()
        this.list = this.changeData(res.data, '0')
        console.log('权限数据列表', res)
      }
    },
    // 树形数据转换
    changeData(arr, pid) {
      return arr.filter((item) => {
        if (item.pid === pid) {
          item.children = this.changeData(arr, item.id)
          return true
        }
      })
    },
    //  获取角色详情
    async getRoleInfo(id) {
      this.id = id
      const res = await sysRoleId(id)
      this.permIds = res.data.permIds
      // this.$refs.tree.setCheckedKeys(res.data.permIds)
      console.log('获取角色详情', res)
    },
    // 关闭弹框时的处理
    closeEvent() {
      //   this.permIds = []
      // 清空已勾选项
      this.$refs.tree.setCheckedKeys([])
    },
    // 确定点击
    async submit() {
      await sysRoleAssignPrem({
        id: this.id,
        permIds: this.$refs.tree.getCheckedKeys()
      })
      this.$message.success('分配权限成功')
      this.isShow = false
      //   console.log(this.$refs.tree.getCheckedKeys())
    }
  }
}
</script>
<style lang="scss" scoped>
.tc {
  text-align: center;
}
</style>
