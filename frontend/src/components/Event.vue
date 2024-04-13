<template>
  <div class="event">
    <h2 class="event-name">{{ event.name }}</h2>
    <p class="event-description">{{ event.description }}</p>
    <p class="event-date">Start Date: {{ event.startDate }}</p>
    <p class="event-date">End Date: {{ event.endDate }}</p>
  </div>
</template>

<script setup lang="ts">
import type { EvenModel } from '@/assets/EvenModel';
import { defineProps } from 'vue';

const props = defineProps<{
  event: EvenModel;
}>();
</script>

<style scoped>
.events-title {
  font-size: 1.5rem;
  color: #007BFF;
  /* Blue color for the heading */
  margin-bottom: 1rem;
}

.event-list {
  list-style-type: none;
  padding: 0;
}

.event-item {
  display: block;
  border: 1px solid #ccc;
  /* Light gray border */
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: white;
  text-decoration: none;
  /* Remove default link underline */
  color: inherit;
  /* Inherit text color from parent */
}

.event-name {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.event-description,
.event-date {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.event-date:last-child {
  margin-bottom: 0;
}
</style>
