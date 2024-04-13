<template>
  <div class="create-event">
    <h1 class="text-black text-center text-3xl mb-4">Create a New Event</h1>
    <form @submit.prevent="createEvent" class="event-form">
      <div class="form-group">
        <label for="eventName">Event Name:</label>
        <input type="text" id="eventName" v-model="event.name" required class="input-field">
      </div>
      <div class="form-group">
        <label for="eventDescription">Description:</label>
        <textarea id="eventDescription" v-model="event.description" required class="textarea-field"></textarea>
      </div>
      <div class="form-group">
        <label for="startDate">Start Date:</label>
        <input type="date" id="startDate" v-model="event.startDate" required class="input-field">
      </div>
      <div class="form-group">
        <label for="endDate">End Date:</label>
        <input type="date" id="endDate" v-model="event.endDate" required class="input-field">
      </div>
      <button type="submit" class="submit-btn">Create Event</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const event = ref({
  name: '',
  description: '',
  startDate: '',
  endDate: ''
});

function createEvent() {
  // Implement smart contract logic to create an event here
  console.log('Creating Event:', event.value);
  // Optionally interact with a smart contract using ABI and contract address
}
</script>

<style scoped lang="postcss">
.create-event {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f8ff; // Light blue background
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
  background-color: #007BFF; // Bright blue button
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
</style>