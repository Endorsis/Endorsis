<template>
  <div class="create-event">
    <h1 class="text-black text-center text-3xl mb-4">Create a New Event</h1>
    <form @submit.prevent="createEvent" class="event-form">
      <AddEndorsee @add="addEndorsee" />
      <EndorseesList :endorsees="event.endorseees" />
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
            class="input-field password-input" />
          <button type="button" @click="togglePasswordVisibility"
            class="password-toggle">
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
import EndorseesList from '@/components/EndorseesList.vue';
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
 // event.value.endorseees = [...event.value.endorseees, endorsee];
}

function calculateEventDuration() { }

function createEvent() {
  const hashedPassword = CryptoJS.SHA256(event.value.password).toString();
  event.value.password = hashedPassword;
  console.log('Creating Event:', event.value);
}

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
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

.password-input {
  width: calc(100% - 50px);
}

.password-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
}
</style>