<template>
  <div>首页</div>
</template>
<script>
export default {
  created() {
    const arr = [
      {
        姓名: '张三',
        年龄: 20
      },
      {
        姓名: '李四',
        年龄: 28
      }
    ]
    const result = arr.map((item) => {
      return {
        name: item['姓名'],
        age: item['年龄']
      }
    })
    console.log(result)

    // const result = [
    //   {
    //     name: '张三',
    //     age: 20
    //   },
    //   {
    //     name: '李四',
    //     age: 28
    //   }
    // ]
  }
}
</script>
<style></style>
