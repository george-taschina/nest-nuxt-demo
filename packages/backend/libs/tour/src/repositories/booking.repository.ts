import { EntityRepository } from '@mikro-orm/mysql';
import { Booking } from '@has-george-read-backend/tour/models/booking.entity';

export class BookingRepository extends EntityRepository<Booking> {}
