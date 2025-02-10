import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { environmentConfigLoader } from './config/app-config.loader';
import { getConfigModuleFactory } from './config/config-module-provider';
import { databaseModuleFactory } from './modules/database-module';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { redisModuleFactory } from './modules/redis-module';
import { CacheService } from './services/redis.service';
import { APP_FILTER } from '@nestjs/core';
import { GeorgeExceptionFilter } from './filters/george-exceptions.filter';

@Module({
  imports: [
    getConfigModuleFactory(),
    ConfigModule.forFeature(environmentConfigLoader),
    databaseModuleFactory(),
    redisModuleFactory(),
  ],
  providers: [
    CacheService,
    {
      provide: APP_FILTER,
      useClass: GeorgeExceptionFilter,
    },
  ],
  exports: [ConfigModule, CacheService],
})
export class CoreModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
