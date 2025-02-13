<script setup lang="ts">
import type { TourGetAvailableResponse } from '@has-george-read/shared/domain/tour/tour-get-available';

defineProps({
  tour: {
    type: Object as PropType<TourGetAvailableResponse>,
    required: true,
  },
  disableButton: {
    type: Boolean,
    default: false,
  },
  fullText: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    class="h-full flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
  >
    <!-- Top Image Section -->
    <div class="w-full h-48 overflow-hidden rounded-t-xl">
      <NuxtImg
        :alt="tour.name"
        format="webp"
        loading="lazy"
        src="https://picsum.photos/400/200.webp"
        class="w-full h-full object-cover"
        placeholder="data:image/webp;base64,UklGRq4CAABXRUJQVlA4WAoAAAAgAAAAjwEAxwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggwAAAALAUAJ0BKpAByAA//f7/f7+7NrIgKAPwP4lpbuF3YRtACewD32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtWAAD+/2tqeIUAAAAAAAAAAAAAAA=="
      />
    </div>

    <div class="p-6 flex-1 flex flex-col">
      <div class="mb-4 flex-1">
        <h2
          class="text-2xl font-semibold text-primary mb-2"
          :class="{ 'line-clamp-1': !fullText }"
        >
          {{ tour.name }}
        </h2>
        <p class="text-gray-600" :class="{ 'line-clamp-3': !fullText }">
          {{ tour.description }}
        </p>
      </div>

      <div class="space-y-3">
        <div class="flex justify-between items-center text-sm">
          <span class="text-gray-500">
            {{ formatDate(tour.startingDate.toString()) }} -
            {{ formatDate(tour.endingDate.toString()) }}
          </span>
          <span
            v-if="tour.availableSeats > 0"
            class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium"
          >
            {{ tour.availableSeats }} seats left
          </span>
        </div>

        <div class="text-lg font-bold text-purple-400">
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
              class="px-2 py-1 bg-secondary rounded-full text-xs text-gray-600"
            >
              {{ mood }}: {{ value }}%
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-50 px-6 py-4" v-if="!disableButton">
      <NuxtLink :to="{ name: 'booking-id-start', params: { id: tour.id } }">
        <GeorgeButton class="w-full">Book now</GeorgeButton>
      </NuxtLink>
    </div>
  </div>
</template>
