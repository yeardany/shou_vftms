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
                @click="weatherDetail"/>
    </van-cell-group>
  </div>
</template>

<script>
import NavBar from '../../layout/NavBar.vue'

export default {
  name: "weather",
  data() {
    return {
      list: [
        {
          name: '永丰4气象',
          temperature: '温度：14.50℃',
          time: '2019/12/28 18:31:18 更新'
        },
        {
          name: '岛上气象站',
          temperature: '温度：14.50℃',
          time: '2019/12/28 18:31:18 更新'
        },
        {
          name: '永丰3气象',
          temperature: '温度：14.50℃',
          time: '2019/12/28 18:31:18 更新'
        },
        {
          name: '育苗基地气象',
          temperature: '温度：14.50℃',
          time: '2019/12/28 18:31:18 更新'
        }]
    }
  },
  components: {
    NavBar
  },
  methods: {
    weatherDetail() {
      this.$router.push('/weatherDetail')
    }
  }
}
</script>

<style scoped>

</style>
