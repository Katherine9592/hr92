export default {
  data() {
    return {
      num: 1
    }
  },
  created() {
    // this.num = 100
    console.log('created')
  },
  methods: {
    add() {
      this.num++
    }
  }
}
