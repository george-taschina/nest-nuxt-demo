import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BookRepository } from '../repositories/book.repository';

@Entity({ repository: () => BookRepository })
export class Book {
  [EntityRepositoryType]?: BookRepository;
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property()
  author!: string;

  @Property()
  pages!: number;
}
