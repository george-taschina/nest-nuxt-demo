<template>
  <nav class="bg-white shadow-md fixed w-full z-10">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <!-- Left side logo/name -->
        <div class="flex-shrink-0 flex items-center">
          <NuxtLink to="/" class="text-xl font-bold text-gray-800">
            <NuxtImg src="/logo.svg" width="100" alt="weroad-logo" />
          </NuxtLink>
        </div>

        <!-- Desktop menu -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink
            v-for="(item, index) in navigation"
            :key="index"
            :to="item.path"
            class="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button
            @click="isOpen = !isOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-800 focus:outline-none"
            aria-label="Main menu"
          >
            <svg
              class="h-6 w-6"
              :class="isOpen ? 'hidden' : 'block'"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              class="h-6 w-6"
              :class="isOpen ? 'block' : 'hidden'"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div class="md:hidden" :class="isOpen ? 'block' : 'hidden'">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <NuxtLink
          v-for="(item, index) in navigation"
          :key="index"
          :to="item.path"
          class="text-gray-600 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium"
        >
          {{ item.name }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import NuxtImg from '#image/components/NuxtImg.vue';
import { ref } from 'vue';

const isOpen = ref(false);

const navigation = [{ name: 'Home', path: '/' }];
</script>
