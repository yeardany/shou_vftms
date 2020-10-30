class heatMap {

  constructor(init, data_loc) {
    this.init = init
    this.data_loc = data_loc

    this.final_data = []
    this.xy_data = []
    this.time = []
    this.date = '16:40'
    this.loc = []
    this.data = []
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
      let x = data_loc[i][1].toFixed(2);
      let y = data_loc[i][0].toFixed(2);
      let m_x = init.getDistance(init.x0, init.y0, init.x0, x);
      let m_y = init.getDistance(init.x0, init.y0, y, init.y0);
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
        this.xy_data.push([m_x.toFixed(2), m_y.toFixed(2)]);
        this.loc.push([m_x.toFixed(2), xy_loc]);
        this.time.push([m_x.toFixed(2), this.date]);
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
    return {
      "final_data": this.final_data,
      "xy_data": this.xy_data,
      "time": this.time,
      "loc": this.loc
    };
  }
}

module.exports = heatMap


