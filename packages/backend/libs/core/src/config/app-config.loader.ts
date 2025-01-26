import { InternalError } from '../types/errors';
import { registerAs } from '@nestjs/config';
import * as E from 'fp-ts/Either';
import * as PathReporter from 'io-ts/PathReporter';
import {
  EnvironmentConfig,
  environmentConfigCodec,
} from '../types/environment-config';
import { Throwable } from '../types/throwable';

const loadEnvironmentConfig = (): EnvironmentConfig &
  Throwable<InternalError> => {
  const config = {
    releaseName: process.env.RELEASE_NAME,
    requestLoggerEnabled: process.env.REQUEST_LOGGER,
  };

  const validation = environmentConfigCodec.decode(config);
  if (E.isLeft(validation)) {
    throw new InternalError(
      `Environment Config is not valid ${PathReporter.failure(validation.left).join(',')}`
    );
  }
  return validation.right;
};

export const environmentConfigLoader = registerAs(
  'environmentConfig',
  loadEnvironmentConfig
);

export const ENVIRONMENT_CONFIG_KEY = environmentConfigLoader.KEY;
