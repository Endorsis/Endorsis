<template>
  <div class="join-event">
    <input
      type="text"
      v-model="contractAddress"
      placeholder="Enter contract address"
      @keyup.enter="joinEvent"
      class="input-field"
    />
    <button @click="joinEvent" class="join-btn">Join Event</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const contractAddress = ref('');

function joinEvent() {
  if (contractAddress.value.trim()) {
    // reading abi and contract address from backend to handle joining the event using the contract address
    console.log('Joining event at:', contractAddress.value);
    // reset input after action
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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
