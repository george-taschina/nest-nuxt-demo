import * as t from 'io-ts';

export const environmentCodec = t.keyof(
  {
    development: null,
    production: null,
    staging: null,
    test: null,
    e2e: null,
  },
  'environment'
);

export type Environment = t.TypeOf<typeof environmentCodec>;
