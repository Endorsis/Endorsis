<template>
  <div class="join-event">
    <input
      type="text"
      v-model="contractAddress"
      placeholder="Enter contract address"
      @keyup.enter="joinEvent"
      class="input-field bg-gray-200 focus:bg-white focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
    />
    <button @click="joinEvent" class="join-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
      Join Event
    </button>
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
</template>

<script setup lang="ts">
import { ref } from 'vue';

const contractAddress = ref('');

function joinEvent() {
  if (contractAddress.value.trim()) {
    console.log('Joining event at:', contractAddress.value);
    contractAddress.value = '';
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
</style>