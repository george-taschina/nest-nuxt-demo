import { isProd } from '@has-george-read-backend/core/utils/environments';
import { registerAs } from '@nestjs/config';
import * as E from 'fp-ts/Either';
import * as PathReporter from 'io-ts/PathReporter';

import { AppConfig, appConfigCodec } from '../types/app-config';

const appConfig = (): AppConfig | never => {
  const config = {
    cors: isProd()
      ? {
          type: 'close',
          whitelist: process.env.CORS_WHITE_LIST?.split(',')
            .map((url) => url.trim())
            .filter((url) => url.length > 0),
        }
      : {
          type: 'open',
        },
    healthApiKey: process.env.HEALTH_API_KEY,
  };

  const validation = appConfigCodec.decode(config);

  if (E.isLeft(validation)) {
    throw new Error(
      `App config is not valid: ${PathReporter.failure(validation.left).join(',')}`
    );
  }

  return validation.right;
};

export const appConfigLoader = registerAs('appConfig', appConfig);

export const APP_CONFIG_KEY = appConfigLoader.KEY;
