import { pipe } from 'fp-ts/lib/function';
import { DatabaseConfig, databaseConfigCodec } from '../types/database-config';
import * as E from 'fp-ts/Either';
import { registerAs } from '@nestjs/config';

const databaseConfig = (): DatabaseConfig | never =>
  pipe(
    {
      type: process.env.MIKRO_ORM_CONNECTION,
      host: process.env.MIKRO_ORM_HOST,
      port: process.env.MIKRO_ORM_PORT,
      username: process.env.MIKRO_ORM_USER,
      password: process.env.MIKRO_ORM_PASSWORD,
      name: process.env.MIKRO_ORM_DB_NAME,
      debug: process.env.MIKRO_ORM_DEBUG || 'disabled',
    },
    databaseConfigCodec.decode,
    E.mapLeft((errors) => {
      throw new Error(
        `Errore durante la decodifica del database: ${errors.map((error) => error.message).join('\n')}`
      );
    }),
    E.getOrElseW((config) => config)
  );

export const databaseConfigLoader = registerAs(
  'databaseConfig',
  databaseConfig
);

export const DATABASE_CONFIG_KEY = databaseConfigLoader.KEY;
