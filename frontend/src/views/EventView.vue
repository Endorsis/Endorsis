<template>
  <div class="view-event">
    <h1 class="text-black text-center text-3xl mb-4">{{ isOngoing ? 'Event Details' : 'Event Completed' }}</h1>
    <Event v-if="event" :event="event" />
    <EventOngoing v-if="isOngoing" :getEndorsees="getEndorsees" />
    <EventCompleted v-else :isUserEndorsee="isUserEndorsee" />

    <div class="flex justify-center mb-6">
      <RouterLink to="/">
        <AppButton variant="secondary"
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded relative top-2 transition duration-300 ease-in-out hover:transform hover:-translate-y-1">
          Return
        </AppButton>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, type PropType, computed, onMounted } from 'vue';
import Event from '@/components/Event.vue';
import EventOngoing from '@/components/EventOngoing.vue';
import EventCompleted from '@/components/EventCompleted.vue'; // Import EventCompleted
import type { EventModel } from '@/models/EventModel'; // Import as a type
import { useEthereumStore } from '@/stores/ethereum';
import ContractsApi from '@/api/ContractsApi';
import type { EndorseeModel } from '@/models/EndorseeModel';

const contractsApi = new ContractsApi();

// Define props to get the event ID
const props = defineProps({
  eventId: {
    type: String,
    required: true
  }
});

// Initialize event as null
const event = ref<EventModel | null>(null);

onMounted(async () => {
  console.log('EventView mounted');
  // Fetch the event data when the component is mounted
  const item = await contractsApi.getEventsById(props.eventId);
  if (item) {
    event.value = item;
  } else {
    throw new Error("Event is null");
  }
});


const selectedEndorsee = ref<EndorseeModel | null>(null);
const selectEndorsee = (endorsee: EndorseeModel) => {
  selectedEndorsee.value = endorsee;
};

const getEndorsees = () => event.value ? event.value.endorseees : [];

// Computed property to check if the event is ongoing
const isOngoing = computed(() => {
  if (event.value) {
    const currentDate = new Date();
    const startDate = new Date(event.value.startDate);
    const endDate = new Date(event.value.endDate);

    return startDate <= currentDate && currentDate <= endDate;
  }
  return false;
});

const isUserEndorsee = computed(() => {
  if (event.value) {
    const eth = useEthereumStore();
    const address = eth.address;
    console.log(`User address: ${address}`);
    return event.value.endorseees.some(endorsee => {
      return endorsee.address.toLowerCase() === address?.toLowerCase();
    });
  }
  return false;

});

</script>

<style scoped>
.view-event {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f8ff;
  border-radius: 8px;
}

.form-group {
  @apply relative mb-6;
}

.form-group input,
.form-group textarea {
  @apply block my-4 p-1 mx-auto text-3xl border border-gray-400 rounded-xl;
  @apply rounded-xl py-6 px-5 w-full text-base text-black appearance-none focus:outline-none focus:ring-0 bg-white;
}

.form-group label {
  @apply absolute text-base text-primaryDark duration-300 transform -translate-y-5 scale-75 top-6 z-10 origin-[0] left-5;
}
</style>