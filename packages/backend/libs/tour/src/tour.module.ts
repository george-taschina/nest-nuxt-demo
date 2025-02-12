import { CoreModule } from '@has-george-read-backend/core/core.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { TourService } from './services/tour.service';
import { TourController } from './controllers/tour.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { ReservationController } from './controllers/reservation.controller';
import { ReservationService } from './services/reservations.service';
import { BookingService } from './services/booking.service';
import { UserService } from './services/user.service';
import { ENTITIES_LIST } from './models/entities-list';
import { BookingController } from './controllers/booking.controller';

@Module({
  imports: [
    CoreModule,
    MikroOrmModule.forFeature(ENTITIES_LIST),
    CacheModule.register({
      ttl: 500,
    }),
  ],
  controllers: [TourController, ReservationController, BookingController],
  providers: [
    TourService,
    ReservationService,
    BookingService,
    UserService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  exports: [],
})
export class TourModule {}
