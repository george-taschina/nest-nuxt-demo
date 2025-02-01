import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { environmentConfigLoader } from './config/app-config.loader';
import { getConfigModuleFactory } from './config/config-module-provider';
import { databaseModuleFactory } from './modules/database-module';

@Module({
  imports: [
    getConfigModuleFactory(),
    ConfigModule.forFeature(environmentConfigLoader),
    databaseModuleFactory(),
  ],
  exports: [ConfigModule],
})
export class CoreModule {}
