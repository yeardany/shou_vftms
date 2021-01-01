<template>
  <!--<van-grid :gutter="10" :column-num="3" :clickable="true">
    <van-grid-item icon="tv-o" v-for="item in list"
                   :key="item.id"
                   :text="item.name"
                   to="/cameraDetail">
    </van-grid-item>
  </van-grid>-->
  <div>
    <div class="title">监测区域分布</div>
    <v-chart class="mapChart" :style="chartStyle" manual-update ref="myecharts"/>
  </div>
</template>

<script>
import NavBar from '../../layout/NavBar.vue'
import echarts from 'vue-echarts'
import china from 'echarts/map/json/china.json'
import 'echarts/map/js/china.js'
import 'echarts-gl/dist/echarts-gl.js'

export default {
  name: "fishCamera",
  components: {
    NavBar,
    'v-chart': echarts
  },
  data() {
    return {
      /*list: [
        {id: '0', name: '渔排2号'},
        {id: '1', name: '渔排1号'},
        {id: '2', name: '福鲍1号'},
        {id: '3', name: '福鲍2号'},
        {id: '4', name: '福鲍3号'},
        {id: '5', name: '福鲍5号'},
        {id: '6', name: '渔排3号'},
        {id: '7', name: '渔排4号'}
      ]*/
      chartStyle: {
        height: window.screen.height - 150 + 'px',
        width: window.screen.width + 'px'
      },
      list: [
        {name: '渔排1号', value: [123.72, 39.07]},
        {name: '福鲍1号', value: [123.33, 39.22]},
        {name: '渔排2号', value: [123.46, 38.76]},
        {name: '福鲍2号', value: [122.86, 39.24]},
      ]
    }
  },
  computed: {
    option() {
      return {
        backgroundColor: '#fff',
        tooltip: {
          trigger: "item",
          triggerOn: 'click',
          formatter: (params) => {
            this.$dialog.confirm({
              title: '监控详情',
              message: '獐子岛-' + params.name + '\n' + params.value[0] + '°E, ' + params.value[1] + '°N',
              confirmButtonText: '查看监控'
            }).then(() => {
              this.$router.push('/cameraDetail')
            }).catch(() => {
              console.log('取消')
            })
          }
        },
        geo: {
          map: "china",
          layoutCenter: ['20%', '50%'],
          layoutSize: 2200,
          roam: true,
          center: [120, 39],
          scaleLimit: {
            min: 2,
            max: 6
          },
          itemStyle: {
            normal: {
              borderWidth: 1,
              areaColor: "rgb(234,233,233)",
              borderColor: "rgb(25, 137, 250)"
            }
          }
        },
        series: [
          {
            name: "獐子岛",
            type: "scatter",
            coordinateSystem: "geo",
            data: this.list,
            triggerEvent: true,
            symbolSize: 8,
            label: {
              normal: {
                formatter: "{b}",
                position: "top",
                show: true
              },
            },
            itemStyle: {
              normal: {
                color: "rgb(25, 137, 250)",
                shadowBlur: 10,
                shadowColor: "#0da3ea"
              }
            }
          }
        ]
      }
    }

  },
  mounted() {
    const chart = this.$refs.myecharts
    chart.mergeOptions(this.option, true)
  },
  methods: {
    /*convertData(data) {
      let res = [];
      for (let i = 0; i < data.length; i++) {
        let geoloc = this.geoMap[data[i].name];
        if (geoloc) {
          res.push({
            name: data[i].name,
            value: geoloc.concat(data[i].value)
          });
        }
      }
      return res;
    }*/
  }
};

</script>

<style scoped>
.title {
  position: absolute;
  z-index: 1;
  height: 34px;
  line-height: 34px;
  font-size: 16px;
  font-weight: 500;
  color: #323233;
  padding-left: 14px;
  border-left: 3px solid rgb(25, 137, 250);
  box-sizing: border-box;
}
</style>
