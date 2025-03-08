import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbRestCrudDataSource} from '../datasources';
import {User, UserRelations} from '../models';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(
    @inject('datasources.DB_rest_crud') dataSource: DbRestCrudDataSource,
  ) {
    super(User, dataSource);
  }
}
