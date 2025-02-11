<script setup lang="ts">
import type { TourGetAvailableResponse } from '@has-george-read/shared/domain/tour/tour-get-available';

const route = useRoute();
const tourId = route.params.id;

const { data, status, error } = await useNestFetch<TourGetAvailableResponse>(
  `tours/${tourId}`
);

// Check for errors and null data
if (status.value === 'error' || data.value === null) {
  throw createError({ statusCode: 404, statusMessage: 'Tour not found' });
}

const tourData = data.value;

const peopleCount = ref(1);
const email = ref('');

const incrementPeople = () => {
  if (peopleCount.value < tourData.availableSeats) peopleCount.value++;
};

const decrementPeople = () => {
  if (peopleCount.value > 1) peopleCount.value--;
};

const handleSubmit = () => {
  console.log({
    tourId,
    peopleCount: peopleCount.value,
    email: email.value,
  });
};
</script>
<template>
  <div class="min-h-screen container mx-auto p-6 max-w-6xl" v-if="data">
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Left Column (Form) -->
      <div class="flex-1 space-y-8">
        <h1 class="text-3xl font-bold">
          Prenotazione
          <span
            v-if="data.availableSeats > 0"
            class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium"
          >
            {{ data.availableSeats }} seats left
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
        </form>
      </div>

      <!-- Right Column (Tour Details) -->
      <div class="flex-1">
        <TourCard :tour="tourData" disableButton fullText />
      </div>
    </div>
  </div>
</template>
