import { Controller, Get } from '@nestjs/common';
import { BookService } from '../services/book.service';
import {
  TEmapLeftToHttpError,
  TEThrowIfError,
} from '@has-george-read-backend/core/controllers/controller-utils';
import { pipe } from 'fp-ts/function';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll() {
    return pipe(
      this.bookService.findAllNotDeleted(),
      TEmapLeftToHttpError,
      TEThrowIfError
    )();
  }
}
