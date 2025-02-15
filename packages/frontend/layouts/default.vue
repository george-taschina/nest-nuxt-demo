<!-- layout -->
<script setup lang="ts">
const { $pinia } = useNuxtApp();
const errorStore = useErrorStore($pinia);
</script>

<template>
  <div>
    <Navbar />
    <main class="pt-16 md:pt-14">
      <ErrorModal
        :error="errorStore.errorMessage"
        :show="errorStore.showError"
        @close="errorStore.clearError"
      />
      <slot />
    </main>
  </div>
</template>
