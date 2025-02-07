import { TourModule } from '../../../libs/tour/src/tour.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from '@has-george-read-backend/core/core.module';
import { ConfigModule } from '@nestjs/config';
import { appConfigLoader } from './config/app-config.loader';

@Module({
  imports: [CoreModule, TourModule, ConfigModule.forFeature(appConfigLoader)],
  controllers: [AppController],
  providers: [AppService],
  exports: [ConfigModule],
})
export class AppModule {}
