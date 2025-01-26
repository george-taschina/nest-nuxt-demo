import * as SentryNode from '@sentry/node';
import { rewriteFramesIntegration } from '@sentry/node';
import * as Os from 'os';

export const initSentry = (): void => {
  const { SENTRY_DSN, NODE_ENV, HOST_NAME, NAME, RELEASE_NAME } = process.env;

  if (SENTRY_DSN) {
    SentryNode.init({
      dsn: SENTRY_DSN,
      environment: NODE_ENV || 'development',
      serverName: HOST_NAME,
      release: RELEASE_NAME || 'local_release',
      maxBreadcrumbs: 50,
      sampleRate: 1.0,
      attachStacktrace: true,
      integrations: [
        rewriteFramesIntegration({
          root: process.cwd(),
        }),
      ],
    });
    SentryNode.setTag('app', NAME);
    SentryNode.setTag('os', `${Os.platform()} ${Os.release()}`);
  }
};
