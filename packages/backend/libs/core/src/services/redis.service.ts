import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import * as TE from 'fp-ts/TaskEither';
import { CacheError } from '../types/errors';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  get<T>(key: string): TE.TaskEither<CacheError, T | null> {
    return TE.tryCatch(
      () => this.cache.get(key),
      (error) => {
        return new CacheError('Error while getting data from cache', {
          cause: error,
        });
      }
    );
  }

  set<T>(key: string, value: T, ttl?: number): TE.TaskEither<CacheError, T> {
    return TE.tryCatch(
      () => this.cache.set(key, value, ttl),
      (error) => {
        return new CacheError('Error while getting data from cache', {
          cause: error,
        });
      }
    );
  }

  delete(key: string): TE.TaskEither<CacheError, boolean> {
    return TE.tryCatch(
      () => this.cache.del(key),
      (error) => {
        return new CacheError('Error while getting data from cache', {
          cause: error,
        });
      }
    );
  }
}
