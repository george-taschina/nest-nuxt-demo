import * as t from 'io-ts';
import * as types from 'io-ts-types';

export const reservationCodec = t.type(
  {
    id: t.string,
    tour: t.string,
    user: t.string,
    seatsReserved: t.string,
    expiresAt: types.DateFromISOString,
    createdAt: types.DateFromISOString,
  },
  'reservation'
);

export const reservationListCodec = t.array(reservationCodec);

export type Reservation = t.TypeOf<typeof reservationCodec>;
