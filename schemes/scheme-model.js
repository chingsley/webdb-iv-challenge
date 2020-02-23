const knex = require('knex');

const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

const find = () => db('schemes');
const findById = id => db('schemes').where({ id }).first();
const findSteps = id => db('schemes')
  .join('steps', 'schemes.id', '=', 'steps.scheme_id')
  .select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
  .where({ 'schemes.id': id })
  .orderBy('steps.step_number', 'asc');
findStepById = id => db('steps').where({ id }).first();
const add = scheme => db('schemes').insert(scheme, 'id');
const addStep = (stepData, schemeId) => db('steps').insert({ ...stepData, scheme_id: schemeId }, 'id');
const update = (changes, id) => db('schemes').where({ id }).update(changes);
const updateStep = (changes, id) => db('steps').where({ id }).update(changes);
const remove = id => db('schemes').where({ id }).del();
const removeStep = id => db('steps').where({ id }).del();

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
  update,
  findStepById,
  updateStep,
  remove,
  removeStep
};
