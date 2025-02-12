<template>
  <div class="min-h-screen flex items-center justify-center">
    <div
      class="text-center space-y-6 animate-fade-in bg-white p-6 rounded-md shadow-md"
    >
      <div class="space-y-4">
        <h1 class="text-4xl md:text-5xl font-bold text-purple-600">
          Oops! Time's Up
        </h1>
        <p class="text-gray-600 text-lg">
          Looks like your reservation window has expired. Don't worry, you can
          start fresh by returning to our homepage!
        </p>
      </div>

      <!-- Home Button -->
      <NuxtLink to="/">
        <GeorgeButton class="mt-6">Home</GeorgeButton>
      </NuxtLink>
    </div>
  </div>
</template>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}
</style>
