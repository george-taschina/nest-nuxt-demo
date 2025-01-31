import { DatabaseConfig } from '../types/database-config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { databaseConfigLoader } from '../config/database-config.loader';
import { MySqlDriver } from '@mikro-orm/mysql';

export const databaseModuleFactory = () =>
  MikroOrmModule.forRootAsync({
    imports: [ConfigModule.forFeature(databaseConfigLoader)],
    useFactory: (config: DatabaseConfig) => ({
      dbName: config.name,
      user: config.username,
      password: config.password,
      host: config.host,
      port: config.port,
      driver: MySqlDriver,
      entities: ['../../../../dist/**/*.entity.js'],
      entitiesTs: ['../../../../libs/**/*.entity.ts'],
      debug: config.debug === 'true',
      autoLoadEntities: true,
    }),
  });
