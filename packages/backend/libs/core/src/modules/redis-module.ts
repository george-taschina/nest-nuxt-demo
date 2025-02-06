import { RedisConfig } from '../types/redis-config';
import { ConfigModule } from '@nestjs/config';
import {
  REDIS_CONFIG_KEY,
  redisConfigLoader,
} from '../config/redis-config.loader';
import { DynamicModule } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';

export const redisModuleFactory = (): DynamicModule =>
  CacheModule.registerAsync({
    imports: [ConfigModule.forFeature(redisConfigLoader)],
    useFactory: (config: RedisConfig) =>
      createKeyv(`redis://${config.host}:${config.port}`),
    inject: [REDIS_CONFIG_KEY],
  });
