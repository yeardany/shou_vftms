let
  _final_data = [],
  _xy_data = [],
  _time = [],
  _date = '16:40',
  _loc = [],
  _data = [],
  _dist_j = [],
  _dist_w = [];

class heatMap {

  constructor(init, data_loc) {
    this.init = init
    this.data_loc = data_loc
  }

  get final_data() {
    return _final_data
  }

  set final_data(v) {
    _final_data = v
  }

  get xy_data() {
    return _xy_data
  }

  set xy_data(v) {
    _xy_data = v
  }

  get time() {
    return _time
  }

  set time(v) {
    _time = v
  }

  get data() {
    return _data
  }

  set data(v) {
    _data = v
  }

  get date() {
    return _date
  }

  set date(v) {
    _date = v
  }

  get loc() {
    return _loc
  }

  set loc(v) {
    _loc = v
  }

  get dist_j() {
    return _dist_j
  }

  set dist_j(v) {
    _dist_j = v
  }

  get dist_w() {
    return _dist_w
  }

  set dist_w(v) {
    _dist_w = v
  }

  getHeatMapData() {

    let init = this.init,
      data_loc = this.data_loc

    for (let i = -50; i <= 50; i++) {
      this.data[i] = [];
      for (let j = -50; j <= 50; j++)
        this.data[i][j] = 0;
    }

    for (let i = 0; i < data_loc.length; i++) {
      let x = data_loc[i][1].toFixed(3);
      let y = data_loc[i][0].toFixed(3);
      let m_x = init.getDistance(init.x0, init.y0, init.x0, x);
      let m_y = init.getDistance(init.x0, init.y0, y, init.y0);
      //存经度，纬度方向偏移距离，用于op4，op5
      this.dist_j.push(m_x.toFixed(3))
      this.dist_w.push(m_y.toFixed(3))
      //定位方向
      if (x > init.y0 && y < init.x0) {
        m_y = -m_y;
      } else if (x < init.y0 && y < init.x0) {
        m_x = -m_x;
        m_y = -m_y;
      } else if (x < init.y0 && y > init.x0) {
        m_x = -m_x;
      }
      //取折线图数据
      if (i % 5 === 0) {
        let xy_loc = y + '°N,' + x + '°E';
        this.xy_data.push([m_x.toFixed(3), m_y.toFixed(3)]);
        this.loc.push([m_x.toFixed(3), xy_loc]);
        this.time.push([m_x.toFixed(3), this.date]);
      }
      //取整
      m_x = Math.floor(m_x);
      m_y = Math.floor(m_y);
      this.data[m_x][m_y] += 1;
    }
    //求二维数组最大值
    let max = 0;
    for (let i = -50; i < 50; i++)
      for (let j = -50; j < 50; j++) {
        if (this.data[i][j] > max)
          max = this.data[i][j];
      }

    //数组归一化
    for (let i = -50; i < 50; i++) {
      for (let j = -50; j < 50; j++)
        this.final_data.push([i, j, this.data[i][j] / max]);
    }
    /*    for (let i = 0; i < 10000; i++){
            if (final_data[i][2] != 0)
              console.log('非零坐标'+'('+final_data[i][0]+','+final_data[i][1]+') 的值是'+final_data[i][2])
    }*/
  }

  reset() {
    this.final_data = []
    this.xy_data = []
    this.time = []
    this.loc = []
    this.data = []
    this.dist_j = []
    this.dist_w = []
  }
}

module.exports = heatMap


