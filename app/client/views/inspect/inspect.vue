<template>
  <div>
    <NavBar :methodName="newInspect">
      <template #title>
        鲍鱼生产智慧服务平台
      </template>
      <template #right>
        新增巡检
      </template>
    </NavBar>
    <van-cell-group>
      <van-cell center v-for="(item,index) in list"
                :key="index" :title="item.name"
                :value="item.person"
                :label="item.time"
                @click="inspectDetail"
      />
    </van-cell-group>
  </div>
</template>

<script>
import NavBar from '../../layout/NavBar.vue'

export default {
  name: "inspect",
  data() {
    return {
      list: Array(20).fill({
        name: '巡检0103',
        person: '巡检人：AJ',
        time: '2019/12/28 18:31:18 更新'
      }),
      newInspect: 'newInspect'
    }
  },
  methods: {
    inspectDetail() {
      this.$router.push('/inspectDetail')
    }
  },
  components: {
    NavBar
  }
}
</script>

<style scoped>

</style>
