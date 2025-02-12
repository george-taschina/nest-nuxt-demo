// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
    tsConfig: {
      exclude: ['../backend'],
    },
  },
  devServer: {
    port: 8000,
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      sentryDsn: process.env.SENTRY_DSN,
      environment: process.env.ENVIRONMENT,
    },
  },
  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
  ],
});
