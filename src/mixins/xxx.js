export default {
  data() {
    return {
      abc: 111
    }
  },
  methods: {
    isShowBtn(code) {
      return (
        this.$store.state.user.userInfo.roles &&
        this.$store.state.user.userInfo.roles.points.includes(code)
      )
    }
  }
}
