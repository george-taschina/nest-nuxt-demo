import { CreateReservationDto } from './../../src/documentation/create-reservation';
import { Reservation } from '@nest-nuxt-demo-backend/tour/models/reservation.entity';
import { unsafeForceBrandToType } from '@nest-nuxt-demo/shared/types/brand';
import moment from 'moment';

export const createFixtureReservation = () =>
  unsafeForceBrandToType<Reservation>({
    id: 'df9626aa-25af-4454-b329-c0623fb31ad5',
    tour: {},
    user: {},
    seatsReserved: 1,
    expiresAt: moment().add(900, 'seconds').toDate(),
    createdAt: new Date(),
  }) satisfies Reservation;

export const createFixtureControllerRequestCreateReservation = () =>
  unsafeForceBrandToType<CreateReservationDto>({
    email: 'george@email.com',
    numberOfSeats: 5,
    tourId: 'validId',
  }) satisfies CreateReservationDto;
