const socketAddress = 'http://111.229.176.208:3306'
const apiAddress = 'http://111.229.176.208:3306/api'
const isDev = process.env.NODE_ENV === 'development'

const api = {
  'getEquipments': isDev ? '/api/getEquipments' : `${apiAddress}/getEquipments`,
  'getEquipmentById': isDev ? '/api/getEquipmentById' : `${apiAddress}/getEquipmentById`,
  'getInspects': isDev ? '/api/getInspects' : `${apiAddress}/getInspects`,
  'addInspects': isDev ? '/api/addInspect' : `${apiAddress}/addInspect`
}

module.exports = {
  socketAddress: socketAddress,
  apiAddress: apiAddress,
  api: api
}
