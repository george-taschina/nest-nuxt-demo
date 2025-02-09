export const useNestFetch = <T>(request: string) => {
  const config = useRuntimeConfig();

  return useFetch<T>(request, {
    baseURL: config.public.apiBaseUrl,
  });
};
