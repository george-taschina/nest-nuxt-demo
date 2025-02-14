import type { TourGetAvailableResponse } from '@nest-nuxt-demo/shared/domain/tour/tour-get-available';

export const useTour = async (tourId: string) => {
  const { $pinia } = useNuxtApp();
  const { triggerError } = useErrorStore($pinia);

  const { data, status } = await useApi<TourGetAvailableResponse>(
    `tours/${tourId}`
  );

  if (status.value === 'error' || data.value === null) {
    throw triggerError('Tour not found');
  }

  return { tourData: data.value };
};
