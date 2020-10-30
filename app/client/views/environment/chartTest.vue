<template>

  <div>

    <select v-model="attrib" class="drop-box">

      <!--      <option value="1" v-for="a in Att">{{a}}</option>-->
      <option value="0">溶解氧</option>
      <option value="1">pH值</option>
      <option value="2">水温</option>
      <option value="3">营养盐</option>
      <option value="4">透明度</option>

    </select>


    <input type="date" class="date-box" v-model="date">
    <van-button type="primary" class="button-box" @click="selAtt">查询</van-button>

    <van-row>
      <van-col span="24">
        <v-chart :options="option3D"/>
          <v-chart :options="option2D"/>
      </van-col>
    </van-row>


  </div>
</template>


<script>
import ECharts from 'vue-echarts'
import 'echarts-gl';
import 'echarts/lib/chart/line'


// let att = new Vue({
//   el : '#pid',
//   Att : ['溶解氧','pH值','水温','营养盐','透明度']
// })


export default {
  name: "chartTest",
  data() {
    return {
      attrib: '',
      date: '',
      xData: ['00：00', '01：00', '02：00', '03：00', '04：00', '05：00', '06：00', '07：00', '08：00', '09：00', '10：00', '11：00',
        '12：00', '13：00', '14：00', '15：00', '16：00', '17：00', '18：00', '19：00', '20：00', '21：00', '22：00', '23：00'],
      yData: ['', '', '', '', '', '', ''],
      detail: [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]],
      zText: '溶解氧',
      containerWidth: window.screen.width
    }
  },
  computed: {
    option3D() {
      return {
        visualMap: {
          max: 14,
          inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          }
        },
        xAxis3D: {
          name: '',
          type: 'category',
          data: this.xData
        },
        yAxis3D: {
          name: '',
          type: 'category',
          data: this.yData
        },
        zAxis3D: {
          name: this.zText,
          max: 14,
          type: 'value'
        },
        grid3D: {
          viewControl: {
            distance: 300
          },
          boxWidth: 200,
          boxDepth: 80,
          light: {
            main: {
              intensity: 1.2
            },
            ambient: {
              intensity: 0.3
            }
          }
        },
        series: [{
          type: 'bar3D',
          data: this.detail.map(function (item) {
            return {
              value: [item[1], item[0], item[2]]
            }
          }),
          shading: 'color',
          label: {
            show: false,
            textStyle: {
              fontSize: 16,
              borderWidth: 1
            }
          },
          itemStyle: {
            opacity: 0.4
          },
          emphasis: {
            label: {
              textStyle: {
                fontSize: 20,
                color: '#990000'
              }
            },
            itemStyle: {
              color: '#900'
            }
          }
        },

        ]
      }
    },
    option2D() {
      return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [this.zText, this.zText+'上警戒线', this.zText+'下警戒线']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['00：00', '01：00', '02：00', '03：00', '04：00', '05：00', '06：00', '07：00', '08：00', '09：00', '10：00', '11：00',
            '12：00', '13：00', '14：00', '15：00', '16：00', '17：00', '18：00', '19：00', '20：00', '21：00', '22：00', '23：00']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: this.zText,
            type: 'line',
            data: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
          },
          {
            name: this.zText + '上警戒线',
            type: 'line',
            data: [5.2, 6.3, 7, 4.5, 7, 7.3, 5.2, 6.3, 7, 4.5, 7, 7.3, 5.2, 6.3, 7, 4.5, 7, 7.3, 5.2, 6.3, 7, 4.5, 7, 7.3]
          },
          {
            name: this.zText + '下警戒线',
            type: 'line',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ]
      }
    }
  },
  methods: {
    selAtt() {
      //修改3D z轴 y轴属性
      let sAtt = this.attrib
      let Att = ['溶解氧', 'pH值', '水温', '营养盐', '透明度']
      this.zText = Att[sAtt]
      let sDate = this.date
      let dateTime
      for (let i = 0; i < 7; i++) {
        dateTime = new Date(sDate)
        dateTime = dateTime.setDate(dateTime.getDate() - 6 + i);
        dateTime = new Date(dateTime);
        this.yData[i] = dateTime.toLocaleDateString()
      }



    }
  },
  components: {
    'v-chart': ECharts
  }
}
</script>

<style scoped>
.echarts {
  width: 100%;
}


ul {
  list-style: none;
}

.drop-box {
  box-sizing: border-box;
  width: 80px;
  height: 25px;
  margin-left: 15px;
  font-size: 15px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.175);
  overflow: hidden;
  margin-bottom: 0px;
}

.date-box {
  box-sizing: border-box;
  width: 150px;
  height: 25px;
  margin-left: 5px;
  font-size: 15px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.175);
  overflow: hidden;
  margin-bottom: 0px;
}

.button-box {
  box-sizing: border-box;
  width: 80px;
  height: 28px;
  margin-left: 15px;
  font-size: 15px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.175);
  overflow: hidden;
  margin-bottom: 0px;
}

.drop-box p {
  height: 24px;
  padding-top: 5px;
  position: relative;
  z-index: 10;
  margin: 0px;
}

.drop-box p:after { /*三角箭头*/
  position: absolute;
  top: 10px;
  right: 10px;
  width: 0px;
  height: 0px;
  content: '';
  border: 6px solid transparent;
  border-top-color: #E4E4E3;
}

.drop-box .menu {
  display: none;
  background-color: #fff;
}

.drop-box .menu li {
  height: 35px;
  line-height: 35px;
}

.drop-box .menu li:hover {
  background-color: #fee5ca;
  color: #fda653;
}

.drop-box .menu .dp-active {
  display: none;
}

.drop-box:hover {
  cursor: pointer;
}

.drop-box:hover .menu {
  display: block;
}

.drop-box:hover p:after {
  top: 5px;
  border: 6px solid transparent;
  border-bottom-color: #E4E4E3;
}

</style>
