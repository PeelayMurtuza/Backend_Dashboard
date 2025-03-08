import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Categories} from '.';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'pizzaselling', table: 'products'},
    foreignKeys: {
      productsIbfk_1Rel: {
        name: 'productsIbfk_1Rel',
        entity: 'Categories',
        entityKey: 'categoryId',
        foreignKey: 'categoryId'
      }
    }
  }
})
export class Products extends Entity {
  @property({
    type: 'string',
    required: false,
    jsonSchema: {nullable: false},
    length: 36,
    generated: false,
    id: 1,
    mysql: {columnName: 'product_id', dataType: 'char', dataLength: 36, dataPrecision: null, dataScale: null, nullable: 'N', generated: false},
  })
  productId: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {nullable: false},
    length: 255,
    generated: false,
    mysql: {columnName: 'name', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N', generated: false},
  })
  name: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 65535,
    generated: false,
    mysql: {columnName: 'description', dataType: 'text', dataLength: 65535, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  description?: string;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {nullable: false},
    precision: 10,
    scale: 2,
    generated: false,
    mysql: {columnName: 'price', dataType: 'decimal', dataLength: null, dataPrecision: 10, dataScale: 2, nullable: 'N', generated: false},
  })
  price: number;
@belongsTo(() => Categories, {keyFrom: 'categoryId', keyTo: 'category_id'})
categoryId: string;


  @property({
    type: 'date',
    jsonSchema: {nullable: true},
    generated: false,
    mysql: {columnName: 'created_at', dataType: 'timestamp', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  createdAt?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Products>) {
    super(data);
  }
}

export interface ProductsRelations {
  // describe navigational properties here
}

export type ProductsWithRelations = Products & ProductsRelations;
