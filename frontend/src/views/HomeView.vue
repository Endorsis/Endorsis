<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { Network, useEthereumStore } from '../stores/ethereum';
import AppButton from '@/components/AppButton.vue';

const eth = useEthereumStore();

const isCorrectNetworkSelected = ref<Boolean>(true);

const events = [
  {
    id: 1,
    name: 'ETHDam',
    description: 'Privacy focused event',
    startDate: '2024-04-12',
    endDate: '2024-09-14'
  },
  {
    id: 2,
    name: 'ETHRome',
    description: 'Privacy focused event',
    startDate: '2024-04-12',
    endDate: '2024-09-14'
  },
]

async function connectAndSwitchNetwork() {
  await eth.connect();
  isCorrectNetworkSelected.value = await eth.checkIsCorrectNetwork();
  if (!isCorrectNetworkSelected.value) {
    await switchNetwork();
  }
  isCorrectNetworkSelected.value = await eth.checkIsCorrectNetwork();
}

async function switchNetwork() {
  await eth.switchNetwork(Network.FromConfig);
}

onMounted(async () => {
  await connectAndSwitchNetwork();
});
</script>

<template>
  <section class="pt-5" v-if="isCorrectNetworkSelected">
    <div class="flex justify-center mb-6">
      <RouterLink to="new_event">
        <AppButton class="mr-2" variant="secondary">
          <span class="text-xl font-bold">&plus;</span>
          <span class="ml-2">Create a new event</span>
        </AppButton>
      </RouterLink>
      <RouterLink to="join_event">
        <AppButton variant="secondary">
          <span class="text-xl font-bold">&plus;</span>
          <span class="ml-2">Join existing event</span>
        </AppButton>
      </RouterLink>
    </div>

    <h1 class="capitalize text-2xl text-white font-bold mb-4">Events</h1>

    <div class="events-container">
      <ul class="event-list">
        <li v-for="event in events" :key="event.id" class="event-item">
          <h2 class="event-name">{{ event.name }}</h2>
          <p class="event-description">{{ event.description }}</p>
          <p class="event-date">Start Date: {{ event.startDate }}</p>
          <p class="event-date">End Date: {{ event.endDate }}</p>
        </li>
      </ul>
    </div>
  </section>
  <section class="pt-5" v-else>
    <h2 class="capitalize text-white text-2xl font-bold mb-4">Invalid network detected</h2>
    <p class="text-white text-base mb-20">
      In order to continue to use the app, please switch to the correct chain, by clicking on the
      bellow "Switch network" button
    </p>

    <div class="flex justify-center">
      <AppButton variant="secondary" @click="switchNetwork"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
        Switch network
      </AppButton>
    </div>
  </section>
</template>

<style scoped lang="postcss">
.events-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.events-title {
  font-size: 1.5rem;
  color: #007BFF;
  /* Blue color for the heading */
  margin-bottom: 1rem;
}

.event-list {
  list-style-type: none;
  padding: 0;
}

.event-item {
  border: 1px solid #ccc;
  /* Light gray border */
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: white;
}

.event-name {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.event-description,
.event-date {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.event-date:last-child {
  margin-bottom: 0;
}
</style>