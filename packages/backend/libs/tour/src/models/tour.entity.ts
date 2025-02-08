import {
  Collection,
  Embeddable,
  Embedded,
  Entity,
  EntityRepositoryType,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { TourRepository } from '../repositories/tour.repository';
import { v4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { Reservation } from './reservation.entity';
import { Booking } from './booking.entity';

@Embeddable()
export class TourMoods {
  @Property({ type: 'smallint' })
  @ApiProperty()
  nature!: number;

  @Property({ type: 'smallint' })
  @ApiProperty()
  relax!: number;

  @Property({ type: 'smallint' })
  @ApiProperty()
  history!: number;

  @Property({ type: 'smallint' })
  @ApiProperty()
  culture!: number;

  @Property({ type: 'smallint' })
  @ApiProperty()
  party!: number;

  constructor(data?: Partial<TourMoods>) {
    if (data) Object.assign(this, data);
  }
}

@Entity({ repository: () => TourRepository })
export class Tour {
  [EntityRepositoryType]?: TourRepository;
  @PrimaryKey({ type: 'uuid' })
  @ApiProperty()
  id: string = v4();

  @Property()
  @Unique()
  @ApiProperty()
  slug!: string;

  @Property()
  @ApiProperty()
  name!: string;

  @Property({ type: 'text' })
  @ApiProperty()
  description!: string;

  @Property({ type: 'date' })
  @ApiProperty()
  startingDate!: Date;

  @Property({ type: 'date' })
  @ApiProperty()
  endingDate!: Date;

  @Property({ type: 'integer' })
  @ApiProperty()
  price!: number;

  @Property({ type: 'integer' })
  @ApiProperty()
  totalSeats!: number;

  @OneToMany(() => Reservation, (reservation) => reservation.tour)
  reservations = new Collection<Reservation>(this);

  @OneToMany(() => Booking, (booking) => booking.tour)
  bookings = new Collection<Booking>(this);

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
