<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Network, networkName, useEthereumStore } from '../stores/ethereum';
import JazzIcon from './JazzIcon.vue';
import { abbrAddr } from '@/utils/utils';
import { useMedia } from '@/utils/useMediaQuery';
import { MetaMaskNotInstalledError } from '@/utils/errors';
import detectEthereumProvider from '@metamask/detect-provider';

const eth = useEthereumStore();
const netName = computed(() => networkName(eth.network));
const unkNet = computed(() => eth.network === Network.Unknown);
const connecting = ref(false);
const isMetaMaskInstalled = ref(true); // assume installed until proven otherwise

async function connectWallet() {
  if (!isMetaMaskInstalled.value) {
    window.open('https://metamask.io/download/');
    return;
  }

  if (connecting.value) return;
  connecting.value = true;
  try {
    await eth.connect();
  } catch (err) {
    if (err instanceof MetaMaskNotInstalledError) {
      isMetaMaskInstalled.value = false;
    } else {
      console.error("Connection failed:", err);
    }
  } finally {
    connecting.value = false;
  }
}

const isXlScreen = useMedia('(min-width: 1280px)');

onMounted(async () => {
  const ethProvider = await detectEthereumProvider();
if (ethProvider && ethProvider === (window.ethereum as any)) {
  console.log("MetaMask is installed.");
  // isMetaMaskInstalled.value = true;
    try {
      await eth.getEthereumProvider();
    } catch (err) {
      console.error("Failed to get Ethereum provider:", err);
    }
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
      <JazzIcon :size="isXlScreen ? 60 : 30" :address="eth.address" />
      <span class="font-mono font-bold">
        <abbr :title="eth.address">{{ abbrAddr(eth.address) }}</abbr>
        <span v-if="isXlScreen" class="font-normal" :class="{ 'unk-net': unkNet }">{{ netName }}</span>
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
  @apply inline-flex items-center gap-2 xl:gap-6;
}

.account-picker {
  @apply inline-flex items-center border border-gray-900 rounded-xl bg-white border-primaryDark h-12 p-2 xl:p-4 xl:fixed xl:right-10 xl:top-28 xl:h-auto;
  border-width: 3px;
  border-style: solid;

  @media (max-width: 1280px) {
    border-width: 1px;
  }
}

span {
  @apply text-base text-primaryDark text-right xl:text-xl;
}

.unk-net {
  @apply text-red-500 underline decoration-wavy decoration-1;
}
</style>
