<template>
  <div>
    <h2 class="text-black text-left text-xl pt-4">Select Participant</h2>
    <EndorseesList :endorsees="getEndorsees()" :onSelect="selectEndorsee" :isSelectable="true"
      :selectedEndorsee="selectedEndorsee" />
    <div v-if="selectedEndorsee">
      <div class="form-group">
        <label for="feedback">Feedback:</label>
        <textarea id="feedback" v-model="feedback" class="textarea-field"></textarea>
      </div>
      <PasswordField v-model="password" />
      <button type="submit" class="submit-btn">Submit Feedback</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, type PropType } from 'vue';
import EndorseesList from "@/components/EndorseesList.vue";
import type { EndorseeModel } from '@/models/EndorseeModel';
import PasswordField from '../components/PasswordField.vue';


const selectedEndorsee = ref<EndorseeModel | null>(null);
const selectEndorsee = (endorsee: EndorseeModel) => {
  selectedEndorsee.value = endorsee;
};

const props = defineProps({
  getEndorsees: {
    type: Function as PropType<() => EndorseeModel[]>,
    required: true
  }
});

const feedback = ref('');
const password = ref('');

const submitFeedback = () => {
  // Implement your feedback submission logic here
};
</script>