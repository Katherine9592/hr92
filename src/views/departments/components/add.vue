<template>
  <!--
   部门负责人：
      1：定义api
      2:导入api
      3:调用api(点击select时调用)
      4：渲染数据

   表单验证
     1：表单元素值的绑定
     2：el-form
           model
           rules
     3:el-form-item
           prop
 -->
  <el-dialog
    :title="title"
    width="600px"
    :visible.sync="isShow"
    @close="closeEvent"
  >
    <el-form ref="form" label-width="100px" :model="form" :rules="rules">
      <el-form-item prop="name" label="部门名称">
        <el-input v-model.trim="form.name" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input v-model.trim="form.code" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item prop="manager" label="部门负责人">
        <!--
            el-select
               v-model
               el-option
                   label:显示的文本
                   value:选中该项后的值
            需求： 深圳  sz   广州   gz
         -->
        <el-select
          v-model="form.manager"
          placeholder="请选择"
          @focus="focusEvent"
        >
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍">
        <el-input
          v-model="form.introduce"
          placeholder="1-300个字符"
          type="textarea"
          :rows="4"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="center">
        <el-button @click="isShow = false">取消</el-button>
        <el-button
          :loading="loading"
          type="primary"
          @click="submit"
        >确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import {
  sysUserSimple,
  companyDepartmentPost,
  companyDepartmentPut
} from '@/api/departments'
export default {
  props: {
    initList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      mode: 'add', // add为新增  edit:编辑
      loading: false,
      isShow: false,
      userList: [],
      form: {
        name: '', //	string	非必须		部门名称
        code: '', //	string	非必须		部门编码，同级部门不可重复
        manager: '', //	string	非必须		负责人名称
        introduce: '', //	string	非必须		介绍
        pid: '' //	string	非必须		父级部门ID
      },
      rules: {
        name: [
          {
            required: true,
            message: '必填',
            trigger: 'change'
          },
          {
            min: 1,
            max: 50,
            message: '请输入1-50个字符',
            trigger: 'change'
          },
          {
            validator: (rule, value, callback) => {
              // 验证点击项添加的子项与同级部门不可重名
              // 找出点击项的子集
              let arr = this.initList.filter(
                (item) => item.pid === this.form.pid
              )
              if (this.mode === 'edit') {
                arr = arr.filter((item) => item.id !== this.form.id)
              }
              // 验证是否重名
              const bol = arr.every((item) => item.name !== value)
              bol
                ? callback()
                : callback(new Error('请不要输入重复部门名称:' + value))
            },
            trigger: 'change'
          }
        ], //	string	非必须		部门名称
        code: [
          {
            required: true,
            message: '必填',
            trigger: 'change'
          },
          {
            min: 1,
            max: 50,
            message: '请输入1-50个字符',
            trigger: 'change'
          },
          {
            validator: (rule, value, callback) => {
              let bol = false
              if (this.mode === 'add') {
                // 需求：当前输入的值不能和组织架构中任意项的code相同
                // 条件：拿到所有项的code  this.initList
                //  [{code:'1001'}...]     '1001'
                //  Boolean:every:每一项都满足条件   sone：只要有一项满足条件
                // 验证是否重复code
                bol = this.initList.every((item) => {
                  return item.code !== value
                })
              } else if (this.mode === 'edit') {
                // this.initList要排除当前项
                const arr = this.initList.filter((item) => {
                  return item.id !== this.form.id
                })
                // 判断重复
                bol = arr.every((item) => {
                  return item.code !== value
                })
              }
              bol ? callback() : callback(new Error(`部门编码重复：` + value))
            }
          }
        ], //	string	非必须		部门编码，同级部门不可重复
        manager: [
          {
            required: true,
            message: '必填',
            trigger: 'change'
          }
        ], //	string	非必须		负责人名称
        introduce: [
          {
            required: true,
            message: '必填',
            trigger: 'change'
          },
          {
            min: 1,
            max: 300,
            message: '请输入1-300个字符',
            trigger: 'change'
          }
        ] //	string	非必须		介绍
      }
    }
  },
  computed: {
    title() {
      if (this.mode === 'add') {
        return '新增部门'
      } else {
        return '编辑部门'
      }
    }
  },
  methods: {
    // 获取员工列表数据
    async focusEvent() {
      if (this.userList.length === 0) {
        const res = await sysUserSimple()
        this.userList = res.data
        console.log('员工列表数据', res)
      }
    },
    // 确定点击
    submit() {
      this.$refs.form.validate(async(result) => {
        if (result) {
          // 显示loading
          this.loading = true
          if (this.mode === 'add') {
            // 调用新增api
            await companyDepartmentPost(this.form)
            // 提示
            this.$message.success('新增部门成功')
          } else if (this.mode === 'edit') {
            await companyDepartmentPut(this.form)
            // 提示
            this.$message.success('编辑部门成功')
          }
          // 关闭弹框
          this.isShow = false
          // 刷新父级数据
          this.$emit('getData')
        }
      })
    },
    // 清空数据
    closeEvent() {
      // 将表单内容重置成初始值,移除校验结果
      this.$refs.form.resetFields()
      this.form = {
        name: '', //	string	非必须		部门名称
        code: '', //	string	非必须		部门编码，同级部门不可重复
        manager: '', //	string	非必须		负责人名称
        introduce: '', //	string	非必须		介绍
        pid: '' //	string	非必须		父级部门ID
      }
      // loading消失
      this.loading = false
    }
  }
}
</script>
<style lang="scss" scoped>
.center {
  text-align: center;
}
</style>
