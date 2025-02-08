import * as t from 'io-ts';
import * as types from 'io-ts-types';

export const moodsCodec = t.type(
  {
    nature: t.number,
    relax: t.number,
    history: t.number,
    culture: t.number,
    party: t.number,
  },
  'moods'
);

export const tourGetAvailableReponseCodec = t.type(
  {
    id: t.string,
    slug: t.string,
    name: t.string,
    description: t.string,
    startingDate: types.DateFromISOString,
    endingDate: types.DateFromISOString,
    price: t.number,
    totalSeats: t.number,
    moods: moodsCodec,
    availableSeats: t.number,
  },
  'tourGetAvailableReponse'
);

export type TourGetAvailableResponse = t.TypeOf<
  typeof tourGetAvailableReponseCodec
>;
