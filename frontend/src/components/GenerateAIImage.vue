<template>
  <form @submit.prevent="generateAIImage(inputText)">
    <div class="form-group">
      <input
        type="text"
        id="aiImageText"
        class="peer"
        placeholder=" "
        v-model="inputText"
        required
      />
      <label
        for="aiImageText"
        class="peer-focus:text-primaryDark peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5"
      >
        Enter text for AI image:
        <span class="text-red-500">*</span>
      </label>
    </div>

    <AppButton type="submit" variant="primary" :disabled="isLoading">
      <span v-if="isLoading">Generating…</span>
      <span v-else>Generate Image</span>
    </AppButton>

    <div v-if="errors.length > 0" class="text-red-500 px-3 mt-5 rounded-xl-sm">
      <span class="font-bold">Errors:</span>
      <ul class="list-disc px-8">
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
  </form>
  <div v-if="isLoading">Loading...</div>
  <img v-else-if="image" :src="image.url" alt="Generated AI Image" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppButton from '@/components/AppButton.vue';

const inputText = ref(''); // replace with your input text
const isLoading = ref(false);
const image = ref(null);
const errors = ref([]);

async function generateAIImage(text: string) {
  isLoading.value = true;

  try {
    // Call your AI image generation API here
    // For example:
    // const response = await fetch(`/api/generate-image?text=${encodeURIComponent(text)}`);
    // image.value = await response.json();
  } catch (error) {
    console.error(error);
    // errors.value.push(error.message);
  } finally {
    isLoading.value = false;
  }
}
</script>