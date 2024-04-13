<template>
  <div>
    <!-- ... rest of your code -->
    <GenerateAIButton :disabled="!isUserEndorsee">Claim Feedback</GenerateAIButton>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import GenerateAIButton from '@/components/GenerateAIImage.vue';

const props = defineProps({
  isUserEndorsee: Boolean
});
</script>