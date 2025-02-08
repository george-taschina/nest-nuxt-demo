import { Reservation } from '@has-george-read-backend/tour/models/reservation.entity';
import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

export class ReservationSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const now = new Date();
    const futureDate = new Date();
    futureDate.setFullYear(now.getFullYear() + 100);

    const reservations: (Omit<Reservation, 'tour' | 'user'> & {
      tour: string;
      user: string;
    })[] = [
      {
        id: '3278e3e2-b88e-46d0-9528-4ea676a933c0',
        tour: 'd408be33-aa6a-4c73-a2c8-58a70ab2ba4d',
        user: '48764818-40d4-465b-a1ae-6f6eec9c6744',
        seatsReserved: 2,
        expiresAt: futureDate,
        createdAt: now,
      },
      {
        id: '00f29bf4-01c1-44cf-b183-806547cf8d2d',
        tour: '4f4bd032-e7d4-402a-bdf6-aaf6be240d53',
        user: '7224926a-9981-46bf-85b4-5411c6d8afd2',
        seatsReserved: 3,
        expiresAt: futureDate,
        createdAt: now,
      },
    ];

    for (const reservation of reservations) {
      em.persist(em.create(Reservation, reservation));
    }

    await em.flush();
  }
}
