import { CoreModule } from '@has-george-read-backend/core/core.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { BookService } from './services/book.service';
import { Book } from './models/book.entity';
import { BookController } from './controllers/book.controller';

@Module({
  imports: [MikroOrmModule.forFeature([Book]), CoreModule],
  controllers: [BookController],
  providers: [BookService],
  exports: [],
})
export class BookModule {}
