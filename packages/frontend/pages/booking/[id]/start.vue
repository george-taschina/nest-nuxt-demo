<script setup lang="ts">
import { reservationResponseCodec } from '@has-george-read/shared/domain/tour/reservation';
import { pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/Either';
import { useReservationStore } from '~/stores/useReservationStore';
const { $pinia } = useNuxtApp();

const route = useRoute();
const reservationStore = useReservationStore($pinia);
const tourId = route.params.id as string;

const { tourData } = await useTour(tourId);
const { reservation, reservationError, reserveTour } = useReservation(tourId);

const peopleCount = ref(1);
const email = ref('');

const incrementPeople = () => {
  if (peopleCount.value < tourData.availableSeats) peopleCount.value++;
};

const decrementPeople = () => {
  if (peopleCount.value > 1) peopleCount.value--;
};

const handleSubmit = async () => {
  await reserveTour(email.value, peopleCount.value);

  const validatedReservation = pipe(
    reservation.value,
    reservationResponseCodec.decode,
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

  navigateTo(`/booking/${tourId}/pay`);
};
</script>

<template>
  <div class="min-h-screen container mx-auto p-6 max-w-6xl" v-if="tourData">
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Left Column (Form) -->
      <div class="flex-1 space-y-8">
        <h1 class="text-3xl font-bold">
          Prenotazione
          <span
            v-if="tourData.availableSeats > 0"
            class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium"
          >
            {{ tourData.availableSeats }} seats left
          </span>
        </h1>

        <form @submit.prevent="handleSubmit" class="space-y-8">
          <section class="bg-white p-6 rounded-lg shadow-sm">
            <h2 class="text-xl font-semibold mb-6">Dettagli Viaggiatori</h2>

            <div class="mb-8">
              <label class="block font-medium mb-4">
                Per quante persone vuoi prenotare? *
              </label>
              <div class="flex items-center gap-6">
                <button
                  type="button"
                  @click="decrementPeople"
                  :disabled="peopleCount === 1"
                  class="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span class="text-lg w-8 text-center">{{ peopleCount }}</span>
                <button
                  type="button"
                  @click="incrementPeople"
                  class="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div class="mt-6">
              <GeorgeInput
                label="Email"
                type="email"
                required="true"
                v-model="email"
              />
            </div>
          </section>

          <GeorgeButton class="w-full py-4 text-lg" type="submit">
            Prenota
          </GeorgeButton>
          <ul class="text-red-400" v-if="reservationError">
            <li
              v-for="msg in Array.isArray(reservationError?.message)
                ? reservationError.message
                : [reservationError?.message]"
              :key="msg"
            >
              {{ msg }}
            </li>
          </ul>
        </form>
      </div>

      <!-- Right Column (Tour Details) -->
      <div class="flex-1">
        <TourCard :tour="tourData" disableButton fullText />
      </div>
    </div>
  </div>
</template>
