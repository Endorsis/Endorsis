<template>
  <div v-if="endorsees.length > 0" class="endorsee-list">
    <div v-for="(endorsee, index) in endorsees" :key="index" class="endorsee-item">
      <span class="endorsee-name">{{ endorsee.name }}</span>
      <span class="endorsee-address">{{ endorsee.address }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { EndorseeModel } from '@/models/EndorseeModel';

const props = withDefaults(defineProps<{
  endorsees: EndorseeModel[];
}>(), {
  endorsees: () => []
});

console.log(props.endorsees); // Print endorsees to the console

</script>

<style scoped>

.endorsee-list {
  margin-top: 20px;
}

.endorsee-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.endorsee-name {
  font-weight: bold;
  color: #333;
}

.endorsee-address {
  font-family: monospace;
  font-weight: bold;
  color: #555;
}
</style>