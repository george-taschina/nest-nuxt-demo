import { type ReservationResponse } from '@has-george-read/shared/domain/tour/reservation';
import type { HttpError } from '@has-george-read/shared/domain/http-error';

export const useReservation = (tourId: string) => {
  const config = useRuntimeConfig();
  const reservation = ref<ReservationResponse>();
  const reservationError = ref<HttpError>();

  const reserveTour = async (email: string, peopleCount: number) => {
    try {
      const response = await fetch(config.public.apiBaseUrl + '/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tourId, email, numberOfSeats: peopleCount }),
      });

      if (!response.ok) {
        reservationError.value = await response.json();
        return;
      }
      reservation.value = await response.json();
    } catch (error) {
      console.error('Reservation failed:', error);
    }
  };

  return { reservation, reservationError, reserveTour };
};
