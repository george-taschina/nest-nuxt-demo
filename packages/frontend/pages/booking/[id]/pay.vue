<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import moment from 'moment';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

import { bookingResponseCodec } from '@nest-nuxt-demo/shared/domain/tour/booking';
import { useReservationStore } from '~/stores/useReservationStore';
import { useBooking } from '~/composables/useBooking';
import { useErrorHandler } from '~/composables/useErrorHandler';

const { $pinia } = useNuxtApp();
const reservationStore = useReservationStore($pinia);

const { showError, errorMessage, clearError, triggerError } = useErrorHandler();

const tourData = reservationStore.tour;
const reservationData = reservationStore.reservation;

if (!tourData || !reservationData) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Tour Not found',
  });
}

const { booking, bookTour } = useBooking(reservationData.id, triggerError);

const timeLeft = ref('');
let timerInterval: NodeJS.Timeout;

const updateTimer = () => {
  const now = moment();
  const expiration = moment(reservationData.expiresAt);
  const diffSeconds = expiration.diff(now, 'seconds');

  if (diffSeconds <= 0) {
    navigateTo('/expired');
  } else {
    timeLeft.value = moment.utc(diffSeconds * 1000).format('mm:ss');
  }
};

onMounted(() => {
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
});

onUnmounted(() => {
  clearInterval(timerInterval);
});

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

const handlePaymentSuccess = () => {
  reservationStore.$patch({
    reservation: booking.value,
    tour: tourData,
  });
  navigateTo('/success');
};

const handlePayment = async () => {
  await bookTour();

  if (booking.value) {
    validateBookingResponse(booking.value);
    handlePaymentSuccess();
  }
};
</script>

<template>
  <div class="min-h-screen container mx-auto p-6 max-w-6xl">
    <ErrorModal :show="showError" :message="errorMessage" @close="clearError" />

    <!-- Warning Banner -->
    <div class="bg-red-100 shadow-md rounded-md p-6 mb-6">
      <h1 class="text-red-500 font-bold text-xl mb-2">Attenzione!</h1>
      <p class="text-gray-600">
        I posti vi sono stati riservati per un tempo limitato, completare il
        checkout entro la scadenza del timer
      </p>
      <p class="text-lg font-bold text-red-500 mt-2">
        {{ timeLeft }}
      </p>
    </div>

    <!-- Checkout Content -->
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Checkout Details -->
      <div class="flex-1 space-y-8">
        <h1 class="text-3xl font-bold">Checkout</h1>

        <div class="space-y-2">
          <p>
            <span class="font-bold">Posti prenotati:</span>
            {{ reservationData.seatsReserved }}
          </p>
          <p>
            <span class="font-bold">Totale:</span>
            {{ formatPrice(reservationData.seatsReserved * tourData.price) }}
          </p>
        </div>

        <GeorgeButton class="w-full py-4 text-lg" @click="handlePayment">
          Paga
        </GeorgeButton>
      </div>

      <!-- Tour Details -->
      <div class="flex-1">
        <TourCard :tour="tourData" disableButton fullText />
      </div>
    </div>
  </div>
</template>
