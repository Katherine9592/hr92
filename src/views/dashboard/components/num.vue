<template>
  <div>
    <button @click="setTotal(1)">+</button>
    <span>{{ total }}</span>
    <button @click="setTotal(-1)">-</button>
  </div>
</template>
<script>
export default {
  props: {
    total: {
      type: Number,
      required: true
    }
  },
  methods: {
    setTotal(step) {
      this.$emit('update:total', this.total + step)
    }
  }
}
</script>
<style></style>
