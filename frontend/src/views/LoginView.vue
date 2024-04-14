<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useMessageBox, useUnwrappedMessageBox } from '../contracts';
import { Network, useEthereumStore } from '../stores/ethereum';
import { abbrAddr } from '@/utils/utils';
import AppButton from '@/components/AppButton.vue';
import MessageLoader from '@/components/MessageLoader.vue';
import JazzIcon from '@/components/JazzIcon.vue';
import { retry } from '@/utils/promise';

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

async function setMessage(e: Event): Promise<void> {
  if (e.target instanceof HTMLFormElement) {
    e.target.checkValidity();
    if (!e.target.reportValidity()) return;
  }

  e.preventDefault();

  try {
    const newMessageValue = newMessage.value;
    errors.value.splice(0, errors.value.length);
    isSettingMessage.value = true;

    await messageBox.value!.setMessage(newMessageValue);

    await retry<Promise<Message | null>>(fetchAndSetMessageValues, (retrievedMessage) => {
      if (retrievedMessage?.message !== newMessageValue) {
        throw new Error('Unable to determine if the new message has been correctly set!');
      }

      return retrievedMessage;
    });

    newMessage.value = '';
  } catch (e: any) {
    handleError(e, 'Failed to set message');
  } finally {
    isSettingMessage.value = false;
  }
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

const router = useRouter();

onMounted(async () => {
  await connectAndSwitchNetwork();
  await fetchAndSetMessageValues();
  if (eth.address) {
    router.push('/');
  }
});
</script>

<template>
  <section class="login-section" v-if="isCorrectNetworkSelected">
    <h1 class="welcome-text">Welcome to Endorsis</h1>
    <p class="description-text">The Web3 endorsing events platform</p>
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
</template>

<style scoped lang="postcss">
.login-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.welcome-text {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffffff; /* Couleur du texte */
  text-align: center;
  margin-top: 25%;
}

.description-text {
  font-size: 1.5rem;
  color: #ffffff; /* Couleur du texte */
  text-align: center;
}
</style>
