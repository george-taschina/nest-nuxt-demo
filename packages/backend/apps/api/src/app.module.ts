import { TourModule } from '../../../libs/tour/src/tour.module';
import { Module } from '@nestjs/common';
import { CoreModule } from '@has-george-read-backend/core/core.module';
import { ConfigModule } from '@nestjs/config';
import { appConfigLoader } from './config/app-config.loader';

@Module({
  imports: [CoreModule, TourModule, ConfigModule.forFeature(appConfigLoader)],
  controllers: [],
  providers: [],
  exports: [ConfigModule],
})
export class AppModule {}
