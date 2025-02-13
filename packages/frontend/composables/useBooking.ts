import { type BookingResponse } from '@nest-nuxt-demo/shared/domain/tour/booking';
import type { HttpError } from '@nest-nuxt-demo/shared/domain/http-error';

export const useBooking = (reservationId: string) => {
  const config = useRuntimeConfig();
  const booking = ref<BookingResponse>();
  const bookingError = ref<HttpError>();

  const bookTour = async () => {
    try {
      const response = await fetch(config.public.apiBaseUrl + '/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reservationId }),
      });

      if (!response.ok) {
        bookingError.value = await response.json();
        return;
      }
      booking.value = await response.json();
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  return { booking, bookingError, bookTour };
};
