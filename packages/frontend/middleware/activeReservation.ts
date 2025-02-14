export default defineNuxtRouteMiddleware(() => {
  const { $pinia } = useNuxtApp();
  const reservationStore = useReservationStore($pinia);

  if (reservationStore.reservation === null || reservationStore.tour === null) {
    return navigateTo('/');
  }
});
