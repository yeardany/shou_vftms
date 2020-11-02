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
                :key="index" :title="item.iName"
                :value="item.iWho"
                :label="item.time|timeConvert"
                @click="inspectDetail(item.iName,item.iWho,item.iLength,item.iWeight,item.other)"
      />
    </van-cell-group>
  </div>
</template>

<script>
import NavBar from '../../layout/NavBar.vue'
import axios from "axios";
import api from "../../../config/api";

export default {
  name: "inspect",
  data() {
    return {
      list: [],
      newInspect: 'newInspect'
    }
  },
  methods: {
    inspectDetail(iName, iWho, iLength, iWeight, other) {
      this.$router.push({
        name: 'inspectDetail',
        params: {
          name: iName,
          who: iWho,
          length: iLength,
          weight: iWeight,
          other: other
        }
      })
    }
  },
  components: {
    NavBar
  },
  filters: {
    timeConvert(t) {
      return `${new Date(t).toLocaleString().replace(/:\d{1,2}$/, ' ')} 创建`;
    }
  },
  mounted() {
    axios.get(api.api.getInspects).then((res) => {
      let data = res.data

      if (data === [] || data === undefined)
        throw {'message': '数据库连接失败'}
      else
        this.list = data

    }).catch((e) => {
      this.$notify({type: 'warning', message: e.message, duration: 1500});
    })
  }
}
</script>

<style scoped>

</style>
