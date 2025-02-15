import * as t from 'io-ts';
import * as types from 'io-ts-types';

export const appConfigCodec = t.type({
  cors: t.union([
    t.type({
      type: t.literal('open'),
    }),
    t.type({
      type: t.literal('close'),
      whitelist: types.readonlyNonEmptyArray(t.string),
    }),
  ]),
});

export type AppConfig = t.TypeOf<typeof appConfigCodec>;
