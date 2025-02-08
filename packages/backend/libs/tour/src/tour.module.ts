import { CoreModule } from '@has-george-read-backend/core/core.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { TourService } from './services/tour.service';
import { Tour } from './models/tour.entity';
import { TourController } from './controllers/tour.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MikroOrmModule.forFeature([Tour]),
    CoreModule,
    CacheModule.register(),
  ],
  controllers: [TourController],
  providers: [
    TourService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  exports: [],
})
export class TourModule {}
