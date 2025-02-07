import { DatabaseConfig } from '../types/database-config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import {
  DATABASE_CONFIG_KEY,
  databaseConfigLoader,
} from '../config/database-config.loader';
import { MySqlDriver } from '@mikro-orm/mysql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SeedManager } from '@mikro-orm/seeder';

export const databaseModuleFactory = async () =>
  await MikroOrmModule.forRootAsync({
    driver: MySqlDriver,
    imports: [ConfigModule.forFeature(databaseConfigLoader)],
    useFactory: (config: DatabaseConfig) => ({
      driver: MySqlDriver,
      metadataProvider: TsMorphMetadataProvider,
      dbName: config.name,
      user: config.username,
      password: config.password,
      host: config.host,
      port: config.port,
      debug: config.debug === 'true',
      autoLoadEntities: true,
      discovery: { disableDynamicFileAccess: true },
      extensions: [SeedManager],
    }),
    inject: [DATABASE_CONFIG_KEY],
  });
