import { CoreModule } from '@has-george-read-backend/core/core.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { BookRepository } from './repositories/book.repository';
import { BookService } from './services/book.service';
import { Book } from './models/book.entity';
import { BookController } from './controllers/book.controller';

@Module({
  controllers: [BookController],
  imports: [MikroOrmModule.forFeature([Book]), CoreModule],
  providers: [BookRepository, BookService],
  exports: [],
})
export class BookModule {}
