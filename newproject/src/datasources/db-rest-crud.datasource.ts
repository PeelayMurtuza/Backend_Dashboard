import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'DB_rest_crud',
  connector: 'mysql',
  url: '',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Murtuza@12309',
  database: 'pizzaselling'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbRestCrudDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'DB_rest_crud';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.DB_rest_crud', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
