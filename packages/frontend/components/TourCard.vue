<script setup>
const props = defineProps({
  tour: {
    type: Object,
    required: true,
  },
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const formatPrice = (price) => {
  return `$${(price / 100).toLocaleString('en-US')}`;
};
</script>

<!-- In TourCard.vue -->
<template>
  <div
    class="h-full flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
  >
    <div class="p-6 flex-1 flex flex-col">
      <!-- Added flex container -->
      <div class="mb-4 flex-1">
        <!-- Added flex-1 to description section -->
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">
          {{ tour.name }}
        </h2>
        <p class="text-gray-600 line-clamp-3">{{ tour.description }}</p>
      </div>

      <div class="space-y-3">
        <div class="flex justify-between items-center text-sm">
          <span class="text-gray-500">
            {{ formatDate(tour.startingDate) }} -
            {{ formatDate(tour.endingDate) }}
          </span>
          <span
            v-if="tour.availableSeats > 0"
            class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium"
          >
            {{ tour.availableSeats }} seats left
          </span>
        </div>

        <div class="text-lg font-bold text-indigo-600">
          {{ formatPrice(tour.price) }}
        </div>

        <div class="border-t pt-3">
          <h3 class="text-sm font-medium text-gray-700 mb-2">
            Experience Moods:
          </h3>
          <div class="flex flex-wrap gap-2">
            <div
              v-for="(value, mood) in tour.moods"
              :key="mood"
              class="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
            >
              {{ mood }}: {{ value }}%
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-50 px-6 py-4">
      <button
        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
      >
        Book Now
      </button>
    </div>
  </div>
</template>
