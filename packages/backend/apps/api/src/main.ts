import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import SourceMap from 'source-map-support';
import { GeorgeLogger } from '@has-george-read-backend/core';
import { createLoggerModule } from '@has-george-read-backend/core/logger/utils';
import { initSentry } from '@has-george-read-backend/core/logger/sentry';
import helmet from 'helmet';
import * as Sentry from '@sentry/node';
import { json } from 'express';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppConfig } from './types/app-config';
import { APP_CONFIG_KEY } from './config/app-config.loader';
import { InternalError } from '@has-george-read-backend/core/types/errors';

SourceMap.install();

async function bootstrap() {
  initSentry();
  const logger = new GeorgeLogger('Main');
  const app = await NestFactory.create(AppModule, {
    logger: createLoggerModule('Has George Read - API'),
  });

  app.use(helmet());
  app.use(json({ limit: '100kb' }));

  app.setGlobalPrefix('api');
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      always: true,
      transform: true,
    })
  );

  const corsConfig = app.get<AppConfig>(APP_CONFIG_KEY);

  if (corsConfig.cors.type === 'close') {
    const cors = corsConfig.cors;

    app.enableCors({
      allowedHeaders: '*',
      methods: '*',
      origin: (origin, callback) => {
        if (
          !origin ||
          cors.whitelist.findIndex(
            (x) => x.toLowerCase() === origin.toLowerCase()
          ) !== -1
        ) {
          callback(null, true);
        } else {
          logger.errorWithoutReport(`blocked cors for: ${origin}`);
          callback(new InternalError('Not allowed by CORS'));
        }
      },
    });
  } else {
    app.enableCors();
  }

  const { PORT = 3001 } = process.env;

  await app.listen(PORT, () => {
    logger.log(`App Running at port ${PORT}`);
  });

  Sentry.setupExpressErrorHandler(app);
}
bootstrap();
