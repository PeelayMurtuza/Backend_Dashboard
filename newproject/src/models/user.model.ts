import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mysql: {schema: 'pizzaselling', table: 'user'}}})
export class User extends Entity {
  @property({
    type: 'string',
    required: true,
    jsonSchema: {nullable: false},
    length: 36,
    generated: false,
    id: 1,
    mysql: {columnName: 'id', dataType: 'char', dataLength: 36, dataPrecision: null, dataScale: null, nullable: 'N', generated: false},
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {nullable: false},
    length: 255,
    generated: false,
    index: {unique: true},
    mysql: {columnName: 'email', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N', generated: false},
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {nullable: false},
    length: 255,
    generated: false,
    mysql: {columnName: 'password', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N', generated: false},
  })
  password: string;

  @property({
    type: String,
    required: true,
    jsonSchema: {enum: ['ADMIN','USER',]},
    length: 5,
    generated: false,
    mysql: {columnName: 'role', dataType: 'enum', dataLength: 5, dataPrecision: null, dataScale: null, nullable: 'N', generated: false},
  })
  role: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
