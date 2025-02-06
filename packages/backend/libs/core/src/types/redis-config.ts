import * as t from 'io-ts';
import * as types from 'io-ts-types';

export const redisConfigCodec = t.type(
  {
    host: t.string,
    port: types.IntFromString,
  },
  'redisConfig'
);

export type RedisConfig = t.TypeOf<typeof redisConfigCodec>;
