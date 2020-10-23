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
            data: [10.8, 11.9, 11, 9.1, 8.5, 8.0]
          },
          {
            name: '营养盐上警戒线',
            type: 'line',
            data: [15, 14, 12, 11, 11, 12]
          },
          {
            name: '营养盐下警戒线',
            type: 'line',
            data: [5, 5, 5, 5, 5, 5]
          }
        ],
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
