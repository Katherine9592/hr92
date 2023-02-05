<template>
  <div>
    <button @click="add">+</button> <span>{{ value }}</span>
    <button @click="reduce">-</button>
  </div>
</template>
<script>
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    add() {
      this.$emit('input', this.value + 1)
    },
    reduce() {
      this.$emit('input', this.value - 1)
    }
  }
}
</script>
<style></style>
