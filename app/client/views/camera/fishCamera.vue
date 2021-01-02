<template>
  <div>
    <div class="title">监测区域分布</div>
    <v-chart class="mapChart" :style="chartStyle" manual-update ref="myecharts"/>
  </div>
</template>

<script>
import NavBar from '../../layout/NavBar.vue'
import echarts from 'vue-echarts'
import china from 'echarts/map/json/china.json'
import 'echarts/map/js/china.js'
import 'echarts-gl/dist/echarts-gl.js'

export default {
  name: "fishCamera",
  components: {
    NavBar,
    'v-chart': echarts
  },
  data() {
    return {
      chartStyle: {
        height: window.screen.height - 150 + 'px',
        width: window.screen.width + 'px'
      },
      list: [
        {name: '渔排1号', value: [123.72, 39.07]},
        {name: '福鲍1号', value: [123.33, 39.22]},
        {name: '渔排2号', value: [123.46, 38.76]},
        {name: '福鲍2号', value: [122.86, 39.24]},
      ]
    }
  },
  computed: {
    option() {
      return {
        backgroundColor: '#fff',
        tooltip: {
          trigger: "item",
          triggerOn: 'click',
          formatter: (params) => {
            let r = confirm('獐子岛-' + params.name + '\n' + '位置：' + params.value[0] + '°E, ' + params.value[1] + '°N' + '\n' + '是否查看监控？');
            if (r === true)
              this.$router.push('/cameraDetail')
          }
        },
        geo: {
          map: "china",
          layoutCenter: ['20%', '50%'],
          layoutSize: 2200,
          roam: true,
          center: [122.5, 39],
          scaleLimit: {
            min: 2,
            max: 6
          },
          itemStyle: {
            normal: {
              borderWidth: 1,
              areaColor: "rgb(234,233,233)",
              borderColor: "rgb(25, 137, 250)"
            }
          }
        },
        series: [
          {
            name: "獐子岛",
            type: "scatter",
            coordinateSystem: "geo",
            data: this.list,
            triggerEvent: true,
            symbolSize: 8,
            label: {
              normal: {
                formatter: "{b}",
                position: "top",
                show: true
              },
            },
            itemStyle: {
              normal: {
                color: "rgb(25, 137, 250)",
                shadowBlur: 10,
                shadowColor: "#0da3ea"
              }
            }
          }
        ]
      }
    }

  },
  mounted() {
    const chart = this.$refs.myecharts
    chart.mergeOptions(this.option, true)
  }
};

</script>

<style scoped>
.title {
  position: absolute;
  z-index: 1;
  height: 34px;
  line-height: 34px;
  font-size: 16px;
  font-weight: 500;
  color: #323233;
  padding-left: 14px;
  border-left: 3px solid rgb(25, 137, 250);
  box-sizing: border-box;
}
</style>
