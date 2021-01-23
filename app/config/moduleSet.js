let _sets = {
    home: [],
    camera: [],
    environmentDetail: []
  },
  _areaID = '',
  _uRole = '',
  _uName = ''

class moduleSet {

  get sets() {
    if (_sets.home.length === 0) {
      return JSON.parse(localStorage.getItem('set'))
    } else {
      return _sets
    }
  }

  set sets(val) {
    localStorage.setItem('set', JSON.stringify(val))
    _sets = val
  }

  get areaID() {
    if (_areaID === '' || _areaID === undefined) {
      return localStorage.getItem('areaID')
    } else
      return _areaID
  }

  set areaID(val) {
    localStorage.setItem('areaID', val)
    _areaID = val
  }

  get uRole() {
    if (_uRole === '' || _uRole === undefined) {
      return localStorage.getItem('uRole')
    } else
      return _uRole
  }

  set uRole(val) {
    localStorage.setItem('uRole', val)
    _uRole = val
  }

  get uName() {
    if (_uName === '' || _uName === undefined) {
      return localStorage.getItem('uName')
    } else {
      return _uName
    }
  }

  set uName(val) {
    localStorage.setItem('uName', val)
    _uName = val
  }

  get homePath() {
    return localStorage.getItem('homePath')
  }

  set homePath(val) {
    localStorage.setItem('homePath', val)
  }
}

module.exports = moduleSet
