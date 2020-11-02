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
      <v-chart :style="{width: containerWidth + 'px',height: containerWidth + 'px' }"
               manual-update
               ref="op2"/>
      <v-chart :style="{width: containerWidth + 'px',height: containerWidth + 'px' }"
               manual-update
               ref="op3"/>
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
      x: 0,
      y: 0,
      R: 6371.14,
      data_loc: [],
      locationDescribe: '',
      containerWidth: window.screen.width
    }
  },
  computed: {
    init() {
      return new LocationCompute(this.x0, this.y0, this.x, this.y, this.R)
    },
    heat() {
      let h = new heatMap(this.init, this.data_loc)
      h.getHeatMapData()
      return h
    },
    dist() {
      return this.init.getDistance(this.x0, this.y0, this.x, this.y)
    },
    angles() {
      let s_dist = this.init.getDistance(this.x0, this.y, this.x, this.y);
      this.init.r_rad = Math.asin(s_dist / this.dist)
      let angle = this.init.r_rad.toFixed(2)
      return this.init.getAngles(angle)
    },
    final_data() {
      return this.heat.final_data
    },
    xy_data() {
      return this.heat.xy_data
    },
    time() {
      return this.heat.time
    },
    loc() {
      return this.heat.loc
    },
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
                if (parseInt(param.value[0]) > 30) {
                  htmlStr += '<div style="color: #FF0000">WRANING!偏移距离过远</div>';
                  htmlStr += '<div style="border: 1px solid #ff0000"></div>';
                }
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
          name: '偏移',
          type: 'scatter',
          data: [[0, 0], [this.dist, this.angles]],
          itemStyle: {
            color: (c) => {
              if (this.dist > 30)
                return '#ff0000';
              else
                return '#05a1f8';
            }
          }
        }, {
          coordinateSystem: 'polar',
          name: '偏移经纬度',
          type: 'scatter',
          data: [[0, `${this.x0}°N,${this.y0}°E`], [this.dist, `${this.x}°N,${this.y}°E`]]
        }, {
          coordinateSystem: 'polar',
          name: '中心',
          type: 'scatter',
          data: [0, 0],
          itemStyle: {color: '#05a1f8'}
        }]
      }
    },
    option2() {
      return {
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
          },
          axisLine: {
            symbol: ['arrow', 'arrow'],
            symbolSize: [5, 7]
          },
          splitNumber: 10
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
          },
          axisLine: {
            symbol: ['arrow', 'arrow'],
            symbolSize: [5, 7]
          },
          splitNumber: 10
        },
        grid: {
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
          name: '该位置偏移频率',
          type: 'heatmap',
          itemStyle: {
            opacity: 0.6
          },
          data: this.final_data,
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
    },
    option3() {
      return {
        title: {
          text: '设备随时间位置变化图'
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            let htmlStr = '';
            for (let i = 0; i < params.length; i++) {
              let param = params[i];
              if (param.componentIndex === 1) {
                if (param.value[0] === "0.00" || param.value[0] === 0.00)
                  htmlStr += `位于标准点处时间:<br>${param.value[1]}`;
                else
                  htmlStr += `偏移至此处时间:<br>${param.value[1]}`;
                htmlStr += '<div style="border: 1px solid #FFEB3B"></div>';
              } else if (param.componentIndex === 2)
                htmlStr += `此处经纬度:<br>${param.value[1]}`;
            }
            return htmlStr;
          }
        },
        xAxis: {
          min: -50,
          max: 50,
          type: 'value',
          axisLine: {
            onZero: true,
            symbol: ['arrow', 'arrow'],
            symbolSize: [5, 7]
          },
          name: "距标准点横向距离:km",
          nameLocation: "middle",
          nameTextStyle: {
            fontSize: 12,
            padding: [10, 10, 10, 10]
          },
        },
        yAxis: {
          min: -50,
          max: 50,
          type: 'value',
          axisLine: {
            onZero: true,
            symbol: ['arrow', 'arrow'],
            symbolSize: [5, 7]
          },
          name: "距标准点纵向距离:km",
          nameLocation: "middle",
          nameTextStyle: {
            fontSize: 12,
            padding: [10, 10, 10, 10]
          },
        },
        grid: {
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
          data: this.xy_data
        }, {
          name: 'time',
          type: 'line',
          data: this.time
        }, {
          name: 'location',
          type: 'line',
          data: this.loc
        }]
      }
    }
  },
  methods: {
    resetHeat() {
      this.heat.reset()
    }
  },
  mounted() {

    /**
     * (x0, y0) : 浮标固定（初始）位置
     * (x, y) : 浮标漂移（当前）位置
     * data_loc : 浮标历史漂移位置记录，用于热力图
     * @type {LocationCompute}
     */

    this.$notify({type: 'primary', message: '加载中...', duration: 0});

    // 防止通知与地图同时渲染卡顿，延迟半秒请求
    setTimeout(() => {
      axios.post(api.api.getEquipments, {'pushID': this.$pushID}).then((res) => {
        let data = res.data,
          eq1 = data[0];

        if (data === [] || data === undefined || eq1 === undefined)
          throw {'message': '数据库连接失败'}

        let
          x0 = eq1['oLocation'][0],
          y0 = eq1['oLocation'][1],
          x = eq1['pLocation'][0],
          y = eq1['pLocation'][1],
          data_loc = eq1['lHistory']

        // 请求获得数据赋值
        this.x0 = x0;
        this.y0 = y0;
        this.x = x;
        this.y = y;
        this.data_loc = data_loc;
        this.locationDescribe = `下列各图中心原点位置即为标准点坐标:<br>(${x0}°N,${y0}°E)<br><br>`;

        // 手动渲染图表
        const op = this.$refs.op
        const op1 = this.$refs.op1
        const op2 = this.$refs.op2
        const op3 = this.$refs.op3

        op.mergeOptions(this.option, true)
        op1.mergeOptions(this.option1, true)
        op2.mergeOptions(this.option2, true)
        op3.mergeOptions(this.option3, true)

        // 清空热力图计算数据
        this.resetHeat()

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
