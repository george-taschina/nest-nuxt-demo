import { Tour } from '@nest-nuxt-demo-backend/tour/models/tour.entity';
import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

export class TourSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const tours: Omit<Tour, 'reservations' | 'bookings'>[] = [
      {
        id: 'd408be33-aa6a-4c73-a2c8-58a70ab2ba4d',
        slug: 'jordan-360',
        name: 'Jordan 360°',
        description:
          'Jordan 360°: the perfect tour to discover the suggestive Wadi Rum desert, the ancient beauty of Petra, and much more.\n\nVisiting Jordan is one of the most fascinating things that everyone has to do once in their life.You are probably wondering "Why?". Well, that\'s easy: because this country keeps several passions! During our tour in Jordan, you can range from well-preserved archaeological masterpieces to trekkings, from natural wonders excursions to ancient historical sites, from camels trek in the desert to some time to relax.\nDo not forget to float in the Dead Sea and enjoy mineral-rich mud baths, it\'s one of the most peculiar attractions. It will be a tour like no other: this beautiful country leaves a memorable impression on everyone.',
        startingDate: new Date('2025-11-01'),
        endingDate: new Date('2025-11-09'),
        price: 199900,
        moods: {
          nature: 80,
          relax: 20,
          history: 90,
          culture: 30,
          party: 10,
        },
        totalSeats: 5,
        version: 1,
        updatedAt: new Date(),
      },
      {
        id: '4f4bd032-e7d4-402a-bdf6-aaf6be240d53',
        slug: 'iceland-hunting-northern-lights',
        name: 'Iceland: hunting for the Northern Lights',
        description:
          "Why visit Iceland in winter? Because it is between October and March that this land offers the spectacle of the Northern Lights, one of the most incredible and magical natural phenomena in the world, visible only near the earth's two magnetic poles. Come with us on WeRoad to explore this land of ice and fire, full of contrasts and natural variety, where the energy of waterfalls and geysers meets the peace of the fjords... And when the ribbons of light of the aurora borealis twinkle in the sky before our enchanted eyes, we will know that we have found what we were looking for.",
        startingDate: new Date('2025-11-01'),
        endingDate: new Date('2025-11-08'),
        price: 199900,
        moods: {
          nature: 100,
          relax: 30,
          history: 10,
          culture: 20,
          party: 10,
        },
        totalSeats: 5,
        version: 1,
        updatedAt: new Date(),
      },
      {
        id: 'cbf304ae-a335-43fa-9e56-811612dcb601',
        slug: 'united-arab-emirates',
        name: 'United Arab Emirates: from Dubai to Abu Dhabi',
        description:
          'At Dubai and Abu Dhabi everything is huge and majestic: here futuristic engineering works and modern infrastructures meet historical districts, local souks (typical bazars), desert and the sea. In this tour we’ll discover Dubai, where we’ll get on top of the highest skyscraper ever built, the Burj Khalifa. We’ll then take a walk at the Dubai Mall, the biggest mall on the planet, and we’ll spend a night in the desert, with the sight of the skyline on the horizon keeping us company. Then, it will be Abu Dhabi’s tourn! Sheik Zayed’s Grand Mosque’s white marble awaits for us to remain stoked in front of its wonderfulness, and the sea will invade us with peacefulness. UAE are all to discover, we’ll just get a taste of it, but we guarantee you’ll get quite the idea!',
        startingDate: new Date('2022-01-03'),
        endingDate: new Date('2022-01-10'),
        price: 149900,
        moods: {
          nature: 30,
          relax: 40,
          history: 20,
          culture: 80,
          party: 70,
        },
        totalSeats: 5,
        version: 1,
        updatedAt: new Date(),
      },
    ];

    for (const tour of tours) {
      em.persist(em.create(Tour, tour));
    }

    await em.flush();
  }
}
