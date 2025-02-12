export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: config.public.apiBaseUrl,
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
