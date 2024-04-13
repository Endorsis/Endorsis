<template>
  <div class="view-event">
    <h1 class="text-black text-center text-3xl mb-4">Event Details</h1>
    <Event :event="event" />
    <EndorseesList :endorsees="getEndorsees()" />
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
import { ref, defineProps, type PropType } from 'vue';
import Event from '@/components/Event.vue';
import EndorseesList from "@/components/EndorseesList.vue";
import type { EventModel } from '@/models/EventModel'; // Import as a type
import { EndorseeModel } from '@/models/EndorseeModel'; // Import as a value

const props = defineProps({
  event: {
    type: Object as PropType<EventModel>, // Specify the type of the prop
    default: () => ({
      name: 'ETHDam',
      description: 'Privacy focused event',
      startDate: '2024-04-12',
      endDate: '2024-09-14',
      //this is not working, haha
      endorseees: [
        new EndorseeModel('Endorsee 1', '0x3Dd03d7d6c3137f1Eb7582BaFfE2f4Ef3dE1F730'),
        new EndorseeModel('Endorsee 2', '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'),
        new EndorseeModel('me', '0xEBC738Fb142dC0b56fC946E8Ec3076c25E63a650')
      ],
    })
  }
});

// I don't know why this is not working, but I cannot take it anymore
// const getEndorsees = () => event.value.endorseees;
const getEndorsees = () => [
    new EndorseeModel('Endorsee 1', '0x3Dd03d7d6c3137f1Eb7582BaFfE2f4Ef3dE1F730'),
    new EndorseeModel('Endorsee 2', '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'),
    new EndorseeModel('me', '0xEBC738Fb142dC0b56fC946E8Ec3076c25E63a650')
  ];

// Using ref to make it reactive
const event = ref(props.event);
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