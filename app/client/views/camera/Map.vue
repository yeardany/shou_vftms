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
      <div>
        <b><span v-html="locationDescribe"></span></b>
        <v-chart :style="{width: containerWidth + 'px',height: containerWidth * 0.3 + 'px' }"
                 manual-update
                 ref="op"/>
      </div>
      <v-chart :style="{width: containerWidth + 'px',height: containerWidth + 'px' }"
               manual-update
               ref="op1"/>
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
import axios from 'axios'
import api from '../../../config/api'

export default {
  name: "Map",
  components: {
    NavBar,
    'v-chart': ECharts
  },
  data() {
    return {
      x0: 0,
      y0: 0,
      locationDescribe: '',
      containerWidth: window.screen.width
    }
  },
  computed: {
    option() {
      return {
        xAxis: {
          type: 'value',
          max: 1,
          min: -1,
          name: "东",
          nameLocation: "end",
          nameTextStyle: {
            fontSize: 16,
            padding: [-10, -10, -10, -10]
          },
          axisLine: {
            symbol: ['none', 'arrow'],
            symbolSize: [8, 10]
          },
          splitLine: {show: false},
          axisTick: {show: false},
          axisLabel: {show: false}
        },
        yAxis: {
          type: 'value',
          max: 1,
          min: -1,
          name: "北",
          nameLocation: "end",
          nameTextStyle: {
            fontSize: 16,
            padding: [-10, -10, -10, -10]
          },
          axisLine: {
            symbol: ['none', 'arrow'],
            symbolSize: [8, 10]
          },
          splitLine: {show: false},
          axisTick: {show: false},
          axisLabel: {show: false}
        },
        grid: {
          left: '35%',
          right: '45%',
          top: '20%',
          bottom: '15%'
        },
        series: [{
          name: 'line',
          type: 'scatter',
          data: [0, 0],
          itemStyle: {color: '#05a1f8'}
        }]
      }
    },
    option1() {
      return {
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
                htmlStr += '设备偏移距离:<br>'
                htmlStr += parseFloat(param.value[0]).toFixed(2) + 'km<br>';
                htmlStr += '<div style="border: 1px solid #FFEB3B"></div>';
                htmlStr += '设备偏移角度:<br>' + param.value[1] + '°';
                htmlStr += '<div style="border: 1px solid #FFEB3B"></div>';
              } else if (i === 1)
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
          name: '中心位置',
          type: 'scatter',
          data: [[0, 0]],
          itemStyle: {color: '#05a1f8'}
        }, {
          coordinateSystem: 'polar',
          name: '中心经纬度',
          type: 'scatter',
          data: [[0, `${this.x0}°N,${this.y0}°E`]]
        }]
      }
    },
  },
  sockets: {
    connect() {
      console.log('Map.vue --->', 'has connected to server')
    },
    message(data) {

      if (Object.prototype.toString.call(data) !== '[object Object]') return
      if (!data['oLocation'] || !data['pLocation'] || !data['dist']) return

      // 收到服务端新数据重新渲染
      this.render(data)
    }
  },
  methods: {
    render(data) {
      let
        x0 = data['oLocation'][0],
        y0 = data['oLocation'][1],
        //修正数据
        x1 = Math.floor(x0), //x整数部分
        y1 = Math.floor(y0), //y整数部分
        x2 = (x1 + (x0 - x1).toFixed(4) *100/60).toFixed(3),
        y2 = (y1 + (y0 - y1).toFixed(4) *100/60).toFixed(3);

      // 请求获得数据赋值
      this.x0 = x2;
      this.y0 = y2;
      this.locationDescribe = `图中心原点位置即为标准点坐标:<br>(${x2}°N,${y2}°E)<br><br>`;

      console.log(this.x0,this.y0)
      console.log(this.locationDescribe)

      // 手动渲染图表
      const op = this.$refs.op
      const op1 = this.$refs.op1

      op.mergeOptions(this.option, true)
      op1.mergeOptions(this.option1, true)

    },
  },
  mounted() {

    this.$notify({type: 'primary', message: '加载中...', duration: 0});

    // 防止通知与地图同时渲染卡顿，延迟半秒请求
    setTimeout(() => {
      axios.post(api.api.getEquipments, {'pushID': this.$pushID}).then((res) => {
        let data = res.data,
          eq1 = data[2];

        if (data === [] || data === undefined || eq1 === undefined)
          throw {'message': '数据库连接失败'}

        console.log(eq1)
        this.render(eq1)

        setTimeout(() => {
          this.$notify.clear()
        }, 500);

      }).catch((e) => {
        this.$notify.clear()
        this.$notify({type: 'warning', message: e.message, duration: 1500});
      })
    }, 500);

  }
}
</script>
<style scoped>
span {
  display: block;
  padding: 0 1.5%
}
</style>
