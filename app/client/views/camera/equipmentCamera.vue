<template>
  <van-grid :column-num="2" :gutter="10" :border="true" :clickable="true">
    <van-grid-item
      v-for="item in list"
      :key="item._id"
      icon="desktop-o"
      :text="item.eName" :to="'/map/' + item._id"/>
  </van-grid>
</template>

<script>

import axios from "axios";
import api from "../../../config/api";
import ModuleSet from "../../../config/moduleSet";

export default {
  name: "equipmentCamera",
  data() {
    return {
      list: []
    }
  },
  mounted() {
    axios.get(api.api.getEquipments, {
      params: {
        aId: new ModuleSet().areaID
      }
    }).then((res) => {
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
