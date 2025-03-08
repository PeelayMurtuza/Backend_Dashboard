import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Categories} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Categories,
  pattern: 'CrudRest',
  dataSource: 'DB_rest_crud',
  basePath: '/categories',
  readonly: false,
};
module.exports = config;
