import * as t from 'io-ts';

export const httpErrorCodec = t.type(
  {
    message: t.array(t.string),
    error: t.string,
    statusCode: t.number,
  },
  'httpError'
);

export type HttpError = t.TypeOf<typeof httpErrorCodec>;
