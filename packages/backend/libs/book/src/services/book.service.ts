import { BookRepository } from './../repositories/book.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
  constructor(private readonly BookRepository: BookRepository) {}

  public findAllNotDeleted() {
    return this.BookRepository.findAllNotDeleted();
  }
}
