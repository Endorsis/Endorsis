<template>
  <div class="join-event">
    <input
      type="text"
      v-model="contractAddress"
      placeholder="Enter contract address"
      @keyup.enter="joinEvent"
      class="input-field bg-gray-200 focus:bg-white focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
    />
    <button
      @click="joinEvent"
      class="join-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
    >
      Join Event
    </button>
  </div>
  <div class="flex justify-center mb-6">
    <div class="event-list">
      <div
        v-for="event in events"
        :key="event.id"
        class="event-item bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out cursor-pointer"
        @click="contractAddress = event.id"
      >
        <h3>{{ event.name }}</h3>
        <p>{{ event.description }}</p>
        <p>Start: {{ event.startDate }}</p>
        <p>End: {{ event.endDate }}</p>
      </div>
    </div>
    <RouterLink to="/">
      <AppButton
        variant="secondary"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded relative top-2 transition duration-300 ease-in-out hover:transform hover:-translate-y-1"
      >
        Return
      </AppButton>
    </RouterLink>
  </div>
  <div v-if="showPasswordInput" class="password-input">
    <input
      type="password"
      v-model="password"
      placeholder="Enter password"
      @keyup.enter="joinEventWithPassword"
      class="input-field bg-gray-200 focus:bg-white focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
    />
    <button
      @click="joinEventWithPassword"
      class="join-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
    >
      Join Event
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const events = [
  {
    id: 'e3271995afcc2236e8c4a73067c1333db26a01f8596de5eecb3e423505398bad',
    name: 'ETHDam',
    description: 'Privacy focused event',
    startDate: '2024-04-12',
    endDate: '2024-09-14',
  },
  {
    id: 'e4271995afcc2236e8c4a73067c1333db26a01f8596de5eecb3e423505398bad',
    name: 'ETHRome',
    description: 'Privacy focused event',
    startDate: '2024-04-12',
    endDate: '2024-09-14',
  },
];

const contractAddress = ref('');
const password = ref('');
const showPasswordInput = ref(false);

function joinEvent() {
  if (contractAddress.value.trim()) {
    console.log('Joining event at:', contractAddress.value);

    // Check if the contract address matches any of the events
    const matchingEvent = events.find((event) => event.id === contractAddress.value);
    if (matchingEvent) {
      // If the event requires a password, show the password input
      showPasswordInput.value = true;
    } else {
      // If the event doesn't require a password, proceed with joining the event
      joinEventWithPassword();
    }

    contractAddress.value = '';
  }
}

function joinEventWithPassword() {
  if (password.value.trim()) {
    console.log('Joining event with password:', password.value);
    password.value = '';
    showPasswordInput.value = false;
  }
}
</script>

<style scoped>
.join-event {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.input-field {
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.join-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.event-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 16px;
  margin-right: 20px;
}

.event-item {
  padding: 16px;
  border-radius: 4px;
  cursor: pointer;
}

.password-input {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>