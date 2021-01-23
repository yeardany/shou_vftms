const socketAddress = 'http://111.229.176.208:3306'
const apiAddress = 'http://111.229.176.208:3306/api'
const isDev = process.env.NODE_ENV === 'development'

const api = {
  'login': isDev ? '/api/login' : `${apiAddress}/login`,
  'getModuleSet': isDev ? '/api/getModuleSet' : `${apiAddress}/getModuleSet`,
  'getEquipments': isDev ? '/api/getEquipments' : `${apiAddress}/getEquipments`,
  'getEquipmentById': isDev ? '/api/getEquipmentById' : `${apiAddress}/getEquipmentById`,
  'getInspects': isDev ? '/api/getInspects' : `${apiAddress}/getInspects`,
  'addInspects': isDev ? '/api/addInspect' : `${apiAddress}/addInspect`
}

const weatherId = {
  "zzd": "101070201", // 大连獐子岛
  "sgw": "101121301" // 威海桑沟湾
}

module.exports = {
  socketAddress: socketAddress,
  apiAddress: apiAddress,
  api: api,
  weatherId: weatherId
}
