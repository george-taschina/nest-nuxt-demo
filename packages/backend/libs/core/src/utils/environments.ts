import * as E from 'fp-ts/Either';
import { environmentCodec } from '@has-george-read-backend/core/types/environment';

const getEnvironment = () => {
  const result = environmentCodec.decode(process.env.NODE_ENV);
  if (!E.isRight(result)) {
    return null;
  }
  return result.right;
};

export const isDev = (): boolean => getEnvironment() === 'development';
export const isProd = (): boolean => getEnvironment() === 'production';
export const isStaging = (): boolean => getEnvironment() === 'staging';
export const isTest = (): boolean =>
  getEnvironment() === 'test' || getEnvironment() === 'e2e';
