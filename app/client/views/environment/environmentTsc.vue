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
  name: "environmentTsc",
  data() {
    return {
      polar: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['透明度', '透明度上警戒线', '透明度下警戒线']
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
            name: '透明度',
            type: 'line',
            data: [15, 15, 15, 15, 15, 15]
          },
          {
            name: '透明度上警戒线',
            type: 'line',
            data: [10, 11, 13, 12, 11, 10]
          },
          {
            name: '透明度下警戒线',
            type: 'line',
            data: [1, 2, 5, 4, 3, 2]
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
