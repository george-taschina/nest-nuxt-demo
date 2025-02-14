import type { UseFetchOptions } from 'nuxt/app';

export function useLazyApi<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>
) {
  return useLazyFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api as typeof $fetch,
  });
}
