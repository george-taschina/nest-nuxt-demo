import {
  Entity,
  EntityRepositoryType,
  Index,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { ReservationRepository } from '../repositories/reservation.repository';
import { v4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { Tour } from './tour.entity';
import { User } from './user.entity';

@Entity({ repository: () => ReservationRepository })
export class Reservation {
  [EntityRepositoryType]?: ReservationRepository;

  @PrimaryKey({ type: 'uuid' })
  @ApiProperty()
  id: string = v4();

  @ManyToOne(() => Tour)
  @ApiProperty({ type: () => Tour })
  tour!: Tour;

  @ManyToOne(() => User)
  @ApiProperty({ type: () => User })
  user!: User;

  @Property({ type: 'integer' })
  @ApiProperty()
  seatsReserved!: number;

  @Property()
  @ApiProperty()
  @Index({ name: 'expire_index' })
  expiresAt!: Date;

  @Property()
  @ApiProperty()
  createdAt: Date = new Date();

  @Property({ persist: false })
  get isExpired() {
    return new Date() >= this.expiresAt;
  }

  constructor(data?: Partial<Reservation>) {
    if (data) Object.assign(this, data);
  }
}
