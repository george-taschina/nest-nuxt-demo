<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import moment from 'moment';
import { useReservationStore } from '~/stores/useReservationStore';
import { bookingResponseCodec } from '@has-george-read/shared/domain/tour/booking';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

const { $pinia } = useNuxtApp();
const reservationStore = useReservationStore($pinia);
const tourData = reservationStore.tour;
const reservationData = reservationStore.reservation;
if (tourData === null || reservationData === null) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Tour Not found',
  });
}
const { booking, bookingError, bookTour } = useBooking(reservationData.id);

const timeLeft = ref('');

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

let timerInterval: ReturnType<typeof setInterval>;

onMounted(() => {
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
});

onUnmounted(() => {
  clearInterval(timerInterval);
});

const handlePayment = async () => {
  await bookTour();

  const validatedReservation = pipe(
    booking.value,
    bookingResponseCodec.decode,
    E.match(
      () => {
        throw createError({
          statusCode: 400,
          statusMessage: 'Something went wrong',
        });
      },
      (result) => result
    )
  );

  reservationStore.$patch({
    reservation: validatedReservation,
    tour: tourData,
  });

  navigateTo(`/success`);
};
</script>

<template>
  <div class="min-h-screen container mx-auto p-6 max-w-6xl">
    <div class="bg-red-100 shadow-md rounded-md p-6">
      <h1 class="text-red-500 font-bold text-xl">Attenzione!</h1>
      <p class="text-gray-600">
        I posti vi sono stati riservati per un tempo limitato, completare il
        checkout entro la scadenza del timer
      </p>
      <p class="text-lg font-bold text-red-500 mt-2">{{ timeLeft }}</p>
    </div>
    <div class="flex flex-col md:flex-row gap-8 mt-6">
      <!-- Left Column (Form) -->
      <div class="flex-1 space-y-8">
        <h1 class="text-3xl font-bold">Checkout</h1>

        <div>
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
        <ul class="text-red-400" v-if="bookingError">
          <li
            v-for="msg in Array.isArray(bookingError?.message)
              ? bookingError.message
              : [bookingError?.message]"
            :key="msg"
          >
            {{ msg }}
          </li>
        </ul>
      </div>

      <!-- Right Column (Tour Details) -->
      <div class="flex-1">
        <TourCard :tour="tourData" disableButton fullText />
      </div>
    </div>
  </div>
</template>
