import { User } from '@nest-nuxt-demo-backend/tour/models/user.entity';
import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const users: User[] = [
      {
        id: '48764818-40d4-465b-a1ae-6f6eec9c6744',
        email: 'g.taschina@georgetaschina.com',
      },
      {
        id: '7224926a-9981-46bf-85b4-5411c6d8afd2',
        email: 'r.taschina@ralucataschina.com',
      },
    ];

    for (const user of users) {
      em.persist(em.create(User, user));
    }

    await em.flush();
  }
}
