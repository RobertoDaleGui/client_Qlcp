import React, { useState, useEffect } from 'react';
import { listProfessions, listProfessionsByEntity, listHealthPlans } from '../services/qlcp-service'
import ufs from '../dictionary/uf.json'
import _cities from '../dictionary/cities.json'
import { Field, Form, Formik } from 'formik';
import './professions.css'


function Professions() {
  const _default = { profissao: 'Carregando profissões.' }
  const [professions, setProfessions] = useState([_default]);
  const [cities, setCities] = useState(_cities);
  const [entities, setEntities] = useState(_cities);
  const [cidade, setCity] = useState('1');
  const [estado, setUF] = useState('1');
  const [profissao, setProfession] = useState('Advogado');
  const [entidade, setEntitiy] = useState('ABRABDIR');
  const [nascimento, setDateOfBirth] = useState('1992-03-10');
  const [convenios, setPlans] = useState([]);

  async function filter() {
    listProfessions()
      .then(res => {
        setProfessions(res)
        listProfessionsByEntity(profissao, estado, cidade)
          .then(res => {
            setEntities(res)
            listHealthPlans(estado, cidade, nascimento, entidade)
              .then(res => setPlans(res.planos))
          })
      })
  }

  useEffect(() => { filter() }, []);

  function handleSubmit (event) {
    console.log(event);
    console.log(cidade, estado, nascimento, profissao, entidade, convenios)
  }

  const handleChange = event => {
    const { name, value } = event.target
    if(name === 'ufs'){
      const filteredCities = _cities.filter(city => city.Estado == value)
      setCities(filteredCities)
      setUF(value)
    }
    if(name === 'cities') setCity(value)
    if(name === 'professions') setProfession(value)
    if(name === 'entities') setEntitiy(value)
    if(name === 'birth') setDateOfBirth(value)
    filter()
  }

  return (
    <div>
      <Formik 
      initialValues={{ ufs: '1', cities: '1', professions: 'Advogado', entities:'ABRABDIR', birth: '1992-03-10' }}
      onSubmit={handleSubmit}>
        <Form  onChange={handleChange}>
          <Field as='select' name='ufs'>
            {ufs.map(uf => (<option value={uf.ID}>{uf.Sigla}</option>))}
          </Field>
          <Field as='select'  name='cities'>
            {cities.map(city => (<option value={city.ID}>{city.Nome}</option>))}
          </Field>
          <Field as='select'  name='professions'>
            {professions.map(profession => (<option value={profession.profissao}>{profession.profissao}</option>))}
          </Field>
          <Field as='select'  name='entities'>
            {entities.map(entity => (<option value={entity.NomeFantasia}>{entity.NomeFantasia}</option>))}
          </Field>
          <Field as='input' type='date' name='birth'></Field>
          <button type='submit'>Buscar</button>
        </Form>
      </Formik>
      <table>
        <thead>
          <th>Produto Fatura</th>
          <th>Operadora</th>
          <th>Plano</th>
          <th>Nível</th>
          <th>Abrangência</th>
        </thead>
        <tbody>
          {convenios.map(plan => (<tr><td>{plan.idProdutoFatura}</td><td>{plan.operadora}</td><td>{plan.plano}</td><td>{plan.nivel}</td><td>{plan.abrangencia}</td></tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default Professions