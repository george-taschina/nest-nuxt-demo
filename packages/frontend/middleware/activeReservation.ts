export default defineNuxtRouteMiddleware(() => {
  const { $pinia } = useNuxtApp();
  const reservationStore = useReservationStore($pinia);

  if (reservationStore.reservation === null || reservationStore.tour === null) {
    console.debug('im rediredicing you');
    return navigateTo('/');
  }
});
