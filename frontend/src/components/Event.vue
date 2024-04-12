<template>
    <div class="event">
      <h3>{{ event.title }}</h3>
      <p>{{ event.date }}</p>
      <p>{{ event.description }}</p>
    </div>
</template>

<script setup lang="ts">
    import { defineProps } from 'vue';

    interface Event {
    id: number;
    title: string;
    date: string;
    description: string;
    }

    const props = defineProps<{
    event: Event;
    }>();
</script>

<style lang="postcss" scoped></style>