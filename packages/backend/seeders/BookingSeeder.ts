import { Booking } from '@nest-nuxt-demo-backend/tour/models/booking.entity';
import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

export class BookingSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const now = new Date();
    const futureDate = new Date();
    futureDate.setFullYear(now.getFullYear() + 100);

    const bookings: (Omit<Booking, 'tour' | 'user'> & {
      tour: string;
      user: string;
    })[] = [
      {
        id: '4ca6be71-2152-4b1a-b5ef-5799d5368b56',
        tour: 'd408be33-aa6a-4c73-a2c8-58a70ab2ba4d',
        user: '48764818-40d4-465b-a1ae-6f6eec9c6744',
        seatsBooked: 1,
        bookingDate: now,
        totalPrice: 10,
        paymentStatus: 'completed',
      },
      {
        id: '361b131d-9de9-4148-953a-ca68234fc991',
        tour: '4f4bd032-e7d4-402a-bdf6-aaf6be240d53',
        user: '7224926a-9981-46bf-85b4-5411c6d8afd2',
        seatsBooked: 1,
        bookingDate: now,
        totalPrice: 10,
        paymentStatus: 'failed',
      },
    ];

    for (const booking of bookings) {
      em.persist(em.create(Booking, booking));
    }

    await em.flush();
  }
}
