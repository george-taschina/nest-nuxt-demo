<script setup lang="ts">
const route = useRoute();
const bookingId = route.params.id;

const peopleCount = ref(1);
const email = ref('');

const incrementPeople = () => peopleCount.value++;
const decrementPeople = () => {
  if (peopleCount.value > 1) peopleCount.value--;
};

const handleSubmit = () => {
  // Handle form submission
  console.log({
    bookingId,
    peopleCount: peopleCount.value,
    email: email.value,
  });
};
</script>

<template>
  <div class="min-h-screen container mx-auto p-6 max-w-2xl">
    <h1 class="text-3xl font-bold mb-8">Prenotazione</h1>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Travelers Section -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Dettagli Viaggiatori</h2>

        <!-- Number of People -->
        <div class="mb-6">
          <label class="block font-medium mb-2">
            Per quante persone vuoi prenotare? *
          </label>
          <div class="flex items-center gap-4">
            <button
              type="button"
              @click="decrementPeople"
              :disabled="peopleCount === 1"
              class="px-3 py-1 border rounded disabled:opacity-50"
            >
              -
            </button>
            <span class="text-lg">{{ peopleCount }}</span>
            <button
              type="button"
              @click="incrementPeople"
              class="px-3 py-1 border rounded"
            >
              +
            </button>
          </div>
        </div>
        <GeorgeInput
          label="Email"
          type="email"
          required="true"
          v-model="email"
        />
      </section>

      <GeorgeButton class="w-full" type="submit">Book now</GeorgeButton>
    </form>
  </div>
</template>
