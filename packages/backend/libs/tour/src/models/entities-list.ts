import { EntityClass } from '@mikro-orm/core';
import { Tour } from './tour.entity';
import { Reservation } from './reservation.entity';
import { User } from './user.entity';
import { Booking } from './booking.entity';

export const ENTITIES_LIST: EntityClass<any>[] = [
  Tour,
  Reservation,
  User,
  Booking,
];
