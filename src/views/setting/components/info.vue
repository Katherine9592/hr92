<template>
  <div class="info">
    <el-form label-width="120px">
      <el-form-item label="公司名称">
        <el-input v-model="info.name" type="text" disabled />
      </el-form-item>
      <el-form-item label="公司地址">
        <el-input v-model="info.companyAddress" type="text" disabled />
      </el-form-item>
      <el-form-item label="公司邮箱">
        <el-input v-model="info.mailbox" type="text" disabled />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="info.remarks" type="textarea" :rows="3" disabled />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { company } from '@/api/setting'
export default {
  data() {
    return {
      info: ''
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const res = await company(this.$store.state.user.userInfo.companyId)
      this.info = res.data
      console.log('企业信息', res)
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  width: 500px;
}
</style>
