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
  name: "environmentNut",
  data() {
    return {
      polar: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['营养盐', '营养盐上警戒线', '营养盐下警戒线']
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
            name: '营养盐',
            type: 'line',
            data: [15, 15, 15, 15, 15, 15]
          },
          {
            name: '营养盐上警戒线',
            type: 'line',
            data: [10.8, 10.9, 11, 9.1, 0, 0]
          },
          {
            name: '营养盐下警戒线',
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
