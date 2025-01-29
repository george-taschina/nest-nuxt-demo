import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { environmentConfigLoader } from './config/app-config.loader';
import { getConfigModuleFactory } from './config/config-module-provider';
import { databaseModuleFactory } from './modules/database-module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    getConfigModuleFactory(),
    ConfigModule.forFeature(environmentConfigLoader),
    databaseModuleFactory(),
  ],
  exports: [ConfigModule, MikroOrmModule],
})
export class CoreModule {}
