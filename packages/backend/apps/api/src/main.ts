import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GeorgeLogger } from '@nest-nuxt-demo-backend/core';
import { createLoggerModule } from '@nest-nuxt-demo-backend/core/logger/utils';
import { initSentry } from '@nest-nuxt-demo-backend/core/logger/sentry';
import helmet from 'helmet';
import * as Sentry from '@sentry/node';
import { json } from 'express';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { AppConfig } from './types/app-config';
import { APP_CONFIG_KEY } from './config/app-config.loader';
import { InternalError } from '@nest-nuxt-demo-backend/core/types/errors';
import { isProd } from '@nest-nuxt-demo-backend/core/utils/environments';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  initSentry();
  const logger = new GeorgeLogger('Main');
  const app = await NestFactory.create(AppModule, {
    logger: createLoggerModule('Has George Read - API'),
  });

  app.use(helmet());
  app.use(json({ limit: '100kb' }));

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  if (!isProd()) {
    logger.log('OpenAPI Docs Enabled');
    loadOpenApi(app, 'docs');
  }

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
      origin: (
        origin: string,
        callback: (
          arg0: InternalError | null,
          arg1: boolean | undefined
        ) => void
      ) => {
        if (
          !origin ||
          cors.whitelist.findIndex(
            (x) => x.toLowerCase() === origin.toLowerCase()
          ) !== -1
        ) {
          callback(null, true);
        } else {
          logger.errorWithoutReport(`blocked cors for: ${origin}`);
          callback(
            new InternalError('Not allowed by CORS', { cause: { origin } }),
            false
          );
        }
      },
    });
  } else {
    app.enableCors();
  }

  const { PORT = 3000 } = process.env;

  app.enableShutdownHooks();

  await app.listen(PORT, () => {
    logger.log(`App Running at port ${PORT}`);
  });

  Sentry.setupExpressErrorHandler(app);
}
bootstrap();

function loadOpenApi(app: INestApplication, path: string) {
  const config = new DocumentBuilder()
    .setTitle('We Road Demo')
    .setDescription('The We Road API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(path, app, document);
}
