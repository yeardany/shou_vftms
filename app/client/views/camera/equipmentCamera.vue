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

export default {
  name: "equipmentCamera",
  data() {
    return {
      list: []
    }
  },
  mounted() {
    axios.post(api.api.getEquipments, {'pushID': this.$pushID}).then((res) => {

      this.list = res.data

    }).catch((e) => {
      this.$notify({type: 'warning', message: e.message, duration: 1500});
    })

  }
}
</script>

<style scoped>

</style>
