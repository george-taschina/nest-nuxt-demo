import {
  bookingResponseCodec,
  type BookingResponse,
} from '@nest-nuxt-demo/shared/domain/tour/booking';
import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import { useErrorStore } from '~/stores/useErrorStore';

const validateBookingResponse = (response: unknown) =>
  pipe(
    response,
    bookingResponseCodec.decode,
    E.match(
      () => {
        throw createError({
          statusCode: 400,
          statusMessage: 'Invalid booking response',
        });
      },
      (validatedData) => validatedData
    )
  );

export const useBooking = (reservationId: string) => {
  const { $pinia } = useNuxtApp();
  const { triggerError } = useErrorStore($pinia);

  const booking = ref<BookingResponse>();

  const bookTour = async () => {
    try {
      const { data, status, error } = await useLazyApi<BookingResponse>(
        'bookings',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: { reservationId },
        }
      );

      if (status.value === 'error') {
        triggerError(
          error.value?.data.message.join(' ') ||
            'Something went wrong, try again.'
        );
        return;
      }

      booking.value = validateBookingResponse(data.value);
    } catch {
      triggerError('Something went wrong in booking Tour, try again.');
    }
  };

  return { booking, bookTour };
};
