import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {User} from '../models';

const config: ModelCrudRestApiConfig = {
  model: User,
  pattern: 'CrudRest',
  dataSource: 'DB_rest_crud',
  basePath: '/users',
  readonly: false,
};
module.exports = config;
