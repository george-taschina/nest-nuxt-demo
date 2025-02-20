import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useErrorStore = defineStore('error', () => {
  const errorMessage = ref('');
  const showError = ref(false);

  const triggerError = (message: string) => {
    errorMessage.value = message;
    showError.value = true;
  };

  const clearError = () => {
    showError.value = false;
    errorMessage.value = '';
  };

  return {
    errorMessage,
    showError,
    triggerError,
    clearError,
  };
});
