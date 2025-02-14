<script setup lang="ts">
import { useReservationStore } from '~/stores/useReservationStore';
import { useBooking } from '~/composables/useBooking';
import activeReservation from '~/middleware/activeReservation';

definePageMeta({
  middleware: activeReservation,
});

const { $pinia } = useNuxtApp();
const reservationStore = useReservationStore($pinia);

const { booking, bookTour } = useBooking(reservationStore.reservation!.id);

const handlePaymentSuccess = () => {
  navigateTo('/success');
};

const handlePayment = async () => {
  await bookTour();

  if (booking.value) {
    handlePaymentSuccess();
  }
};
</script>

<template>
  <div class="min-h-screen container mx-auto p-6 max-w-6xl">
    <Timer :expiresAt="reservationStore.reservation!.expiresAt" />
    <div class="flex flex-col md:flex-row gap-8">
      <div class="flex-1 space-y-8">
        <h1 class="text-3xl font-bold">Checkout</h1>
        <div class="space-y-2">
          <p>
            <span class="font-bold">Posti prenotati:</span>
            {{ reservationStore.reservation!.seatsReserved }}
          </p>
          <p>
            <span class="font-bold">Totale:</span>
            {{
              formatPrice(
                reservationStore.reservation!.seatsReserved *
                  reservationStore.tour!.price
              )
            }}
          </p>
        </div>
        <GeorgeButton class="w-full py-4 text-lg" @click="handlePayment">
          Paga
        </GeorgeButton>
      </div>
      <div class="flex-1">
        <TourCard :tour="reservationStore.tour!" disableButton fullText />
      </div>
    </div>
  </div>
</template>
