import {
  Embeddable,
  Embedded,
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { TourRepository } from '../repositories/tour.repository';
import { v4 } from 'uuid';

@Embeddable()
export class TourMoods {
  @Property({ type: 'smallint' })
  nature!: number;

  @Property({ type: 'smallint' })
  relax!: number;

  @Property({ type: 'smallint' })
  history!: number;

  @Property({ type: 'smallint' })
  culture!: number;

  @Property({ type: 'smallint' })
  party!: number;

  constructor(data?: Partial<TourMoods>) {
    if (data) Object.assign(this, data);
  }
}

@Entity({ repository: () => TourRepository })
export class Tour {
  [EntityRepositoryType]?: TourRepository;
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property()
  @Unique()
  slug!: string;

  @Property()
  name!: string;

  @Property({ type: 'text' })
  description!: string;

  @Property({ type: 'date' })
  startingDate!: Date;

  @Property({ type: 'date' })
  endingDate!: Date;

  @Property({ type: 'integer' })
  price!: number; // Represented in cents (divide by 100 for currency value)

  @Embedded(() => TourMoods)
  moods!: TourMoods;

  constructor(data?: Partial<Tour>) {
    if (data) {
      Object.assign(this, data);

      // Handle moods conversion
      if (data.moods && !(data.moods instanceof TourMoods)) {
        this.moods = new TourMoods(data.moods);
      }
    }

    if (!this.moods) {
      this.moods = new TourMoods();
    }
  }
}
