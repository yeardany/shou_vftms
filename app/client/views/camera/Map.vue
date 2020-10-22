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

let init = new LocationCompute(30.66, 122.20, 30.40, 121.98, 6371.14),
  // 已知斜边dist，再求对边s_dist，用 ArcSin 函数求角度
  dist = init.getDistance(init.x0, init.y0, init.x, init.y),
  s_dist = init.getDistance(init.x0, init.y, init.x, init.y);
init.r_rad = Math.asin(s_dist / dist);
let angle = init.r_rad.toFixed(2),
  angles = init.getAngles(angle),
  jw_loc = init.x + '°N,' + init.y + '°E',
  init_jw_loc = init.x0 + '°N,' + init.y0 + '°E';
console.log(jw_loc)
console.log(init_jw_loc)

export default {
  name: "Map",
  components: {
    NavBar,
    'v-chart': ECharts
  },
  data() {
    return {
      containerWidth: window.screen.width,
      locationDescribe: '下列各图中心原点位置即为标准点坐标:<br>('+init.x0+'°N,'+init.y0+'°E)<br><br>',
      option1: {
        title: {
          text: '海上设备定位图'
        },
        radiusAxis: {
          max: 50
        },
        polar: {
          center: ['50%', '50%'],
          radius: '80%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            axis: 'radius'
          },
          formatter: (params) => {
            let htmlStr = '';
            for (let i = 0; i < params.length; i++) {
              let param = params[i];
              if (i === 0) {
                htmlStr += '设备偏移距离:<br>' + param.value[0].toFixed(2) +'km';
                htmlStr += '<div style="border: 1px solid #FFEB3B"></div>';
                htmlStr += '设备偏移角度:<br>' + param.value[1]+'°';
                htmlStr += '<div style="border: 1px solid #FFEB3B"></div>';
              } else
                htmlStr += '经纬度坐标:<br>' + param.value[1];
            }
            return htmlStr;
          }
        },
        angleAxis: {
          type: 'value',
          max: 360
        },
        series: [{
          coordinateSystem: 'polar',
          name: '偏移度',
          type: 'scatter',
          data: [[0, 0], [dist, angles]]
        },{
          coordinateSystem: 'polar',
          name: '经纬度',
          type: 'scatter',
          data: [[0,init_jw_loc],[dist,jw_loc]]
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
          name: "距标准点横向距离:km",
          nameLocation: "middle",
          nameTextStyle: {
            fontSize: 12,
            padding: [10, 10, 10, 10]
          }
        },
        yAxis: {
          type: 'value',
          max: 50,
          min: -50,
          name: "距标准点横向距离:km",
          nameLocation: "middle",
          nameTextStyle: {
            fontSize: 12,
            padding: [10, 10, 10, 10]
          }
        },
        grid:{
          left: '17%'
        },
        visualMap: {
          min: 0,
          max: 1,
          inRange: {
            color: ['#abd9e9', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027',]
          }
        },
        series: [{
          name: 'heatvalue',
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
                if(param.value[0]==0.00)
                  htmlStr += '位于标准点处时间:<br>' + param.value[1];
                else
                  htmlStr += '偏移至此处时间:<br>' + param.value[1];
                htmlStr += '<div style="border: 1px solid #FFEB3B"></div>';
              } else if (i === 2)
                htmlStr += '此处经纬度:<br>' + param.value[1];
            }
            return htmlStr;
          }
        },
        xAxis: {
          min: -50,
          max: 50,
          type: 'value',
          axisLine: {onZero: true},
          name: "距标准点横向距离:km",
          nameLocation: "middle",
          nameTextStyle: {
            fontSize: 12,
            padding: [10, 10, 10, 10]
          }
        },
        yAxis: {
          min: -50,
          max: 50,
          type: 'value',
          axisLine: {onZero: true},
          name: "距标准点纵向距离:km",
          nameLocation: "middle",
          nameTextStyle: {
            fontSize: 12,
            padding: [10, 10, 10, 10]
          }
        },
        grid:{
          left: '15%'
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
  padding: 0 1.5%
}
</style>
