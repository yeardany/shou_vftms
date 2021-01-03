<template>
  <div>
    <NavBar>
      <template #title>
        智慧生态养殖在线服务平台
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
import ModuleSet from "../../../config/moduleSet";

export default {
  name: "environment",
  data() {
    return {
      areas: new Map([["zzd", "獐子岛"], ["sgw", "桑沟湾"]])
    }
  },
  computed: {
    getAreaName() {
      return this.areas.get(new ModuleSet().areaID)
    },
    list() {
      return [
        {
          name: `${this.getAreaName}1号监测点水质`,
          temperature: '温度：14.50℃',
          time: '2020/11/10 18:31:18 更新'
        },
        {
          name: `${this.getAreaName}2号监测点水质`,
          temperature: '温度：15.50℃',
          time: '2020/11/12 11:20:06 更新'
        },
        {
          name: '育苗基地水质',
          temperature: '温度：13.50℃',
          time: '2020/11/14 10:50:12 更新'
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
