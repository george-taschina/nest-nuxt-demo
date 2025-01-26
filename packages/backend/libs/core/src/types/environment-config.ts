import * as t from 'io-ts';

export const environmentConfigCodec = t.type(
  {
    releaseName: t.string,
    requestLoggerEnabled: t.union([t.literal('enable'), t.literal('disable')]),
  },
  'EnvironmentConfig'
);

export type EnvironmentConfig = t.TypeOf<typeof environmentConfigCodec>;
