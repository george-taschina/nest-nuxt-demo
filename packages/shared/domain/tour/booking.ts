import * as t from 'io-ts';
import * as types from 'io-ts-types';

export const bookingResponseCodec = t.type(
  {
    id: t.string,
    userId: t.string,
    tourId: t.string,
    seatsBooked: t.number,
    bookingDate: types.DateFromISOString,
    totalPrice: t.number,
    paymentStatus: t.string,
  },
  'bookingResponse'
);

export const bookingListCodec = t.array(bookingResponseCodec);

export type BookingResponse = t.TypeOf<typeof bookingResponseCodec>;
