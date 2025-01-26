<script setup lang="ts">
import { computed, ref, watch, type Ref } from 'vue'

const compagnoCorrente = ref('')
const compagniGay: Ref<string[], string[]> = ref(['Lorenzo'])
const isSomeoneGay = ref(false)

const sonoGay = computed(() => {
  return compagniGay.value.some(
    (value) => value !== 'Bogdan' && value !== 'Gabriele' && value !== 'Mattia',
  )
    ? true
    : false
})

function addCompagnoGayToList(compagno: string) {
  compagniGay.value.push(compagno)
  compagnoCorrente.value = ''
}

watch(
  sonoGay,
  (valore) => {
    isSomeoneGay.value = valore
  },
  { immediate: true },
)
</script>

<template>
  <div class="about">
    <div class="content">
      <ul v-if="compagniGay.length > 0">
        <li v-for="compagno in compagniGay">{{ compagno }}</li>
      </ul>
      <h1>{{ `nella lista è presente un gay? ${isSomeoneGay ? 'sì' : 'no'}` }}</h1>
      <input v-model="compagnoCorrente" placeholder="edit me" />
      <button @click="addCompagnoGayToList(compagnoCorrente)">Aggiungi un nuovo nome</button>
    </div>
  </div>
</template>

<style>
.about {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px; /* Adds spacing between the h1 and the button */
}
</style>
