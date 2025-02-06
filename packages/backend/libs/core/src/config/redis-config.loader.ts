import { pipe } from 'fp-ts/lib/function';
import { RedisConfig, redisConfigCodec } from '../types/redis-config';
import * as E from 'fp-ts/Either';
import { registerAs } from '@nestjs/config';

const redisConfig = (): RedisConfig | never =>
  pipe(
    {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
    redisConfigCodec.decode,
    E.mapLeft((errors) => {
      throw new Error(
        `Errore durante la decodifica del redis: ${errors.map((error) => error.message).join('\n')}`
      );
    }),
    E.getOrElseW((config) => config)
  );

export const redisConfigLoader = registerAs('redisConfig', redisConfig);

export const REDIS_CONFIG_KEY = redisConfigLoader.KEY;
