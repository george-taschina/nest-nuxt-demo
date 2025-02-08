import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { TourSeeder } from './TourSeeder';
import { UserSeeder } from './UserSeeder';
import { ReservationSeeder } from './ReservationSeeder';
import { BookingSeeder } from './BookingSeeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const tourSeeder = new TourSeeder();
    const userSeeder = new UserSeeder();
    const reservationSeeder = new ReservationSeeder();
    const bookingSeeder = new BookingSeeder();

    await tourSeeder.run(em);
    await userSeeder.run(em);
    reservationSeeder.run(em);
    bookingSeeder.run(em);
  }
}
