import * as t from 'io-ts';
import * as types from 'io-ts-types';

export const databaseConfigCodec = t.type(
  {
    type: t.literal('mysql'),
    host: t.string,
    port: types.IntFromString,
    username: t.string,
    password: t.string,
    name: t.string,
    debug: t.string,
  },
  'databaseConfig'
);

export type DatabaseConfig = t.TypeOf<typeof databaseConfigCodec>;
