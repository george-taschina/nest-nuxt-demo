<template>
  <div class="mb-8">
    <label class="block font-medium mb-4"> Numero di partecipanti * </label>
    <div class="flex items-center gap-6">
      <button
        type="button"
        @click="updatePeopleCount('decrement')"
        :disabled="modelValue === MIN_PEOPLE"
        class="control-button"
      >
        -
      </button>
      <span class="text-lg w-8 text-center">{{ modelValue }}</span>
      <button
        type="button"
        @click="updatePeopleCount('increment')"
        :disabled="modelValue >= availableSeats"
        class="control-button"
      >
        +
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  availableSeats: {
    type: Number,
    required: true,
  },
  modelValue: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const MIN_PEOPLE = 1;

const updatePeopleCount = (modification: 'increment' | 'decrement') => {
  let newValue = props.modelValue;

  if (modification === 'increment' && newValue < props.availableSeats) {
    newValue++;
  } else if (modification === 'decrement' && newValue > MIN_PEOPLE) {
    newValue--;
  }

  emit('update:modelValue', newValue);
};
</script>
