import { BaseService } from '@has-george-read-backend/core/services/base.service';
import { BookRepository } from './../repositories/book.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService extends BaseService {
  constructor(private readonly BookRepository: BookRepository) {
    super();
  }

  public findAllNotDeleted() {
    return this.BookRepository.findAllNotDeleted();
  }
}
