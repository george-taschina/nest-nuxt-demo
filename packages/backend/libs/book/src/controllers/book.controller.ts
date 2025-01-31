import { Controller, Get } from '@nestjs/common';
import { BookService } from '../services/book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAll() {
    return this.bookService.findAllNotDeleted();
  }
}
