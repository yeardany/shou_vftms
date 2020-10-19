<template>
  <div>
    <NavBar>
      <template #left>
        <van-icon name="arrow-left" size="18"/>
      </template>
      <template #title>
        监控详情
      </template>
    </NavBar>
    <template>
      <b><span v-html="locationDescribe"></span></b>
      <v-chart :style="{width: containerWidth + 'px',height: containerWidth + 'px' }" :options="option1"/>
      <v-chart :style="{width: containerWidth + 'px',height: containerWidth + 'px' }" :options="option2"/>
      <v-chart :style="{width: containerWidth + 'px',height: containerWidth + 'px' }" :options="option3"/>
    </template>
  </div>
</template>

<script>
import NavBar from '../../layout/NavBar.vue'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/heatmap'
import LocationCompute from '../../utils/locationCompute'
import heatMap from '../../utils/heatMap'

let init = new LocationCompute(30.66, 122.20, 30.99, 121.87, 6371.14),
  // 已知斜边dist，再求对边s_dist，用 ArcSin 函数求角度
  dist = init.getDistance(init.x0, init.y0, init.x, init.y),
  s_dist = init.getDistance(init.x0, init.y, init.x, init.y);
init.r_rad = Math.asin(s_dist / dist);
let angle = init.r_rad.toFixed(2),
  angles = init.getAngles(angle);

export default {
  name: "Map",
  components: {
    NavBar,
    'v-chart': ECharts
  },
  data() {
    return {
      containerWidth: window.screen.width,
      locationDescribe: `1号设备海上定位：</br>标准位置${init.x0}°N,${init.y0}°E,</br>实际位置${init.x}°N,${init.y}°E`,
      option1: {
        radiusAxis: {
          max: 50
        },
        polar: {
          center: ['50%', '50%']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            axis: 'radius'
          }
        },
        angleAxis: {
          type: 'value',
          max: 360
        },
        series: [{
          coordinateSystem: 'polar',
          radius: '80%',
          name: '偏移度',
          type: 'scatter',
          data: [[0, 0], [dist, angles]]
        }]
      },
      option2: {
        title: {
          text: '设备偏移情况热力图'
        },
        tooltip: {},
        xAxis: {
          type: 'value',
          max: 50,
          min: -50,
        },
        yAxis: {
          type: 'value',
          max: 50,
          min: -50
        },
        visualMap: {
          min: 0,
          max: 1,
          inRange: {
            color: ['#abd9e9', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027',]
          }
        },
        series: [{
          name: 'Gaussian',
          type: 'heatmap',
          itemStyle: {
            opacity: 0.6
          },
          data: heatMap.getHeatMapData(init).final_data,
          emphasis: {
            itemStyle: {
              borderColor: '#000',
              borderWidth: 1
            }
          },
          progressive: 100, //渲染频率
          animation: false //动画
        }]
      },
      option3: {
        title: {
          text: '设备随时间位置变化图'
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            let htmlStr = '';
            for (let i = 0; i < params.length; i++) {
              let param = params[i];
              if (i === 1) {
                htmlStr += '设备移动至此处时间为' + param.value[1];
                htmlStr += '<div style="border: 1px solid #FFEB3B"></div>';
              } else if (i === 2)
                htmlStr += '设备移动至此处坐标为(' + param.value[1] + ')';
            }
            return htmlStr;
          }
        },
        xAxis: {
          min: -50,
          max: 50,
          type: 'value',
          axisLine: {onZero: true}
        },
        yAxis: {
          min: -50,
          max: 50,
          type: 'value',
          axisLine: {onZero: true}
        },
        dataZoom: [{
          type: 'inside',
          xAxisIndex: 0,
          filterMode: 'empty'
        }, {
          type: 'inside',
          yAxisIndex: 0,
          filterMode: 'empty'
        }],
        series: [{
          name: 'xy_data',
          type: 'line',
          smooth: true,
          symbolSize: 6,
          data: heatMap.getHeatMapData(init).xy_data
        }, {
          name: 'time',
          type: 'line',
          data: heatMap.getHeatMapData(init).time
        }, {
          name: 'location',
          type: 'line',
          data: heatMap.getHeatMapData(init).loc
        }]
      }
    }
  }
}
</script>
<style scoped>
span {
  display: block;
  padding: 0 3%
}
</style>
