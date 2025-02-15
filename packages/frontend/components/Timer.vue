<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import moment from 'moment';
const props = defineProps({
  expiresAt: Date,
});

const timeLeft = ref('');
let timerInterval: NodeJS.Timeout;

const updateTimer = () => {
  const now = moment();
  const expiration = moment(props.expiresAt);
  const diffSeconds = expiration.diff(now, 'seconds');

  if (diffSeconds <= 0) {
    navigateTo('/expired');
  } else {
    timeLeft.value = moment.utc(diffSeconds * 1000).format('mm:ss');
  }
};

onMounted(() => {
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
});

onUnmounted(() => {
  clearInterval(timerInterval);
});
</script>

<template>
  <div class="bg-red-100 shadow-md rounded-md p-6 mb-6">
    <h1 class="text-red-500 font-bold text-xl mb-2">Attenzione!</h1>
    <p class="text-gray-600">
      I posti vi sono stati riservati per un tempo limitato, completare il
      checkout entro la scadenza del timer
    </p>
    <p class="text-lg font-bold text-red-500 mt-2" id="time-left-timer">
      {{ timeLeft }}
    </p>
  </div>
</template>
