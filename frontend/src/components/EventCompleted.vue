<template>
  <div>
    <PasswordField v-model="password" />

    <div class="d-flex justify-content-center">
      <AppButton type="submit" variant="primary" :disabled="isLoading" @click="getFeedback">
        <span v-if="isLoading">Generating…</span>
        <span v-else>Generate Image</span>
      </AppButton>
    </div>

    <div v-if="aiImage" class="d-flex justify-content-center">
      <img :src="aiImage" alt="AI Generated Image">
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, type Ref } from 'vue';
import PasswordField from '@/components/PasswordField.vue';
import ContractsApi from '@/api/ContractsApi';
import AppButton from './AppButton.vue';

const props = defineProps({
  isUserEndorsee: Boolean
});

const aiImage: Ref<string | null> = ref(null);
const password = ref('');
const contractsApi = new ContractsApi();

const isLoading = ref(false);

async function getFeedback() {
  // Claim feedback from ContractsApi
  const feedbackText = await contractsApi.claimFeedback(password.value);

  // Use this feedback to generate AI image
  await generateAIImage(feedbackText);
}

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
    // aiImage.value = 
    aiImage.value = data.image_url; // Extract the image URL from the response
  } catch (error) {
    console.error(error);
    // errors.value.push((error as Error).message);
  } finally {
    isLoading.value = false;
  }
}
</script>