<template>
  <div>
    <div class="flex items-center mb-2">
      <input type="text" id="EndorseeName" v-model="newEndorseeName" class="input-field w-half mr-2"
        placeholder="Enter name of endorsee" />
      <input type="text" id="EndorseeAddress" v-model="newEndorseeAddress" class="input-field w-half"
        placeholder="Enter address of endorsee" />
      <button type="button"
        class="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        @click="addEndorsee">
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
    errorMessage.value = 'Invalid address';
  } else {
    emit('add', { name: newEndorseeName.value.trim(), address: newEndorseeAddress.value.trim() });
    newEndorseeName.value = '';
    newEndorseeAddress.value = '';
    errorMessage.value = '';
  }
}

function isValidAddress(address: string) {
  return isAddress(address);
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

.error-message {
  color: red;
  padding-bottom: 20px;
  /* More padding after the error message */
}
</style>