import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Category} from '.';

// @model({
//   settings: {
//     idInjection: false,
//     mysql: {schema: 'pizzaselling', table: 'products'},
//     foreignKeys: {
//       products_ibfk_1Rel: {
//         name: 'products_ibfk_1Rel',
//         entity: 'Category',
//         entityKey: 'categoryId',
//         foreignKey: 'categoryId'
//       }
//     }
//   }
// })
@model()
export class Products extends Entity {
  @property({
    type: 'string',
    required: true,
    jsonSchema: {nullable: false},
    length: 36,
    generated: false,
    id: 1,
    mysql: {columnName: 'productId', dataType: 'char', dataLength: 36, dataPrecision: null, dataScale: null, nullable: 'N', generated: false},
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

  @belongsTo(() => Category)
  categoryId: string;

  @property({
    type: 'date',
    jsonSchema: {nullable: true},
    generated: false,
    mysql: {columnName: 'createdAt', dataType: 'timestamp', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
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
