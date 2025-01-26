import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { environmentConfigLoader } from './config/app-config.loader';
import { getConfigModuleFactory } from './config/config-module-provider';

@Module({
  imports: [
    getConfigModuleFactory(),
    ConfigModule.forFeature(environmentConfigLoader),
  ],
  exports: [ConfigModule],
})
export class CoreModule {}
