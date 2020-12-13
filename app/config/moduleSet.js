let _sets = {
  home: [],
  camera: [],
  environmentDetail: []
}

class moduleSet {

  get sets() {				// 读属性
    return _sets
  }

  set sets(val) {
    _sets = val		// 写属性
  }
}

module.exports = moduleSet
