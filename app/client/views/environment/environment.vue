<template>
  <div>
    <NavBar>
      <template #title>
        鲍鱼生产智慧服务平台
      </template>
    </NavBar>
    <van-cell-group>
      <van-cell center v-for="(item,index) in list"
                :key="index" :title="item.name"
                :value="item.temperature"
                :label="item.time"
                @click="environmentDetail"/>
    </van-cell-group>
  </div>
</template>

<script>
import NavBar from '../../layout/NavBar.vue'

export default {
  name: "environment",
  data() {
    return {
      list: [
        {
          name: '永丰4水质',
          temperature: '温度：14.50℃',
          time: '2019/12/28 18:31:18 更新'
        },
        {
          name: '永丰3水质',
          temperature: '温度：14.50℃',
          time: '2019/12/28 18:31:18 更新'
        },
        {
          name: '渔排水质1号',
          temperature: '温度：14.50℃',
          time: '2019/12/28 18:31:18 更新'
        },
        {
          name: '育苗基地水质',
          temperature: '温度：14.50℃',
          time: '2019/12/28 18:31:18 更新'
        }]
    }
  },
  methods: {
    environmentDetail() {
      this.$router.push('/environmentDetail')
    }
  },
  components: {
    NavBar
  }
}
</script>

<style scoped>

</style>
