import { CoreModule } from '@has-george-read-backend/core/core.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { TourService } from './services/tour.service';
import { Tour } from './models/tour.entity';
import { TourController } from './controllers/tour.controller';

@Module({
  imports: [MikroOrmModule.forFeature([Tour]), CoreModule],
  controllers: [TourController],
  providers: [TourService],
  exports: [],
})
export class TourModule {}
