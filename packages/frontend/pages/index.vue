<script setup lang="ts">
import type { TourGetAvailableResponse } from '@has-george-read/shared/domain/tour/tour-get-available';

const { data, status, error } =
  await useApi<TourGetAvailableResponse[]>('tours');
</script>

<template>
  <div class="min-h-screen mt-10 md:mt-24 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div>
        <h1
          class="text-6xl md:text-9xl font-bold text-primary text-center md:text-left"
        >
          PLAN YOUR
        </h1>
        <h1
          class="text-6xl md:text-9xl font-extralight italic text-primary text-center md:text-left"
        >
          ESCAPE
        </h1>
      </div>
      <div class="flex shadow-md bg-secondary rounded-md mt-16 p-10 relative">
        <p class="md:w-80 md:flex-none text-2xl text-left text-primary">
          We have the largest selection of unique tours. Try our easyand quick
          tour selection for any request. 24-hour support is always happy to
          answer all your questions.
        </p>

        <div
          class="hidden md:block absolute -right-10 bottom-0 w-[200px] sm:w-[350px] md:w-[400px] lg:w-[450px] z-2"
        >
          <NuxtImg format="webp" loading="lazy" src="/palm.png" />
        </div>
      </div>

      <div class="mt-16">
        <div v-if="status === 'pending'" class="text-center text-gray-500">
          Loading tours...
        </div>
        <div v-if="error" class="text-center text-red-500">
          Error loading tours: {{ error.message }}
        </div>

        <div
          :v-if="data && data.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          <TourCard
            v-for="tour in data"
            :key="tour.id"
            :tour="tour"
            class="h-full"
          />
        </div>

        <div v-if="data && data.length == 0">No available tours :(</div>
      </div>
    </div>
  </div>
</template>
