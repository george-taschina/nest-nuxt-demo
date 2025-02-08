import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { UserRepository } from '../repositories/user.repository';
import { v4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ repository: () => UserRepository })
export class User {
  [EntityRepositoryType]?: UserRepository;

  @PrimaryKey({ type: 'uuid' })
  @ApiProperty()
  id: string = v4();

  @Property()
  @Unique()
  @ApiProperty()
  email!: string;

  constructor(data?: Partial<User>) {
    if (data) Object.assign(this, data);
  }
}
