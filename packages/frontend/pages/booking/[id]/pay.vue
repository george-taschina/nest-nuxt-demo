<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import moment from 'moment';
import { useReservationStore } from '~/stores/useReservationStore';

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

        <GeorgeButton class="w-full py-4 text-lg" type="submit">
          Paga
        </GeorgeButton>
      </div>

      <!-- Right Column (Tour Details) -->
      <div class="flex-1">
        <TourCard :tour="tourData" disableButton fullText />
      </div>
    </div>
  </div>
</template>
