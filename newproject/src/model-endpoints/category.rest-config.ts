import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Category} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Category,
  pattern: 'CrudRest',
  dataSource: 'DB_rest_crud',
  basePath: '/categories',
  readonly: false,
};
module.exports = config;
