import { Booking } from '@has-george-read-backend/tour/models/booking.entity';
import { unsafeForceBrandToType } from '@has-george-read/shared/types/brand';

export const createFixtureBooking = () =>
  unsafeForceBrandToType<Booking>({
    id: '361b131d-9de9-4148-953a-ca68234fc991',
    tour: {},
    user: {},
    seatsBooked: 1,
    bookingDate: new Date(),
    totalPrice: 10,
    paymentStatus: 'completed',
  }) satisfies Booking;
