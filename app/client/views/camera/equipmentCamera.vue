<template>
<!--  <van-grid :gutter="10" :column-num="3" clickable>-->
<!--    <van-grid-item icon="tv-o" v-for="(item,index) in list"-->
<!--                   :key="index"-->
<!--                   :text="item.name"-->
<!--                   @click="cameraDetail"/>-->
<!--  </van-grid>-->
  <div>
    <van-card class="card1"
              title="海上设备仪器1号"
              thumb="require('../../assets/images/equipment.jpg')"
              @click-thumb="map"
    />
    <van-card class="card2"
              title="海上设备仪器2号"
              thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
              @click-thumb="cameraDetail"
    />
  </div>
</template>

<script>
export default {
  name: "equipmentCamera",
  methods: {
    cameraDetail() {
      this.$router.push('/cameraDetail')
    },
    map(){
      this.$router.push('/Map')
    }
  }
}
</script>

<style scoped>
.card1>>>.van-card_title{font-size: 30px}

</style>
