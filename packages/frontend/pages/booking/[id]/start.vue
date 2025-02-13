<script setup lang="ts">
import {
  reservationResponseCodec,
  type ReservationResponse,
} from '@nest-nuxt-demo/shared/domain/tour/reservation';
import { pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/Either';
import { useReservationStore } from '~/stores/useReservationStore';

const { $pinia } = useNuxtApp();
const route = useRoute();
const reservationStore = useReservationStore($pinia);
const tourId = route.params.id as string;

const { tourData } = await useTour(tourId);
const { reservation, reservationError, reserveTour } = useReservation(tourId);

const numberOfPeople = ref(1);
const email = ref('');

const MIN_PEOPLE = 1;
const { availableSeats } = tourData;

const updatePeopleCount = (modification: 'increment' | 'decrement') => {
  if (modification === 'increment' && numberOfPeople.value < availableSeats) {
    numberOfPeople.value++;
  } else if (
    modification === 'decrement' &&
    numberOfPeople.value > MIN_PEOPLE
  ) {
    numberOfPeople.value--;
  }
};

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
  await reserveTour(email.value, numberOfPeople.value);

  const validatedReservation = validateReservationResponse(reservation.value);
  handleReservationSuccess(validatedReservation);
};
</script>

<template>
  <div class="min-h-screen container mx-auto p-6 max-w-6xl" v-if="tourData">
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Booking Form -->
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

            <div class="mb-8">
              <label class="block font-medium mb-4">
                Numero di partecipanti *
              </label>
              <div class="flex items-center gap-6">
                <button
                  type="button"
                  @click="updatePeopleCount('decrement')"
                  :disabled="numberOfPeople === MIN_PEOPLE"
                  class="control-button"
                >
                  -
                </button>
                <span class="text-lg w-8 text-center">{{
                  numberOfPeople
                }}</span>
                <button type="button" @click="updatePeopleCount('increment')">
                  +
                </button>
              </div>
            </div>

            <GeorgeInput
              label="Email"
              type="email"
              required
              v-model="email"
              class="mt-6"
            />
          </section>

          <GeorgeButton type="submit" class="w-full py-4 text-lg">
            Prenota
          </GeorgeButton>

          <ReservationErrorMessages :error="reservationError" />
        </form>
      </div>

      <div class="flex-1">
        <TourCard :tour="tourData" disable-button full-description />
      </div>
    </div>
  </div>
</template>
