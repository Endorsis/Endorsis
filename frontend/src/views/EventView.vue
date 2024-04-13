<template>
  <div class="view-event">
    <h1 class="text-black text-center text-3xl mb-4">Event Details</h1>
    <div class="event-form">
      <div class="form-group">
        <label for="eventName">Event Name:</label>
        <input type="text" id="eventName" v-model="event.name" disabled class="input-field">
      </div>
      <div class="form-group">
        <label for="eventDescription">Description:</label>
        <textarea id="eventDescription" v-model="event.description" disabled class="textarea-field"></textarea>
      </div>
      <div class="form-group">
        <label for="startDate">Start Date:</label>
        <input type="date" id="startDate" v-model="event.startDate" disabled class="input-field">
      </div>
      <div class="form-group">
        <label for="endDate">End Date:</label>
        <input type="date" id="endDate" v-model="event.endDate" disabled class="input-field">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Assume event details are fetched or passed in some way
const event = ref({
  name: 'ETHDam',
  description: 'Privacy focused event',
  startDate: '2024-04-12',
  endDate: '2024-09-14'
});

</script>

<style scoped lang="postcss">
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