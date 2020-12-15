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
        <!--        <v-chart :style="{width: containerWidth + 'px',height: containerWidth * 0.3 + 'px' }"-->
        <!--                 manual-update-->
        <!--                 ref="op"/>-->
      </div>
      <v-chart :style="{width: containerWidth + 'px',height: containerWidth + 'px' }"
               manual-update
               ref="op1"/>
      <!--新添时间与纬度、经度关系折线图-->
      <v-chart :style="{width: containerWidth + 'px',height: containerWidth + 'px' }"
               manual-update
               ref="op4"/>
      <v-chart :style="{width: containerWidth + 'px',height: containerWidth + 'px' }"
               manual-update
               ref="op5"/>
      <v-chart :style="{width: containerWidth + 'px',height: containerWidth + 'px' }"
               manual-update
               ref="op2"/>
      <!--      <v-chart :style="{width: containerWidth + 'px',height: containerWidth + 'px' }"-->
      <!--               manual-update-->
      <!--               ref="op3"/>-->
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
      max_dist: 0,
      R: 6371.14,
      data_loc: [],
      //新增时间和经纬度二维数据
      data_j: [],
      data_w: [],
      //用于显示经度纬度的偏移距离
      dist_jj: [],
      dist_ww: [],
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
    dist_j() {
      return this.heat.dist_j
    },
    dist_w() {
      return this.heat.dist_w
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
          text: '设备定位图'
        },
        radiusAxis: {
          max: 5
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
                if (param.value[0] === undefined || param.value[0] * 1 < 0.1)
                  htmlStr += '设备原始位置<br>'
                else {
                  if (param.value[0] * 1 > this.max_dist) {
                    htmlStr += '<div style="color: #FF0000">WRANING!偏移距离过远</div>';
                    htmlStr += '<div style="border: 1px solid #ff0000"></div>';
                  }
                  htmlStr += '设备偏移距离:<br>'
                  htmlStr += (param.value[0] * 1).toFixed(3) + 'km<br>';
                  htmlStr += '<div style="border: 1px solid #FFEB3B"></div>';
                  htmlStr += '设备偏移角度:<br>' + param.value[1] + '°';
                  htmlStr += '<div style="border: 1px solid #FFEB3B"></div>';
                }
              } else if (i === 1)
                htmlStr += param.value[1] === undefined ? '' : '设备位置坐标:<br>' + param.value[1];
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
              if (this.dist > this.max_dist)
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
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            let htmlStr = '';
            htmlStr += '<div style="border: 1px solid #FFEB3B"></div>';
            if ((params.value[0] === "0.00" || params.value[0] === 0.00)
              && (params.value[1] === "0.00" || params.value[1] === 0.00))
              htmlStr += `设备位于标准点,<br>热力值为${params.value[2].toFixed(2)}`;
            else
              htmlStr += `设备在偏移至此处,<br>热力值为${params.value[2].toFixed(2)}`;
            htmlStr += '<div style="border: 1px solid #FFEB3B"></div>';
            return htmlStr;
          }
        },
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
        dataZoom: [{
          type: 'inside',
          xAxisIndex: 0,
          filterMode: 'empty',
          minSpan: 30,
          maxSpan: 100
        }, {
          type: 'inside',
          yAxisIndex: 0,
          filterMode: 'empty',
          minSpan: 30,
          maxSpan: 100
        }],
        series: [{
          name: '该位置偏移频率',
          type: 'heatmap',
          itemStyle: {opacity: 0.6},
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
          filterMode: 'empty',
          minSpan: 30,
          maxSpan: 100
        }, {
          type: 'inside',
          yAxisIndex: 0,
          filterMode: 'empty',
          minSpan: 30,
          maxSpan: 100
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
    },
    option4() {
      return {
        title: {
          text: '设备位置纬度随时间变化图'
        },
        legend: {
          data: ['实时纬度（当前位置）'],
          bottom: 'bottom'
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            let htmlStr = '';
            for (let i = 0; i < params.length; i++) {
              let param = params[i];
              if (i === 0) {
                htmlStr += '<div style="border: 1px solid #FFEB3B"></div>';
                htmlStr += `时间:${param.value[0]}`;
                htmlStr += '<div style="border: 1px solid #FFEB3B"></div>';
                htmlStr += `设备坐标纬度:<br>${param.value[1]}`;
                htmlStr += '<div style="border: 1px solid #FFEB3B"></div>';
              } else if (i === 1) {
                htmlStr += `设备纬度偏移:<br>${param.value[1]}km`;
                htmlStr += '<div style="border: 1px solid #FFEB3B"></div>';
              }
            }
            return htmlStr;
          }
        },
        xAxis: {
          type: 'category',
          axisLine: {
            onZero: true,
            symbol: ['none', 'arrow'],
            symbolSize: [5, 7]
          },
          name: "时间",
          nameLocation: "end",
          nameTextStyle: {
            fontSize: 12,
            padding: [0, 10, 0, -10]
          },
        },
        yAxis: {
          min: parseFloat(this.x0)-0.5,
          max: parseFloat(this.x0)+0.5,
          type: 'value',
          axisLine: {
            onZero: true,
            symbol: ['none', 'arrow'],
            symbolSize: [5, 7]
          },
          name: "坐标纬度",
          nameLocation: "end",
          nameTextStyle: {
            fontSize: 12,
            padding: [15, 0, 0, 0]
          },
        },
        grid: {
          left: '15%'
        },
        series: [
          {
            name: '实时纬度（当前位置）',
            type: 'line',
            symbolSize: 6,
            data: this.data_w,
            markLine:{
              symbol: ['none', 'none'],
              data: [{
                name: '原始位置',
                yAxis: this.x0
              }],
              silent: false,
              lineStyle: {
                type: "dashed",
                color:"#000000"
              },
              label:{
                position:'end',
                formatter:this.x0,
                fontSize:'9'
              },
            }
          },
          {
            name: '纬度偏移距离',
            type: 'line',
            data: this.dist_ww
          }]
      }
    },
    option5() {
      return {
        title: {
          text: '设备位置经度随时间变化图'
        },
        legend: {
          data: ['实时经度（当前位置）'],
          bottom: 'bottom'
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            let htmlStr = '';
            for (let i = 0; i < params.length; i++) {
              let param = params[i];
              if (i === 0) {
                htmlStr += '<div style="border: 1px solid #FFEB3B"></div>';
                htmlStr += `时间:${param.value[0]}`;
                htmlStr += '<div style="border: 1px solid #FFEB3B"></div>';
                htmlStr += `设备坐标经度:<br>${param.value[1]}`;
                htmlStr += '<div style="border: 1px solid #FFEB3B"></div>';
              } else if (i === 1) {
                htmlStr += `设备经度偏移:<br>${param.value[1]}km`;
                htmlStr += '<div style="border: 1px solid #FFEB3B"></div>';
              }
            }
            return htmlStr;
          }
        },
        xAxis: {
          type: 'category',
          axisLine: {
            onZero: true,
            symbol: ['none', 'arrow'],
            symbolSize: [5, 7]
          },
          name: "时间",
          nameLocation: "end",
          nameTextStyle: {
            fontSize: 12,
            padding: [0, 10, 0, -10]
          },
        },
        yAxis: {
          min: parseFloat(this.y0)-0.5,
          max: parseFloat(this.y0)+0.5,
          type: 'value',
          axisLine: {
            onZero: true,
            symbol: ['none', 'arrow'],
            symbolSize: [5, 7]
          },
          name: "坐标经度",
          nameLocation: "end",
          nameTextStyle: {
            fontSize: 12,
            padding: [15, 0, 0, 0]
          },
        },
        grid: {
          left: '15%'
        },
        series: [
          {
            name: '实时经度（当前位置）',
            type: 'line',
            symbolSize: 6,
            data: this.data_j,
            markLine:{
              symbol: ['none', 'none'],
              data: [{
                name: '原始位置',
                yAxis: this.y0
              }],
              silent: false,
              lineStyle: {
                type: "dashed",
                color:"#000000"
              },
              label:{
                position:'end',
                formatter:this.y0,
                fontSize:'9'
              },
            }
          },
          {
            name: '经度偏移距离',
            type: 'line',
            data: this.dist_jj
          }]
      }
    }
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
    render(data, renderAll = false) {

      if (!(data && data['pLocation'] && data['lHistory'])) return

      let {oLocation: [x0, y0], pLocation: [x, y], dist: max_dist, lHistory, upLoadTime} = data,
        data_loc = lHistory.map(i => {
          return i.data
        }),
        date = lHistory.map(i => {
          const leadingZero = (num) => `0${num}`.slice(-2),
            d = new Date(i.time)
          return [d.getHours(), d.getMinutes(), d.getSeconds()].map(leadingZero).join(':');
        })

      // 计算更新时间
      let minute = new Date().getMinutes()
      if (renderAll)
        if (0 <= minute && minute < 20)
          minute = '00'
        else if (20 <= minute && minute < 40)
          minute = '20'
        else
          minute = '40'
      let uploadDesc = upLoadTime === "" ? "" : `设备最后上传时间:${upLoadTime.substr(5, 11)}<br>`,
        updateIme = `${uploadDesc}数据更新时间:${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours()}:${minute}`

      // 请求获得数据赋值
      this.x0 = x0.toFixed(3);
      this.y0 = y0.toFixed(3);
      this.x = x.toFixed(3);
      this.y = y.toFixed(3);
      this.max_dist = max_dist;
      this.data_loc = data_loc;
      this.locationDescribe = `下图中心为原始位置:(${this.x0}°N,${this.y0}°E)<br>当前位置:(${this.x}°N,${this.y}°E)<br>${updateIme}`;

      //creat data_w,data_j to use in op4,op5
      for (let i = 0; i < date.length; i++) {
        this.data_w.push([date[i], data_loc[i][0].toFixed(3)])
        this.data_j.push([date[i], data_loc[i][1].toFixed(3)])
        this.dist_jj.push([date[i], this.dist_j[i]])
        this.dist_ww.push([date[i], this.dist_w[i]])
      }

      // 手动渲染图表
      // const op = this.$refs.op
      const op1 = this.$refs.op1
      const op2 = this.$refs.op2
      // const op3 = this.$refs.op3
      const op4 = this.$refs.op4
      const op5 = this.$refs.op5

      op1.mergeOptions(this.option1, true)
      if (renderAll) {
        // op.mergeOptions(this.option, true)
        op2.mergeOptions(this.option2, true)
        // op3.mergeOptions(this.option3, true)
        op4.mergeOptions(this.option4, true)
        op5.mergeOptions(this.option5, true)
      }

      // 清空热力图计算数据
      this.resetHeat()
    },
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

      axios.post(api.api.getEquipmentById, {'pushID': this.$pushID, 'id': this.$route.params.id}).then((res) => {

        let data = res.data

        if (data === [] || data === undefined)
          throw {'message': '数据库连接失败'}
        else
          this.render(data, true)

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
  padding: 0 1.5% 1.5%;
  color: rgb(50, 50, 50)
}
</style>
