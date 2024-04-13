<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useMessageBox, useUnwrappedMessageBox } from '../contracts';
import { Network, useEthereumStore } from '../stores/ethereum';
import { abbrAddr } from '@/utils/utils';
import AppButton from '@/components/AppButton.vue';
import MessageLoader from '@/components/MessageLoader.vue';
import JazzIcon from '@/components/JazzIcon.vue';
import { retry } from '@/utils/promise';
import GenerateAIImageButton from '@/components/GenerateAIImage.vue';


const eth = useEthereumStore();
const messageBox = useMessageBox();
const uwMessageBox = useUnwrappedMessageBox();

const errors = ref<string[]>([]);
const message = ref('');
const author = ref('');
const newMessage = ref('');
const isLoading = ref(true);
const isSettingMessage = ref(false);
const isCorrectNetworkSelected = ref<Boolean>(true);

const canCreateEvent = ref<Boolean>(true);
const canJoinEvent = ref<Boolean>(true);

interface Message {
  message: string;
  author: string;
}

function handleError(error: Error, errorMessage: string) {
  errors.value.push(`${errorMessage}: ${error.message ?? JSON.stringify(error)}`);
  console.error(error);
}

async function fetchMessage(): Promise<Message> {
  const message = await messageBox.value!.message();
  const author = await messageBox.value!.author();

  return { message, author };
}

const props = defineProps({
  events: {
    type: Array,
    default: () => ([
      {
        id: 1,
        name: 'ETHDam',
        description: 'Privacy focused event',
        startDate: '2024-04-12',
        endDate: '2024-09-14'
      },
      {
        id: 2,
        name: 'ETHRome',
        description: 'Privacy focused event',
        startDate: '2024-04-12',
        endDate: '2024-09-14'
      },
      // Add more events here if needed
    ])
  }
});

async function fetchAndSetMessageValues(): Promise<Message | null> {
  let retrievedMessage: Message | null = null;

  try {
    retrievedMessage = await fetchMessage();
    message.value = retrievedMessage.message;
    author.value = retrievedMessage.author;

    return retrievedMessage;
  } catch (e) {
    handleError(e as Error, 'Failed to get message');
  } finally {
    isLoading.value = false;
  }

  return retrievedMessage;
}

async function switchNetwork() {
  await eth.switchNetwork(Network.FromConfig);
}

async function connectAndSwitchNetwork() {
  await eth.connect();
  isCorrectNetworkSelected.value = await eth.checkIsCorrectNetwork();
  if (!isCorrectNetworkSelected.value) {
    await switchNetwork();
  }
  isCorrectNetworkSelected.value = await eth.checkIsCorrectNetwork();
}

onMounted(async () => {
  await connectAndSwitchNetwork();
  await fetchAndSetMessageValues();
});
</script>

<template>
  <section class="pt-5" v-if="isCorrectNetworkSelected">
    <div class="flex justify-center mb-6">
      <!-- Create Event Button -->
      <RouterLink to="new_event">
        <AppButton class="mr-2" variant="secondary">&plus;&nbsp;&nbsp;Create a new event</AppButton>
      </RouterLink>
      <!-- Join Event Button -->
      <RouterLink to="join_event">
        <AppButton variant="secondary">&plus;&nbsp;&nbsp;Join existing event</AppButton>
      </RouterLink>
    </div>

    <h1 class="capitalize text-2xl text-white font-bold mb-4">Demo starter</h1>

    <div class="events-container">
      <h1 class="events-title">Events</h1>
      <ul class="event-list">
        <li v-for="event in events" :key="event.id" class="event-item">
          <h2 class="event-name">{{ event.name }}</h2>
          <p class="event-description">{{ event.description }}</p>
          <p class="event-date">Start Date: {{ event.startDate }}</p>
          <p class="event-date">End Date: {{ event.endDate }}</p>
        </li>
      </ul>
    </div>

  </section>
  <section class="pt-5" v-else>
    <h2 class="capitalize text-white text-2xl font-bold mb-4">Invalid network detected</h2>
    <p class="text-white text-base mb-20">
      In order to continue to use the app, please switch to the correct chain, by clicking on the
      bellow "Switch network" button
    </p>

    <div class="flex justify-center">
      <AppButton variant="secondary" @click="switchNetwork">Switch network</AppButton>
    </div>
  </section>

  <GenerateAIImageButton />

</template>

<style scoped lang="postcss">
input {
  @apply block my-4 p-1 mx-auto text-3xl border border-gray-400 rounded-xl;
}

.form-group {
  @apply relative mb-6;
}

.form-group input,
textarea {
  @apply block rounded-xl py-6 px-5 w-full text-base text-black appearance-none focus:outline-none focus:ring-0 bg-white;
}

.form-group label {
  @apply absolute text-base text-primaryDark duration-300 transform -translate-y-5 scale-75 top-6 z-10 origin-[0] left-5;
}

.message {
  @apply bg-white rounded-xl border-primary;
  border-width: 3px;
  border-style: solid;
  box-shadow: 0 7px 7px 0 rgba(0, 0, 0, 0.17);
}

.events-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.events-title {
  font-size: 1.5rem;
  color: #007BFF; /* Blue color for the heading */
  margin-bottom: 1rem;
}

.event-list {
  list-style-type: none;
  padding: 0;
}

.event-item {
  border: 1px solid #ccc; /* Light gray border */
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: white;
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
