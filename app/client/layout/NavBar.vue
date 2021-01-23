<template>
  <van-nav-bar :border="false" @click-left="back" @click-right="method(methodName)">
    <template #left>
      <slot name="left"></slot>
    </template>
    <template #title>
      <slot name="title"></slot>
    </template>
    <template #right>
      <slot name="right"></slot>
    </template>
  </van-nav-bar>
</template>

<script>

import ModuleSet from "../../config/moduleSet";

export default {
  name: "NavBar",
  data() {
    return {
      backPath: new ModuleSet().homePath
    }
  },
  props: {
    methodName: String,
    required: true
  },
  methods: {
    back() {
      this.$router.push(this.backPath)
    },
    method(name) {
      switch (name) {
        case 'newInspect':
          this.$router.push('/newInspect')
          break;
        default:
      }
    }
  },
  computed: {}
}
</script>

<style scoped>

</style>
