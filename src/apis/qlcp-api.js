const axios = require('axios')

const instance = axios.create({
  baseURL: 'http://lb-aws-1105894158.sa-east-1.elb.amazonaws.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export async function getProfessions (uf = 'AC', city = 'Afonso Cláudio') {
  const params = { 'api-key': 'ddd70c32-fc98-4618-b494-a9698f824353' }
  return instance.get(`/profissao/${uf}/${city}`, { params })
}

export async function getProfessionsByEntity (profession='Administrador', uf = 'AC', city = 'Afonso Cláudio') {
  const params = { 'api-key': '4b94dba2-5524-4632-939b-92df1c50a645' }
  return instance.get(`/entidade/${profession}/${uf}/${city}`, { params })
}

export async function listHealthPlans  (data) {
  const params = { 'api-key': '261fd4d0-fd9f-468a-afa9-f5a89ed3701c' }
  return instance.post('/plano', data, { params })
}