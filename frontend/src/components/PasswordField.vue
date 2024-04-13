<template>
  <div class="form-group">
    <label for="eventPassword">Password:</label>
    <div class="input-group relative">
      <input :type="showPassword ? 'text' : 'password'" id="eventPassword" v-model="password" required
        class="input-field password-input" />
      <button type="button" @click="togglePasswordVisibility" class="password-toggle">
        {{ showPassword ? 'Hide' : 'Show' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showPassword = ref(false);
const password = ref('');

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}
</script>

<style scoped>
/* Add your styles here */
</style>