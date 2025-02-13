import type { TourGetAvailableResponse } from '@nest-nuxt-demo/shared/domain/tour/tour-get-available';

export const useTour = async (tourId: string) => {
  const { data, status } = await useApi<TourGetAvailableResponse>(
    `tours/${tourId}`
  );

  if (status.value === 'error' || data.value === null) {
    throw createError({ statusCode: 404, statusMessage: 'Tour not found' });
  }

  return { tourData: data.value };
};
