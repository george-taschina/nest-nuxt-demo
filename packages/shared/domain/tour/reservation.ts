import * as t from 'io-ts';
import * as types from 'io-ts-types';

export const reservationResponseCodec = t.type(
  {
    id: t.string,
    seatsReserved: t.number,
    userId: t.string,
    tourId: t.string,
    expiresAt: types.DateFromISOString,
    createdAt: types.DateFromISOString,
  },
  'reservationResponse'
);

export const reservationListCodec = t.array(reservationResponseCodec);

export type ReservationResponse = t.TypeOf<typeof reservationResponseCodec>;
