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
    <!--
      ref="myechart"定义该div也就是画布的名字，在this.$echarts.init(this.$refs.myechart) 图表初始化的时候使用
      this.$refs.myechart 也可以替换为 document.getElementById('main') 或者 document.getElementByClassName('echart-box')
      -->
    <template class="center">
      <div class="Map1 echart-box" ref="myechart1" id="main1"></div>
    </template>

    <template class="center">
      <div class="Map2 echart-box" ref="myechart2" id="main2"></div>
    </template>
  </div>

</template>

<script>
import NavBar from '../../layout/NavBar.vue'

var noise = getNoiseHelper();
noise.seed(Math.random());
function generateData() {
  var data = [];
  for (var i = -100; i <= 100; i++) {
    for (var j = -100; j <= 100; j++) {
      data.push([i, j, noise.perlin2(i / 40, j / 20)+0.5]);
    }
  }
  return data;
}
var data = generateData();

export default {
  name: "Map",
  components: { NavBar },
  data(){
    return{
      // 定义图表，各种参数
      option1 : {
        title: {
          text: '1号设备海上定位'
        },
        radiusAxis:{
          max: 1,
          min: 0
        },
        polar: {
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            axis: 'radius'
          }
        },
        angleAxis: {
          type: 'value',
          max:360
        },
        series: [{
          coordinateSystem: 'polar',
          name: '偏移度',
          type: 'scatter',
          data: [[0.314,45]]
        }]
      },
      option2 : {
        tooltip: {},
        xAxis: {
          type: 'value',
          max: 100,
          min: -100
        },
        yAxis: {
          type: 'value',
          max: 100,
          min: -100
        },
        visualMap: {
          min: 0,
          max: 1,
          calculable: true,
          realtime: false,
          inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          }
        },
        series: [{
          name: 'Gaussian',
          type: 'heatmap',
          data: data,
          emphasis: {
            itemStyle: {
              borderColor: '#000',
              borderWidth: 1
            }
          },
          progressive: 1000,
          animation: false
        }]
      }
    }
  },
  mounted:function(){
    console.log(this.$echarts)
    let myechart1 = this.$echarts.init(this.$refs.myechart1) //初始化一个echarts
    myechart1.setOption(this.option1)  //setOption 用this.option中的数据开始作图
    let myechart2 = this.$echarts.init(this.$refs.myechart2)
    myechart2.setOption(this.option2)
  }
}

function getNoiseHelper(global) {

  var module = {};

  function Grad(x, y, z) {
    this.x = x; this.y = y; this.z = z;
  }

  Grad.prototype.dot2 = function(x, y) {
    return this.x*x + this.y*y;
  };

  Grad.prototype.dot3 = function(x, y, z) {
    return this.x*x + this.y*y + this.z*z;
  };

  var grad3 = [new Grad(1,1,0),new Grad(-1,1,0),new Grad(1,-1,0),new Grad(-1,-1,0),
    new Grad(1,0,1),new Grad(-1,0,1),new Grad(1,0,-1),new Grad(-1,0,-1),
    new Grad(0,1,1),new Grad(0,-1,1),new Grad(0,1,-1),new Grad(0,-1,-1)];

  var p = [151,160,137,91,90,15,
    131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
    190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
    88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
    77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
    102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
    135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
    5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
    223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
    129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
    251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
    49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
    138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
  // To remove the need for index wrapping, double the permutation table length
  var perm = new Array(512);
  var gradP = new Array(512);

  // This isn't a very good seeding function, but it works ok. It supports 2^16
  // different seed values. Write something better if you need more seeds.
  module.seed = function(seed) {
    if(seed > 0 && seed < 1) {
      // Scale the seed out
      seed *= 65536;
    }

    seed = Math.floor(seed);
    if(seed < 256) {
      seed |= seed << 8;
    }

    for(var i = 0; i < 256; i++) {
      var v;
      if (i & 1) {
        v = p[i] ^ (seed & 255);
      } else {
        v = p[i] ^ ((seed>>8) & 255);
      }

      perm[i] = perm[i + 256] = v;
      gradP[i] = gradP[i + 256] = grad3[v % 12];
    }
  };

  module.seed(0);

  // ##### Perlin noise stuff
  function fade(t) {
    return t*t*t*(t*(t*6-15)+10);
  }

  function lerp(a, b, t) {
    return (1-t)*a + t*b;
  }

  // 2D Perlin Noise
  module.perlin2 = function(x, y) {
    // Find unit grid cell containing point
    var X = Math.floor(x), Y = Math.floor(y);
    // Get relative xy coordinates of point within that cell
    x = x - X; y = y - Y;
    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X = X & 255; Y = Y & 255;

    // Calculate noise contributions from each of the four corners
    var n00 = gradP[X+perm[Y]].dot2(x, y);
    var n01 = gradP[X+perm[Y+1]].dot2(x, y-1);
    var n10 = gradP[X+1+perm[Y]].dot2(x-1, y);
    var n11 = gradP[X+1+perm[Y+1]].dot2(x-1, y-1);

    // Compute the fade curve value for x
    var u = fade(x);

    // Interpolate the four results
    return lerp(
      lerp(n00, n10, u),
      lerp(n01, n11, u),
      fade(y));
  };
  return module;
}

</script>
<style scoped>
.center{
  text-align:center;
}
.Map1{
  width: 600px;
  height:400px;
  background: #cce6f0;
  margin:0 auto;
}
.Map2{
  width: 800px;
  height:700px;
  margin: 0 auto;
}
</style>
