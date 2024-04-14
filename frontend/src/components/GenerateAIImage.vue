<template>
  <form @submit.prevent="generateAIImage(inputText)">
    <h2 class="text-2xl font-bold mb-2 text-white">Generate AI Image</h2>
    <div class="form-group py-4">
      <label for="aiImageText"
        class="block text-white peer-focus:text-primaryDark peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">
        Enter text for AI image:
        <span class="text-red-500">*</span>
      </label>
      <input type="text" id="aiImageText" class="peer" placeholder=" " v-model="inputText" required />
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
  <div v-if="isLoading" class="pt-4">Loading...</div>
  <img v-else-if="image" :src="image" alt="Generated AI Image" class="pt-4" />
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import AppButton from '@/components/AppButton.vue';

const inputText = ref(''); // replace with your input text
const isLoading = ref(false);
const image = ref(null);
const errors: Ref<string[]> = ref([]);

async function generateAIImage(text: string) {
  isLoading.value = true;

  try {
    console.log(`Generating AI image with prompt: ${text}`);
    const response = await fetch(`https://sticked-api-hwruz2623a-lz.a.run.app/ai/generateImage?prompt=${encodeURIComponent(text)}`);
    console.log(`Response: ${response}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    image.value = data.image_url; // Extract the image URL from the response
  } catch (error) {
    console.error(error);
    errors.value.push((error as Error).message);
  } finally {
    isLoading.value = false;
  }
}
</script>