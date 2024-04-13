<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Network, networkName, useEthereumStore } from '../stores/ethereum';
import JazzIcon from './JazzIcon.vue';
import { abbrAddr } from '@/utils/utils';
import { useMedia } from '@/utils/useMediaQuery';
import detectEthereumProvider from '@metamask/detect-provider';

const eth = useEthereumStore();
const netName = computed(() => networkName(eth.network));
const unkNet = computed(() => eth.network === Network.Unknown);
const connecting = ref(false);
const isMetaMaskInstalled = ref(false);

async function connectWallet() {
  console.log("Attempting to connect wallet...");
  if (!isMetaMaskInstalled.value) {
    console.log("MetaMask not installed, redirecting for installation...");
    window.open('https://metamask.io/download/');
    return;
  }

  if (connecting.value) {
    console.log("Connection attempt already in progress...");
    return;
  }

  connecting.value = true;
  try {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
  } catch (err) {
    console.error("Connection failed with error:", err);
if ((err as Error).message.includes("User denied account authorization")) {
  console.log("User denied MetaMask connection.");
}
    isMetaMaskInstalled.value = false;
  } finally {
    connecting.value = false;
  }
}


onMounted(async () => {
  const ethProvider = await detectEthereumProvider();
if (ethProvider && window.ethereum && ethProvider as any === window.ethereum as any) {
  console.log("MetaMask is installed.");
    isMetaMaskInstalled.value = true;
  } else {
    console.log("MetaMask is not installed.");
    isMetaMaskInstalled.value = false;
  }
});
</script>


<template>
  <button
    :class="{ 'cursor-default': !!eth.address, 'cursor-pointer': !eth.address || !isMetaMaskInstalled }"
    class="account-picker"
    @click="connectWallet"
  >
    <span class="account-picker-content" v-if="!connecting && eth.address">
      <JazzIcon :size="30" :address="eth.address" />
      <span class="font-mono font-bold">
        <abbr :title="eth.address">{{ abbrAddr(eth.address) }}</abbr>
        <span class="font-normal">{{ netName }}</span>
      </span>
    </span>
    <span class="account-picker-content" v-else-if="!isMetaMaskInstalled">
      <span>Install MetaMask</span>
    </span>
    <span class="account-picker-content" v-else>
      <span v-if="connecting">Connecting…</span>
      <span v-else>Connect Wallet</span>
    </span>
  </button>
</template>


<style lang="postcss" scoped>
.account-picker-content {
  @apply inline-flex items-center gap-2;
}

.account-picker {
  @apply inline-flex items-center border border-gray-900 rounded-xl bg-white border-primaryDark h-12 p-2;
  border-width: 3px;
  border-style: solid;

}

span {
  @apply text-base text-primaryDark text-right;
}

.unk-net {
  @apply text-red-500 underline decoration-wavy decoration-1;
}
</style>
