<template>
  <div>首页</div>
</template>
<script>
export default {
  created() {
    async function sysLogin() {
      // return new Promise((resolve, reject) => {
      //   resolve('成功')
      // })
      // return Promise.resolve('成功')
      if (Math.random() > 0.5) {
        return '成功'
      } else {
        return Promise.reject('成功里返回的失败')
      }
    }
    async function toLogin() {
      try {
        const res = await sysLogin()
        console.log('then', res)
      } catch (err) {
        console.log('catch里的', err)
      }
    }
    toLogin()

    function sysLogin2() {
      // return new Promise((resolve, reject) => {
      //   reject('失败')
      // })
      return Promise.reject('失败')
    }
    function toLogin2() {
      sysLogin2()
        .then((res) => {})
        .catch((error) => {
          console.log('catch', error)
        })
    }
    // toLogin2()
  }
}
</script>
<style></style>
