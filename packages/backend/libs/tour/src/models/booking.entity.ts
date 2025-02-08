import {
  Entity,
  EntityRepositoryType,
  Index,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BookingRepository } from '../repositories/booking.repository';
import { v4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { Tour } from './tour.entity';
import { User } from './user.entity';

@Entity({ repository: () => BookingRepository })
export class Booking {
  [EntityRepositoryType]?: BookingRepository;

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
  seatsBooked!: number;

  @Property()
  @ApiProperty()
  bookingDate: Date = new Date();

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty()
  totalPrice!: number;

  @Property()
  @ApiProperty()
  @Index({ name: 'payment_status_index' })
  paymentStatus: 'pending' | 'completed' | 'failed' = 'pending';

  constructor(data?: Partial<Booking>) {
    if (data) Object.assign(this, data);
  }
}
