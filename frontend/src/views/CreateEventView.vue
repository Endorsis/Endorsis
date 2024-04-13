<template>
  <div class="create-poll">
    <h1 class="text-black text-center text-3xl mb-4">Create a New Poll</h1>
    <form @submit.prevent="createPoll" class="poll-form">
      <div class="form-group">
        <label for="pollName">Poll Name:</label>
        <input type="text" id="pollName" v-model="poll.name" required class="input-field">
      </div>
      <div class="form-group">
        <label for="pollDescription">Description:</label>
        <textarea id="pollDescription" v-model="poll.description" required class="textarea-field"></textarea>
      </div>
      <div class="form-group">
        <label for="startDate">Start Date:</label>
        <input type="date" id="startDate" v-model="poll.startDate" required class="input-field">
      </div>
      <div class="form-group">
        <label for="endDate">End Date:</label>
        <input type="date" id="endDate" v-model="poll.endDate" required class="input-field">
      </div>
      <button type="submit" class="submit-btn">Create Poll</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const poll = ref({
  name: '',
  description: '',
  startDate: '',
  endDate: ''
});

function createPoll() {
  // smart contract logic here
  console.log('Creating poll:', poll.value);
  // taking abi and contract address from the backend
}
</script>

<style scoped lang="postcss">
.create-poll {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f8ff;
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
  background-color: #007BFF;
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