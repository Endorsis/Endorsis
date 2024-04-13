<template>
  <div class="view-event">
    <h1 class="text-black text-center text-3xl mb-4">Event Details</h1>
    <div class="event-form">
      <div class="form-group">
        <label for="eventName">Event Name:</label>
        <input
          type="text"
          id="eventName"
          v-model="event.name"
          disabled
          class="input-field bg-gray-200 focus:bg-white focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
        />
      </div>
      <div class="form-group">
        <label for="eventDescription">Description:</label>
        <textarea
          id="eventDescription"
          v-model="event.description"
          disabled
          class="textarea-field bg-gray-200 focus:bg-white focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          v-model="event.startDate"
          disabled
          class="input-field bg-gray-200 focus:bg-white focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
        />
      </div>
      <div class="form-group">
        <label for="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          v-model="event.endDate"
          disabled
          class="input-field bg-gray-200 focus:bg-white focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
        />
      </div>
    </div>
    <div class="flex justify-center mb-6">
      <RouterLink to="/">
        <AppButton
          variant="secondary"
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded relative top-2 transition duration-300 ease-in-out hover:transform hover:-translate-y-1"
        >
          Return
        </AppButton>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

// Defining the expected props structure with default values
const props = defineProps({
  event: {
    type: Object,
    default: () => ({
      name: 'ETHDam',
      description: 'Privacy focused event',
      startDate: '2024-04-12',
      endDate: '2024-09-14'
    })
  }
});

// Using ref to make it reactive
const event = ref(props.event);
</script>

<style scoped>
.view-event {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f8ff; /* Light blue background */
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
</style>