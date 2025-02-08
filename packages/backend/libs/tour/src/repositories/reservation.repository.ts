import { EntityRepository } from '@mikro-orm/mysql';
import { Reservation } from '@has-george-read-backend/tour/models/reservation.entity';

export class ReservationRepository extends EntityRepository<Reservation> {}
