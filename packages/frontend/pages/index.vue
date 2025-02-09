<script setup>
const { data, status, error } = await useNestFetch('tours');
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
      <div class="flex shadow-md bg-secondary rounded-md mt-16 p-10">
        <p class="md:w-80 md:flex-none text-2xl text-left text-primary">
          We have the largest selection of unique tours. Try our easyand quick
          tour selection for any request. 24-hour support is always happy to
          answer all your questions.
        </p>
      </div>

      <div></div>
    </div>
  </div>
</template>
