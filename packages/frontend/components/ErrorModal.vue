<!-- components/ErrorModal.vue -->
<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
  >
    <div
      class="relative bg-white rounded-lg shadow-xl p-8 max-w-md w-[90%]"
      :class="[show ? 'animate-shake' : '']"
    >
      <div class="flex items-center gap-2 mb-4 text-red-600">
        <h3 class="text-xl font-semibold">Errore!</h3>
      </div>

      <p class="text-gray-600 mb-6">{{ message }}</p>

      <button
        @click="closeModal"
        class="w-full px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
      >
        Chiudi
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  message: String,
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>
