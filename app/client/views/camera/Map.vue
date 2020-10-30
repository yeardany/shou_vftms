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
      baseUrl: '/api',
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
    locationDescribe() {
      return `下列各图中心原点位置即为标准点坐标:<br>(${this.x0}°N,${this.y0}°E)<br><br>`
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
            this.resetHeat()
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


    // let
    //   x0 = 30.66,
    //   y0 = 122.20,
    //   x = 30.40,
    //   y = 121.98,
    //   data_loc = [
    //     [30.4023, 121.98073], [30.40465, 121.98275], [30.40766, 121.98337], [30.40896, 121.98575], [30.40996, 121.98915],
    //     [30.41112, 121.99232], [30.41303, 121.99315], [30.41486, 121.99535], [30.41586, 121.99625], [30.41778, 121.99751],
    //     [30.41896, 122.00125], [30.42545, 122.00473], [30.42593, 122.00623], [30.42923, 122.00823], [30.43123, 122.00923],
    //     [30.43253, 122.01125], [30.43523, 122.01473], [30.43923, 122.01523], [30.44423, 122.01873], [30.45793, 122.01993],
    //     [30.46323, 122.02073], [30.46423, 122.02434], [30.46923, 122.02434], [30.47023, 122.02534], [30.47193, 122.02834],
    //     [30.47723, 122.03134], [30.48523, 122.03434], [30.48923, 122.03734], [30.49323, 122.03734], [30.49913, 122.03734],
    //     [30.50223, 122.04434], [30.51123, 122.04434], [30.51443, 122.04634], [30.51913, 122.04634], [30.52293, 122.04634],
    //     [30.52423, 122.05434], [30.52753, 122.05434], [30.53193, 122.05734], [30.53933, 122.05734], [30.54493, 122.05734],
    //     [30.55123, 122.06439], [30.55423, 122.06439], [30.55931, 122.06439], [30.56231, 122.06839], [30.56311, 122.06839],
    //     [30.56423, 122.07434], [30.56753, 122.07434], [30.56893, 122.07534], [30.56933, 122.07534], [30.56993, 122.07934],
    //     [30.57123, 122.08434], [30.57353, 122.08434], [30.57593, 122.08534], [30.57833, 122.08834], [30.57993, 122.08934],
    //     [30.58123, 122.09434], [30.58353, 122.09434], [30.58593, 122.09434], [30.58833, 122.09734], [30.58993, 122.09934],
    //     [30.59123, 122.10434], [30.59353, 122.10434], [30.59593, 122.10634], [30.59833, 122.10634], [30.59993, 122.10634],
    //     [30.60123, 122.11434], [30.60353, 122.11434], [30.60593, 122.11434], [30.60833, 122.11734], [30.60993, 122.11934],
    //     [30.61123, 122.12434], [30.61353, 122.12634], [30.61593, 122.12734], [30.61833, 122.12874], [30.61993, 122.12834],
    //     [30.62123, 122.13434], [30.62353, 122.13434], [30.62593, 122.13434], [30.62833, 122.13834], [30.62993, 122.13934],
    //     [30.63123, 122.14334], [30.63353, 122.14334], [30.63593, 122.14734], [30.63833, 122.14834], [30.63993, 122.15334],
    //     [30.64123, 122.16134], [30.64353, 122.16134], [30.64593, 122.16934], [30.64833, 122.17134], [30.64993, 122.17834],
    //     [30.65223, 122.18434], [30.65453, 122.18434], [30.65893, 122.18634], [30.65933, 122.19134], [30.65993, 122.19934],
    //     [30.66412, 122.20446], [30.66492, 122.20543], [30.66512, 122.20546], [30.66712, 122.20546], [30.66812, 122.20546]
    //   ];


    axios.get(`${this.baseUrl}/getEquipments`).then((res) => {
      let data = res.data,
        eq1 = data[0],
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

      // 手动渲染图表
      const op = this.$refs.op
      const op1 = this.$refs.op1
      const op2 = this.$refs.op2
      const op3 = this.$refs.op3

      op.mergeOptions(this.option, true)
      op1.mergeOptions(this.option1, true)
      op2.mergeOptions(this.option2, true)
      op3.mergeOptions(this.option3, true)

    })
  }
}
</script>
<style scoped>
span {
  display: block;
  padding: 0 1.5%
}
</style>
