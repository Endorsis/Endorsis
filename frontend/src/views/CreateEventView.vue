<template>
  <div class="create-event">
    <h1 class="text-black text-center text-3xl mb-4">Create a New Event</h1>
    <form @submit.prevent="createEvent" class="event-form">

      <AddEndorsee @add="addEndorsee" />
      <div v-if="event.endorseees.length > 0" class="whitelisted-addresses">
        <div v-for="(endorsee, index) in event.endorseees" :key="index" class="address-item">
          <span>{{ endorsee.name + ' ' }}</span>
          <span>{{ endorsee.address.substring(0, 4) + '...' + endorsee.address.slice(-2) }}</span>
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
        <div class="input-group relative">
          <input :type="showPassword ? 'text' : 'password'" id="eventPassword" v-model="event.password" required
            class="input-field" />
          <button type="button" @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center">
            {{ showPassword ? 'Hide' : 'Show' }}
          </button>
        </div>
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
import AddEndorsee from '../components/AddEndorsee.vue';
import CryptoJS from 'crypto-js';

const eth = useEthereumStore();
const showPassword = ref(false);

const event = ref({
  creatorAddress: eth.address,
  endorseees: [] as { name: string; address: string }[],
  name: '',
  description: '',
  startDate: '',
  endDate: '',
  password: ''
});

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

function addEndorsee(endorsee: { name: string; address: string }) {
  event.value.endorseees.push(endorsee);
}

function calculateEventDuration() {
  // This function is called when the start or end date is changed
  // It updates the eventDuration computed property
}

function createEvent() {
  const hashedPassword = CryptoJS.SHA256(event.value.password).toString();
  event.value.password = hashedPassword;

  console.log('Creating Event:', event.value);
}
</script>

<style scoped lang="postcss">
.create-event {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f8ff;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 1rem;
  color: #333;
}

.input-field,
.textarea-field {
  display: block;
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.submit-btn {
  display: block;
  width: 100%;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
}

.whitelisted-addresses {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  margin-top: 2px;
}

.address-item {
  background-color: #f0f0f0;
  color: #333;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
}
</style>