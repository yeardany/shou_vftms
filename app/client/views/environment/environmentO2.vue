<template>
  <van-row>
    <van-col span="24">
      <v-chart :options="polar"/>
    </van-col>
  </van-row>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'

export default {
  name: "environmentO2",
  data() {
    return {
      polar: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['溶氧量', '溶氧上警戒线', '溶氧下警戒线']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['18:31', '18:15', '17:59', '17:38', '17:22', '17:06']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '溶氧量',
            type: 'line',
            data: [15, 15, 15, 15, 15, 15]
          },
          {
            name: '溶氧上警戒线',
            type: 'line',
            data: [10.8, 10.9, 11, 9.1, 0, 0]
          },
          {
            name: '溶氧下警戒线',
            type: 'line',
            data: [0, 0, 0, 0, 0, 0]
          }
        ]
      }
    }
  },
  components: {
    'v-chart': ECharts
  }
}
</script>

<style scoped>
.echarts {
  width: 100%;
}
</style>
