import { Tour } from '@has-george-read-backend/tour/models/tour.entity';

export const createFixtureTour = () =>
  ({
    id: '4f4bd032-e7d4-402a-bdf6-aaf6be240d53',
    slug: 'iceland-hunting-northern-lights',
    name: 'Iceland: hunting for the Northern Lights',
    description:
      "Why visit Iceland in winter? Because it is between October and March that this land offers the spectacle of the Northern Lights, one of the most incredible and magical natural phenomena in the world, visible only near the earth's two magnetic poles. Come with us on WeRoad to explore this land of ice and fire, full of contrasts and natural variety, where the energy of waterfalls and geysers meets the peace of the fjords... And when the ribbons of light of the aurora borealis twinkle in the sky before our enchanted eyes, we will know that we have found what we were looking for.",
    startingDate: new Date('2021-11-01'),
    endingDate: new Date('2021-11-08'),
    price: 199900,
    moods: {
      nature: 100,
      relax: 30,
      history: 10,
      culture: 20,
      party: 10,
    },
  }) satisfies Tour;
