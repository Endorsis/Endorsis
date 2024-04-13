<template>
  <form @submit.prevent="joinEventWithPassword">
    <div class="events-container">
      <ul class="event-list" style="max-height: 300px; overflow-y: auto;">
        <li v-for="event in events" :key="event.id">
          <label :for="'event-'+ event.id" class="event-label">
            <input
              type="radio"
              :id="'event-' + event.id"
              :value="event.id"
              v-model="contractAddress"
            />
            <div class="event-info">
              <h3>{{ event.name }}</h3>
              <p>{{ event.description }}</p>
              <p>Start: {{ event.startDate }}</p>
              <p>End: {{ event.endDate }}</p>
            </div>
          </label>
        </li>
      </ul>
    </div>

    <div class="password-input">
      <input
        type="password"
        v-model="password"
        placeholder="Enter password"
        class="input-field bg-gray-200 focus:bg-white focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
      />
      <button
        type="submit"
        class="join-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
      >
        Join Event
      </button>
    </div>
  </form>
  <RouterLink to="/">
    <AppButton
      variant="secondary"
      class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded relative top-2 transition duration-300 ease-in-out hover:transform hover:-translate-y-1"
    >
      Return
    </AppButton>
  </RouterLink>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CryptoJS from 'crypto-js';

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
  {
    id: 'e7871995afcc2236e8c4a73067c1333db26a01f8596de5eecb3e423505398bad',
    name: 'ETHOxford',
    description: 'Privacy focused event',
    startDate: '2024-04-12',
    endDate: '2024-09-14',
  },
];

const contractAddress = ref('');
const password = ref('');

function joinEventWithPassword() {
  console.log('contract address:', contractAddress);
  console.log('Password:', password);
  const hashedPassword = CryptoJS.SHA256(contractAddress).toString();

  console.log("hashed password:", hashedPassword);
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
.event-label {
  display: block;
  border: 1px solid #ccc; /* Border color */
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff; /* White background */
}

.event-info {
  margin-left: 30px; /* Indentation for the event info */
}

.events-container {
  border: 1px solid #ccc; /* Border color for the container */
  border-radius: 4px;
  padding: 10px;
}

.password-input {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>