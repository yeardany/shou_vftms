class LocationCompute {
  constructor(x0, y0, x, y, R) {
    //  30.33 < x < 30.99  121.87 < y < 122.53   距离大约在50km之内
    this.x0 = x0
    this.y0 = y0
    this.x = x
    this.y = y;
    this.R = R; //地球半径 单位km
  }

  set rad(r) {
    this.radVal = r * 3.1415926 / 180.0;
  }

  get rad() {
    return this.radVal
  }

  set r_rad(rr) {
    this.r_radVal = rr * 180.0 / 3.1415926;
  }

  get r_rad() {
    return this.r_radVal
  }

  getDistance(a, b, c, d) {
    let x0, y0, x, y, lng
    this.rad = a
    x0 = this.rad
    this.rad = b
    y0 = this.rad
    this.rad = c
    x = this.rad
    this.rad = d
    y = this.rad
    lng = y - y0;
    return this.R * Math.acos(Math.cos(x) * Math.cos(x0) * Math.cos(lng) + Math.sin(x0) * Math.sin(x));
  }

  getAngles(angle) {
    if (this.x < this.x0 && this.y > this.y0) {
      return (parseFloat(angle) + 90).toFixed(2)
    } else if (this.x < this.x0 && this.y < this.y0) {
      return (parseFloat(angle) + 180).toFixed(2)
    } else if (this.x > this.x0 && this.y < this.y0) {
      return (parseFloat(angle) + 270).toFixed(2)
    }
  }
}

module.exports = LocationCompute
