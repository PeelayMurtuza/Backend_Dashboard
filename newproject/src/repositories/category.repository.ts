import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository} from '@loopback/repository';
import {DbRestCrudDataSource} from '../datasources';
import {Category, CategoryRelations} from '../models';

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.categoryId,
  CategoryRelations
> {
  public readonly parent: BelongsToAccessor<
    Category,
    typeof Category.prototype.categoryId
  >;

  constructor(
    @inject('datasources.DB_rest_crud') dataSource: DbRestCrudDataSource,
  ) {
    super(Category, dataSource);
    this.parent = this.createBelongsToAccessorFor(
      'parent',
      Getter.fromValue(this),
    );
  }
}
