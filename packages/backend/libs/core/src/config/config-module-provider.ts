import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';

export const getConfigModuleFactory = async (): Promise<DynamicModule> =>
  await ConfigModule.forRoot({
    envFilePath: [
      '.env',
      `.env.${process.env.NODE_ENV}.local`,
      `.env.${process.env.NODE_ENV}`,
    ],
  });
