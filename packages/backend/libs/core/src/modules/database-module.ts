import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DynamicModule } from '@nestjs/common';
import { DatabaseConfig } from '../types/database-config';
import { ConfigModule } from '@nestjs/config';
import { databaseConfigLoader } from '../config/database-config.loader';

export const databaseModuleFactory = (): DynamicModule => ({
  module: MikroOrmModule,
  imports: [ConfigModule.forFeature(databaseConfigLoader)],
  providers: [
    {
      provide: databaseConfigLoader.KEY,
      useFactory: databaseConfigLoader,
    },
    {
      provide: 'DATABASE_CONFIG',
      useFactory: (config: DatabaseConfig) => ({
        ...config,
        autoLoadEntities: true,
      }),
      inject: [databaseConfigLoader.KEY],
    },
  ],
  exports: [MikroOrmModule],
});
