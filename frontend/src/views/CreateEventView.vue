<template>
  <div class="create-event">
    <h1 class="text-black text-center text-3xl mb-4">Create a New Event</h1>
    <form @submit.prevent="createEvent" class="event-form">

      <div class="form-group">
        <label for="Endorseees">Endorsees:</label>
        <div class="flex items-center mb-2">
          <input type="text" id="Endorseees" v-model="newEndorsee" class="input-field w-full"
            placeholder="Enter addresses of endorsees" />
          <button type="button"
            class="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            @click="addEndorsee">
            Add
          </button>
        </div>
        <div v-if="event.Endorseees.length > 0" class="whitelisted-addresses">
          <div v-for="(address, index) in event.Endorseees" :key="index" class="address-item">
            {{ address }}
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="eventName">Event Name:</label>
        <input type="text" id="eventName" v-model="event.name" required class="input-field" />
      </div>
      <div class="form-group">
        <label for="eventDescription">Description:</label>
        <textarea id="eventDescription" v-model="event.description" class="textarea-field"></textarea>
      </div>
      <div class="form-group">
        <label for="startDate">Start Date:</label>
        <input type="date" id="startDate" v-model="event.startDate" required class="input-field"
          @change="calculateEventDuration" />
      </div>
      <div class="form-group">
        <label for="endDate">End Date:</label>
        <input type="date" id="endDate" v-model="event.endDate" required class="input-field"
          @change="calculateEventDuration" />
      </div>
      <div class="form-group">
        <label for="eventDuration">Event Duration:</label>
        <input type="text" id="eventDuration" v-model="eventDuration" disabled class="input-field" />
      </div>
      <div class="form-group">
        <label for="eventPassword">Password:</label>
        <input type="password" id="eventPassword" v-model="event.password" required class="input-field" />
      </div>
      <button type="submit" class="submit-btn">Create Event</button>
    </form>
    <div class="flex justify-center mb-6">
      <RouterLink to="/">
        <AppButton variant="secondary"
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded relative top-2 transition duration-300 ease-in-out hover:transform hover:-translate-y-1">
          Return
        </AppButton>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useEthereumStore } from '@/stores/ethereum';
import CryptoJS from 'crypto-js';

const eth = useEthereumStore();

const event = ref({
  creatorAddress: eth.address,
  Endorseees: [] as string[],
  name: '',
  description: '',
  startDate: '',
  endDate: '',
  password: ''
});

const newEndorsee = ref('');
const eventDuration = computed(() => {
  if (event.value.startDate && event.value.endDate) {
    const start = new Date(event.value.startDate);
    const end = new Date(event.value.endDate);
    const duration = end.getTime() - start.getTime();
    const days = Math.ceil(duration / (1000 * 60 * 60 * 24));
    return `${days} days`;
  }
  return '';
});

function addEndorsee() {
  if (newEndorsee.value.trim()) {
    event.value.Endorseees.push(newEndorsee.value.trim());
    newEndorsee.value = '';
  }
}

function calculateEventDuration() {
  // This function is called when the start or end date is changed
  // It updates the eventDuration computed property
}

function createEvent() {
  const hashedPassword = CryptoJS.SHA256(event.value.password).toString();
  event.value.password = hashedPassword;

  console.log('Creating Event:', event.value);
  // Optionally interact with a smart contract using ABI and contract address
}
</script>

<style scoped lang="postcss">
.create-event {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f8ff;
  /* Light blue background */
  border-radius: 8px;
}

.form-group {
  @apply relative mb-6;
}

.form-group input,
.form-group textarea {
  @apply block my-4 p-1 mx-auto text-3xl border border-gray-400 rounded-xl;
  @apply rounded-xl py-6 px-5 w-full text-base text-black appearance-none focus:outline-none focus:ring-0 bg-white;
}

.form-group label {
  @apply absolute text-base text-primaryDark duration-300 transform -translate-y-5 scale-75 top-6 z-10 origin-[0] left-5;
}

.submit-btn {
  display: block;
  width: 100%;
  padding: 10px 20px;
  background-color: #007bff;
  /* Bright blue button */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.message {
  @apply bg-white rounded-xl border-primary;
  border-width: 3px;
  border-style: solid;
  box-shadow: 0 7px 7px 0 rgba(0, 0, 0, 0.17);
}

.whitelisted-addresses {
  @apply flex flex-wrap gap-2 mt-2;
}

.address-item {
  @apply bg-gray-200 text-gray-800 font-bold py-1 px-2 rounded;
}
</style>