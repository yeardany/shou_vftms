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
  dist = init.getDistance(init.x0, init.y0, init.x, init.y),
  s_dist = init.getDistance(init.x0, init.y, init.x, init.y);
init.r_rad = Math.asin(s_dist / dist);
let angle = init.r_rad.toFixed(2),
  angles = init.getAngles(angle),

  data_loc =
    [[30.4023, 121.98073],[30.40465, 121.98275],[30.40766, 121.98337],[30.40896, 121.98575],[30.40996, 121.98915],
    [30.41112, 121.99232],[30.41303, 121.99315],[30.41486, 121.99535],[30.41586, 121.99625],[30.41778, 121.99751],
    [30.41896, 122.00125],[30.42545, 122.00473],[30.42593, 122.00623],[30.42923, 122.00823],[30.43123, 122.00923],
    [30.43253, 122.01125],[30.43523, 122.01473],[30.43923, 122.01523],[30.44423, 122.01873],[30.45793, 122.01993],
    [30.46323, 122.02073],[30.46423, 122.02434],[30.46923, 122.02434],[30.47023, 122.02534],[30.47193, 122.02834],
    [30.47723, 122.03134],[30.48523, 122.03434],[30.48923, 122.03734],[30.49323, 122.03734],[30.49913, 122.03734],
    [30.50223, 122.04434],[30.51123, 122.04434],[30.51443, 122.04634],[30.51913, 122.04634],[30.52293, 122.04634],
    [30.52423, 122.05434],[30.52753, 122.05434],[30.53193, 122.05734],[30.53933, 122.05734],[30.54493, 122.05734],
    [30.55123, 122.06439],[30.55423, 122.06439],[30.55931, 122.06439],[30.56231, 122.06839],[30.56311, 122.06839],
    [30.56423, 122.07434],[30.56753, 122.07434],[30.56893, 122.07534],[30.56933, 122.07534],[30.56993, 122.07934],
    [30.57123, 122.08434],[30.57353, 122.08434],[30.57593, 122.08534],[30.57833, 122.08834],[30.57993, 122.08934],
    [30.58123, 122.09434],[30.58353, 122.09434],[30.58593, 122.09434],[30.58833, 122.09734],[30.58993, 122.09934],
    [30.59123, 122.10434],[30.59353, 122.10434],[30.59593, 122.10634],[30.59833, 122.10634],[30.59993, 122.10634],
    [30.60123, 122.11434],[30.60353, 122.11434],[30.60593, 122.11434],[30.60833, 122.11734],[30.60993, 122.11934],
    [30.61123, 122.12434],[30.61353, 122.12634],[30.61593, 122.12734],[30.61833, 122.12874],[30.61993, 122.12834],
    [30.62123, 122.13434],[30.62353, 122.13434],[30.62593, 122.13434],[30.62833, 122.13834],[30.62993, 122.13934],
    [30.63123, 122.14334],[30.63353, 122.14334],[30.63593, 122.14734],[30.63833, 122.14834],[30.63993, 122.15334],
    [30.64123, 122.16134],[30.64353, 122.16134],[30.64593, 122.16934],[30.64833, 122.17134],[30.64993, 122.17834],
    [30.65223, 122.18434],[30.65453, 122.18434],[30.65893, 122.18634],[30.65933, 122.19134],[30.65993, 122.19934],
    [30.66412, 122.20446],[30.66492, 122.20543],[30.66512, 122.20546],[30.66712, 122.20546],[30.66812, 122.20546]],

  heatMapData = () => {

    let data = [];
    for (let i = -50; i <= 50; i++){
      data[i] = [];
      for (let j = -50; j <= 50; j++)
        data[i][j] = 0;
    }

    console.log(data_loc.length)
    for (let i = 0; i < data_loc.length ; i++) {
      let x = data_loc[i][1].toFixed(2);
      let y = data_loc[i][0].toFixed(2);
      console.log('x:'+x+',y:'+y)
      let m_x = init.getDistance(init.x0, init.y0, init.x0, x);
      let m_y = init.getDistance(init.x0, init.y0, y, init.y0);
      m_x = Math.floor(m_x);
      m_y = Math.floor(m_y);
      if (x > init.y0 && y < init.x0) {
        m_y = -m_y;
      } else if (x < init.y0 && y < init.x0) {
        m_x = -m_x;
        m_y = -m_y;
      } else if (x < init.y0 && y > init.x0) {
        m_x = -m_x;
      }
      data[m_x][m_y] += 1;
      console.log('取整定向后距离标准点横纵向距离：'+m_x+','+m_y)
    }
    //求二维数组最大值
    var max = 0;
    for (let i = -50; i < 50; i++)
      for (let j = -50; j < 50; j++) {
        if (data[i][j] > max)
          max = data[i][j];
      }

    console.log('最大值'+max)

    let final_data = [];
    //数组归一化
    for (let i = -50; i < 50; i++){
      for (let j = -50; j < 50; j++)
        final_data.push([i, j, data[i][j] / max]);
    }

/*    console.log(final_data[0][0])
    console.log(final_data)*/
    for (let i = 0; i < 10000; i++){
        if (final_data[i][2] != 0)
          console.log('非零坐标'+'('+final_data[i][0]+','+final_data[i][1]+') 的值是'+final_data[i][2])
      }

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
            color: ['#abd9e9', '#ffffbf',
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
