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
      <v-chart :style="{width: containerWidth + 'px',height: containerWidth + 'px'}" :options="option1"/>
      <v-chart :style="{width: containerWidth + 'px',height: containerWidth + 'px' }" :options="option2"/>
    </template>
  </div>
</template>

<script>
import NavBar from '../../layout/NavBar.vue'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/heatmap'
import LocationCompute from '../../utils/locationCompute'

let init = new LocationCompute(30.66, 122.20, 30.99, 121.87, 6371.14),
  // 已知斜边dist，再求对边s_dist，用 ArcSin 函数求角度
  dist = init.getDistance(init.x0, init.y0, init.x, init.y) || 3.14,
  s_dist = init.getDistance(init.x0, init.y, init.x, init.y);
init.r_rad = Math.asin(s_dist / dist);
let angle = init.r_rad.toFixed(2) || 45,
  angles = init.getAngles(angle),

  data_loc = [[30.402312, 121.98312], [30.404635, 121.9867565], [30.4076786, 121.9883725], [30.4076786, 121.9883725],
    [30.4154325, 122.003232], [30.4159123, 122.004534], [30.454523, 122.084534], [30.459123, 122.08434], [30.557123, 122.14439],
    [30.66423, 122.203223], [30.6631, 122.20231], [30.66231, 122.2034], [30.662311, 122.20375], [30.66232, 122.20546],
    [30.66232, 122.20543], [30.6632, 122.20546]],

  heatMapData = () => {
    let data = [];
    for (let i = -50; i <= 50; i++)
      for (let j = -50; j <= 50; j++)
        data[i, j] = 0;

    for (let i = 0; i < data_loc.length - 1; i++) {
      let x = data_loc[i][1].toFixed(2);
      let y = data_loc[i][0].toFixed(2);
      let m_x = init.getDistance(init.x0, init.y0, init.x, init.y0);
      let m_y = init.getDistance(init.x0, init.y0, init.x0, init.y);
      m_x = Math.floor(m_x);
      m_y = Math.floor(m_y);
      if (x > init.x0 && y < init.y0) {
        m_y = -m_y;
      } else if (x < init.x0 && y < init.y0) {
        m_x = -m_x;
        m_y = -m_y;
      } else if (x < init.x0 && y > init.y0) {
        m_x = -m_x;
      }
      data[m_x, m_y] += 1;
      //求二维数组最大值
      var max = 0;

    }
    for (let i = -50; i < 50; i++)
      for (let j = -50; j < 50; j++) {
        if (data[i][j] > max)
          max = data[i][j];
      }

    let final_data = [];
    //数组归一化
    for (let i = -50; i < 50; i++)
      for (let j = -50; j < 50; j++)
        final_data.push([i, j, data[i][j] / max]);
    return final_data;
  }

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
      // 定义图表，各种参数
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
        tooltip: {},
        xAxis: {
          type: 'value',
          max: 50,
          min: -50
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
            color: ['#4575b4', '#74add1', '#abd9e9', '#ffffbf',
              '#fee090', '#fdae61', '#f46d43', '#d73027',]
          }
        },
        series: [{
          name: 'Gaussian',
          type: 'heatmap',
          itemStyle: {
            opacity: 0.6
          },
          data: heatMapData(),
          emphasis: {
            itemStyle: {
              borderColor: '#000',
              borderWidth: 1
            }
          },
          progressive: 100, //渲染频率
          animation: false //动画
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
