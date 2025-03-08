import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Products} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Products,
  pattern: 'CrudRest',
  dataSource: 'DB_rest_crud',
  basePath: '/products',
  readonly: false,
};
module.exports = config;
