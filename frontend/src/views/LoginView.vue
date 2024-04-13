<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { Network, useEthereumStore } from '../stores/ethereum';

const eth = useEthereumStore();

const errors = ref<string[]>([]);
const message = ref('');
const author = ref('');
const isLoading = ref(true);
const isCorrectNetworkSelected = ref<Boolean>(true);

interface Message {
  message: string;
  author: string;
}

function handleError(error: Error, errorMessage: string) {
  errors.value.push(`${errorMessage}: ${error.message ?? JSON.stringify(error)}`);
  console.error(error);
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
<h1>Login page</h1>
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
</style>
