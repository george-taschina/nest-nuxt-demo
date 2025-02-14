<script setup lang="ts">
import { type ReservationResponse } from '@nest-nuxt-demo/shared/domain/tour/reservation';
import { useReservationStore } from '~/stores/useReservationStore';

const route = useRoute();
const tourId = route.params.id as string;

const { $pinia } = useNuxtApp();
const reservationStore = useReservationStore($pinia);

const { tourData } = await useTour(tourId);
const { reservation, reserveTour } = useReservation(tourId);

const numberOfPeople = ref(1);
const email = ref('');
const sentRequest = ref(false);

const handleReservationSuccess = (
  validatedReservation: ReservationResponse
) => {
  reservationStore.$patch({
    reservation: validatedReservation,
    tour: tourData,
  });
  navigateTo(`/booking/${tourId}/pay`);
};

const handleSubmit = async () => {
  sentRequest.value = true;
  await reserveTour(email.value, numberOfPeople.value);
  sentRequest.value = false;
  console.debug(reservation.value);
  if (reservation.value) {
    handleReservationSuccess(reservation.value);
  }
};
</script>

<template>
  <div class="min-h-screen container mx-auto p-6 max-w-6xl" v-if="tourData">
    <div class="flex flex-col md:flex-row gap-8">
      <div class="flex-1 space-y-8">
        <header>
          <h1 class="text-3xl font-bold">
            Prenotazione
            <span
              v-if="tourData.availableSeats > 0"
              class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium"
            >
              {{ tourData.availableSeats }} posti rimanenti
            </span>
          </h1>
        </header>

        <form @submit.prevent="handleSubmit" class="space-y-8">
          <section class="bg-white p-6 rounded-lg shadow-sm">
            <h2 class="text-xl font-semibold mb-6">Dettagli Viaggiatori</h2>

            <PeopleCounter
              v-model="numberOfPeople"
              :available-seats="tourData.availableSeats"
            />

            <GeorgeInput
              label="Email"
              type="email"
              required
              v-model="email"
              class="mt-6"
            />
          </section>

          <GeorgeButton
            type="submit"
            class="w-full py-4 text-lg"
            :disable="sentRequest"
          >
            Prenota
          </GeorgeButton>
        </form>
      </div>

      <div class="flex-1">
        <TourCard :tour="tourData" disable-button full-description />
      </div>
    </div>
  </div>
</template>
