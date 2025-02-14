import {
  reservationResponseCodec,
  type ReservationResponse,
} from '@nest-nuxt-demo/shared/domain/tour/reservation';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

const validateReservationResponse = (response: unknown) =>
  pipe(
    response,
    reservationResponseCodec.decode,
    E.match(
      () => {
        throw createError({
          statusCode: 400,
          statusMessage: 'Invalid reservation response format',
        });
      },
      (validatedData) => validatedData
    )
  );

export const useReservation = (tourId: string) => {
  const { $pinia } = useNuxtApp();
  const { triggerError } = useErrorStore($pinia);

  const reservation = ref<ReservationResponse>();

  const reserveTour = async (email: string, peopleCount: number) => {
    try {
      const { data, status, error } = await useLazyApi<ReservationResponse>(
        'reservations',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: { tourId, email, numberOfSeats: peopleCount },
        }
      );

      if (status.value === 'error') {
        triggerError(
          error.value?.data.message.join(' ') ||
            'Something went wrong, try again.'
        );
        return;
      }

      reservation.value = validateReservationResponse(data.value);
    } catch {
      triggerError('Something went wrong in reservation, try again.');
    }
  };

  return { reservation, reserveTour };
};
