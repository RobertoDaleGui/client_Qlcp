const qlcpApi = require('../apis/qlcp-api')
const cities = require('../dictionary/cities.json')
const ufs = require('../dictionary/uf.json')

export function listProfessions (uf, city) {
  uf = ufs.find(item => item.ID == uf)?.Sigla
  city = cities.find(item => item.ID == city)?.Nome
  return qlcpApi.getProfessions(uf, city)
    .then(res => res.data)
}

export function listProfessionsByEntity (profession, uf, city) {
  uf = ufs.find(item => item.ID == uf)?.Sigla
  city = cities.find(item => item.ID == city)?.Nome
  return qlcpApi.getProfessionsByEntity(profession, uf, city)
    .then(res => res.data)
}

export function listHealthPlans (uf, city, birth, entity) {
  uf = ufs.find(item => item.ID == uf)?.Sigla
  city = cities.find(item => item.ID == city)?.Nome
  const payload = {
    entidade: entity,
    uf,
    cidade: city,
    datanascimento: [birth]
  }
  return qlcpApi.listHealthPlans(payload)
    .then(res => res.data)
}
