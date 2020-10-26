let heatMap = {

  getHeatMapData: (init, data_loc) => {
    let
      xy_data = [],
      time = [],
      date = '16:40',
      loc = [],
      data = [];

    for (let i = -50; i <= 50; i++) {
      data[i] = [];
      for (let j = -50; j <= 50; j++)
        data[i][j] = 0;
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
        xy_data.push([m_x.toFixed(2), m_y.toFixed(2)]);
        loc.push([m_x.toFixed(2), xy_loc]);
        time.push([m_x.toFixed(2), date]);
      }
      //取整
      m_x = Math.floor(m_x);
      m_y = Math.floor(m_y);
      data[m_x][m_y] += 1;
    }
    //求二维数组最大值
    let max = 0;
    for (let i = -50; i < 50; i++)
      for (let j = -50; j < 50; j++) {
        if (data[i][j] > max)
          max = data[i][j];
      }

    let final_data = [];
    //数组归一化
    for (let i = -50; i < 50; i++) {
      for (let j = -50; j < 50; j++)
        final_data.push([i, j, data[i][j] / max]);
    }

    /*    for (let i = 0; i < 10000; i++){
            if (final_data[i][2] != 0)
              console.log('非零坐标'+'('+final_data[i][0]+','+final_data[i][1]+') 的值是'+final_data[i][2])
    }*/
    return {
      "final_data": final_data,
      "xy_data": xy_data,
      "time": time,
      "loc": loc
    };
  }
}

module.exports = heatMap
