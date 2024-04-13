<template>
  <div>
    <div class="flex items-center mb-2">
      <input
        type="text"
        id="EndorseeName"
        v-model="newEndorseeName"
        class="input-field w-half mr-2"
        placeholder="Enter name of endorsee"
      />
      <input
        type="text"
        id="EndorseeAddress"
        v-model="newEndorseeAddress"
        class="input-field w-half"
        placeholder="Enter ETH address or ENS domain"
      />
      <button
        type="button"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="addEndorsee"
      >
        Add
      </button>
    </div>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { isAddress } from 'ethers';
import { ref, defineEmits } from 'vue';

const newEndorseeName = ref('');
const newEndorseeAddress = ref('');
const errorMessage = ref('');

const emit = defineEmits(['add']);

function addEndorsee() {
  if (newEndorseeName.value.trim() === '') {
    errorMessage.value = 'Name cannot be empty';
  } else if (newEndorseeAddress.value.trim() === '') {
    errorMessage.value = 'Address cannot be empty';
  } else if (!isValidAddress(newEndorseeAddress.value.trim())) {
    errorMessage.value = 'Invalid address format';
  } else {
    emit('add', { name: newEndorseeName.value.trim(), address: newEndorseeAddress.value.trim() });
    newEndorseeName.value = '';
    newEndorseeAddress.value = '';
    errorMessage.value = '';
  }
}

function isValidAddress(address: string) {
  return isAddress(address) || isValidENS(address);
}

function isValidENS(address: string) {
  // ENS domains must end with '.eth' and contain at least one character before the suffix
  return address.endsWith('.eth') && address.indexOf('.eth') > 0;
}
</script>

<style scoped lang="postcss">
.flex {
  display: flex;
  align-items: center;
}

.input-field {
  flex-grow: 1;
  margin-right: 8px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error-message {
  color: red;
  margin-top: 8px;
}

.button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}
</style>