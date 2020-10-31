const apiAddress = 'http://111.229.176.208:3306/api'
const isDev = process.env.NODE_ENV === 'development'

const api = {
  'getEquipments': isDev ? '/api/getEquipments' : `${apiAddress}/getEquipments`
}

module.exports = {
  apiAddress: apiAddress,
  api: api
}
