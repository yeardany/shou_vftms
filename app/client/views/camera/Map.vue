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
      <label for="">{{ location1 }}</label><br>
      <label for="">{{ location2 }}</label><br>
      <label for="">{{ location3 }}</label>
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

let x0 = 30.66, y0 = 122.20, x = 30.99, y = 121.87;
//  30.33 < x < 30.99  121.87 < y < 122.53   距离大约在50km之内
let angle = 45, dist = 3.14;

let R = 6371.14;//地球半径 单位km
function rad(r) {
  return r * 3.1415926 / 180.0;
}

function r_rad(x) {
  return x * 180.0 / 3.1415926;
}

function getDistance(x0, y0, x, y) {
  x0 = rad(x0);
  y0 = rad(y0);
  x = rad(x);
  y = rad(y);
  let lng = y - y0,
    d = R * Math.acos(Math.cos(x) * Math.cos(x0) * Math.cos(lng) + Math.sin(x0) * Math.sin(x));
  return d;
}

dist = getDistance(x0, y0, x, y);
// 已知斜边dist，再求对边s_dist，用arcsin函数求角度
let s_dist = getDistance(x0, y, x, y);
angle = r_rad(Math.asin(s_dist / dist)).toFixed(2);
var angles = 0;
console.log(angle);
if (x < x0 && y > y0){
  angles = (parseFloat(angle)+90).toFixed(2);
  console.log(angles);
}
else if (x < x0 && y < y0){
  angles = (parseFloat(angle)+180).toFixed(2);
  console.log(angles);
}
else if (x > x0 && y < y0){
  angles = (parseFloat(angle)+270).toFixed(2);
  console.log(angles);
}

let data_loc = [[30.402312, 121.98312], [30.404635, 121.9867565], [30.4076786, 121.9883725],[30.4076786, 121.9883725],
  [30.4154325, 122.003232],[30.4159123, 122.004534],[30.454523, 122.084534],[30.459123, 122.08434],[30.557123, 122.14439]
   [30.66423, 122.203223], [30.6631, 122.20231], [30.66231, 122.2034], [30.662311, 122.20375], [30.66232, 122.20546],
  [30.66232, 122.20543], [30.6632, 122.20546]],

data = () => {
  let data = [];
  for (let i = -50; i <= 50; i++)
    for (let j = -50; j <= 50; j++)
      data[i, j] = 0;

  for (let i = 0; i < data_loc.length; i++) {
    let x =data_loc[i][1].toFixed(2);
    let y =data_loc[i][0].toFixed(2);
    let m_x = getDistance(x0,y0,x,y0);
    let m_y = getDistance(x0,y0,x0,y);
    m_x = Math.floor(m_x);
    m_y = Math.floor(m_y);
    if (x > x0 && y < y0){
      m_y = -m_y;
    }
    else if (x < x0 && y < y0){
      m_x = -m_x;
      m_y = -m_y;
    }
    else if (x < x0 && y > y0) {
      m_x = -m_x;
    }
    data[m_x,m_y] += 1;
    //求二维数组最大值
    var max = 0;
    for(let i=-50;i<50;i++)
      for(let j=-50;j<50;j++){
        if(data[i][j]>max)
          max = data[i][j];
      }
  }

  let final_data = [];
  //数组归一化
  for(let i=-50;i<50;i++)
    for(let j=-50;j<50;j++)
      final_data.push([i,j,data[i][j]/max]);
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
      location1 : '1号设备海上定位',
      location2 : '标准位置: ' + x0 + '°N,' + y0 + '°E',
      location3 : '实际位置: ' + x + '°N,' + y + '°E',
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
            opacity : 0.6
          },
          data: data(),
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
</style>
