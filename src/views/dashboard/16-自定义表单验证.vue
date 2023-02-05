<template>
  <div>
    <!-- 自定义表单验证
           rules:{
               prop的值:[
               ...,
               {validator:(rule,value,callback)=>{
                value:当前项的值
                callback
                    成功  callback()
                    失败  callback(new Error(错误信息))
               }}
               ]
           }

    -->
    <el-form :model="form" :rules="rules">
      <el-form-item prop="val">
        <el-input v-model="form.val" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      arr: ['a', 'b', 'c'],
      form: {
        val: ''
      },
      rules: {
        val: [
          { required: true, message: '必填', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              // rule:当前的验证规则
              // value：当前项的值
              // callback: 成功  callback()   不成功：callback(new Error('错误信息'))
              // 需求：输入的值不能和数组中某项值相同
              const bol = this.arr.includes(value)
              bol ? callback(new Error('输入的值重复了')) : callback()
            },
            trigger: 'change'
          }
        ]
      }
    }
  }
}
</script>
<style></style>
