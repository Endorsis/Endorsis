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
      <label for="eventPassword">Password:</label>
      <div class="input-group relative">
        <input :type="showPassword ? 'text' : 'password'" id="eventPassword" v-model="password" required
          class="input-field password-input" />
        <button type="button" @click="togglePasswordVisibility" class="password-toggle">
          {{ showPassword ? 'Hide' : 'Show' }}
        </button>
      </div>
      <button type="submit" class="submit-btn" @click="submitFeedback">Submit Feedback</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, type PropType } from 'vue';
import EndorseesList from "@/components/EndorseesList.vue";
import type { EndorseeModel } from '@/models/EndorseeModel';
import PasswordField from '../components/PasswordField.vue';
import ContractsApi from "@/api/ContractsApi";

const showPassword = ref(false);
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

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
  const url = window.location.href;
  const parts = url.split("/");
  const eventId = parts[parts.length - 1];

  console.log(url.split("/"));
  console.log(feedback.value);
  console.log(password.value);

  new ContractsApi().submitFeedback(eventId, feedback.value, password.value);
  //todo display error if not 200
  //todo if 200 display success, clear fiedls
};
</script>